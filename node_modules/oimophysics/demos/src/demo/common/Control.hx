package demo.common;

/**
 * Defines a demo control with given text, keyboard mapping and action.
 */
class Control {
	public var keyText(default, null):String;
	public var description(default, null):Void -> String;
	public var keyCode(default, null):Int;
	public var onAction(default, null):Void -> Void;

	public function new(keyText:String, description:Void -> String, keyCode:Int, onAction:Void -> Void) {
		this.keyText = keyText;
		this.description = description;
		this.keyCode = keyCode;
		this.onAction = onAction;
	}

}
