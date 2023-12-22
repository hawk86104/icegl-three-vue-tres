package oimo.m;
import haxe.macro.Context;
import haxe.macro.Expr;
import haxe.macro.ExprTools;
import haxe.macro.Type;
using haxe.macro.ComplexTypeTools;
using oimo.m.B;
using oimo.m.U;
using StringTools;
using Lambda;

/**
 * Build Macro
 */
@:extern
class B {

#if macro

	// print imports of all classes
	static inline var WRITE_IMPORTS:Bool = true;
	// print exports and externs for JS closure compiler
	static inline var WRITE_EXPORTS:Bool = true;
	static inline var WRITE_EXTERNS:Bool = true;

	static function log(s:String):Void {
		//trace(s);
	}

	static var onGenerateAdded:Bool = false;

	public static function bu() {
		if (!onGenerateAdded) {
			Context.onGenerate(onGenerate);
			onGenerateAdded = true;
		}
		log("building... " + Context.getLocalClass());
		return filter();
	}

	static function onGenerate(types:Array<Type>):Void {
		if (!WRITE_IMPORTS && !WRITE_EXPORTS && !WRITE_EXTERNS) return;

		var externs = [];
		var exports = [];
		var imports = [];
		externs.push("var OIMO;");
		exports.push("window[\"OIMO\"] = {};");
		types.iter((t) -> switch (t) {
		case TInst(t, params):
			var classType = t.get();
			var className = classType.name;
			var jsClassName = classType.pack.join("_") + "_" + className;
			if (~/^oimo.(common|collision|dynamics)/.match(classType.pack.join("."))) {
				imports.push('import ${classType.pack.join(".")}.$className;');

				var doc = classType.doc;
				var hidden = classType.meta.extract(":dox").exists((me) -> me.params.exists((e) -> e.expr.equals((macro hide).expr)));
				var isInterface = classType.meta.has(":interface");
				if (doc != null && !hidden) {
					exports.push('window["OIMO"]["$className"] = $jsClassName;');

					var pubMembers = classType.fields.get().filter((cf) -> cf.isPublic && !cf.name.startsWith("_"));
					var pubStats = classType.statics.get().filter((cf) -> cf.isPublic && !cf.name.startsWith("_"));
					var pubFields = pubMembers.concat(pubStats);

					if (isInterface) {
						pubFields.iter((pf) -> externs.push('OIMO.$className.${pf.name};'));
					} else {
						var pubVars = pubFields.filter((cf) -> cf.kind.match(FVar(_, _)));
						pubVars.iter((pf) -> externs.push('OIMO.$className.${pf.name};'));

						var pubMethods = pubMembers.filter((cf) -> cf.kind.match(FMethod(_)));
						var pubFuncs = pubStats.filter((cf) -> cf.kind.match(FMethod(_)));
						pubMethods.iter((pf) -> exports.push('$jsClassName.prototype["${pf.name}"] = $jsClassName.prototype.${pf.name};'));
						pubFuncs.iter((pf) -> exports.push('$jsClassName["${pf.name}"] = $jsClassName.${pf.name};'));
					}
				}
			}
		case _:
		});
		if (WRITE_IMPORTS) {
			sys.io.File.saveContent("js_imports.txt", imports.join("\n"));
		}
		if (WRITE_EXPORTS) {
			sys.io.File.saveContent("js_exports.txt", exports.join("\n"));
		}
		if (WRITE_EXTERNS) {
			sys.io.File.saveContent("js_externs.txt", externs.join("\n"));
		}
	}

	public static function filter() {
		var fs:Array<Field> = Context.getBuildFields();
		var fs2:Array<Field> = [];
		log("filtering... " + fs);
		for (field in fs) {

			// hide private/internal properties
			if (field.name.substr(0, 1) == '_') {
				field.meta.push({
					name: ":dox",
					params: [macro hide],
					pos: U.pos()
				});
			}

			log("filtering a field " + field);
			switch (field.kind) {
				case FVar(t, e):
					log("FVar(" + t + ", " + e + ")");

					var names:Array<String> = field.name.names(t);
					if (names != null) {

						U.pushVariables(fs2, names, macro:Float, [{
							// hide private vars
							name: ":dox",
							params: [macro hide],
							pos: U.pos()
						}], field.access);

						field.meta.push({
							name: ":extern",
							pos: U.pos()
						});
						fs2.push(field); // keep it for type inference
					} else {
						fs2.push(field);
					}
				case FFun(f):
					log("FFun(" + f + ")");

					var args:Array<FunctionArg> = [];
					log("args " + f.args);
					for (arg in f.args) {
						log("arg " + arg);
						if (arg.type == null) continue;
						var names:Array<String> = arg.name.names(arg.type);
						log("names " + names);
						if (names != null) {
							for (name in names) {
								log("name " + name);
								args.push({
									name: name,
									type: macro:Float
								});
							}
						} else {
							args.push(arg);
						}
					}

					field.kind = FFun({
						args: args,
						expr: filterFuncExpr(f.expr),
						ret: f.ret,
						params: f.params
					});
					log("kind " + field.kind);
					fs2.push(field);
				case _:
					log("others");
					fs2.push(field);
			}
		}
		log("finished filtering.");
		return fs2;
	}

	static function filterFuncExpr(e:Expr):Expr {
		log("filterFuncExpr " + e);
		switch(e.expr) {
		case EVars(vars):
			log("EVars(" + vars + ")");
			var newVars:Array<Var> = vars.copy();
			for (v in vars) {
				log("v " + v);
				var names:Array<String> = v.name.names(v.type);
				log("names " + names);
				if (names != null) {
					newVars = newVars.concat(names.map(function(name) {
						return {
							name: name,
							type: macro:Float,
							expr: null,
							meta: null,
							isFinal: false
						};
					}));
				}
			}
			e.expr = EVars(newVars);
			return e;
		case _:
			log("others");
			return ExprTools.map(e, filterFuncExpr);
		}
	}

#end

}
