package demo.js;
import demo.common.DemoMain;
import demo.js.minilib.OMain;
import js.Browser;
import js.html.*;

/**
 * OimoPhysics demo box on WebGL
 */
class DemoJS extends OMain {
	var test:DemoMain;
	var textCanvas:CanvasElement;
	var g:CanvasRenderingContext2D;

	var textScale:Float;

	override function setup() {
		initFullScreen(60);
		textScale = mini(width, height) / 600;
		initText();
		initUserInput();
		test = new DemoMain(width, height);
		test.init(new WebGLDebugGraphics(gl));
		trace("OimoPhysics demo is running...");
		trace("width: " + canvas.width + ", height: " + canvas.height);
	}

	function initUserInput() {
		Browser.document.addEventListener("keydown", function(e:KeyboardEvent):Void {
			test.keyPressed(e.keyCode);
			if (!(e.keyCode >= KeyEvent.DOM_VK_F1 && e.keyCode <= KeyEvent.DOM_VK_F12)) {
				e.preventDefault();
			}
		});
		Browser.document.addEventListener("keyup", function(e:KeyboardEvent):Void {
			test.keyReleased(e.keyCode);
		});
	}

	function initText() {
		Browser.document.getElementById("container").style.position = "relative";
		textCanvas = cast Browser.document.getElementById("text");
		textCanvas.width = canvas.width;
		textCanvas.height = canvas.height;
		textCanvas.style.width = canvas.style.width;
		textCanvas.style.height = canvas.style.height;
		g = textCanvas.getContext2d();
		g.font = 12 * textScale + "px Courier New";
		g.fillStyle = "#fff";
		g.textBaseline = "top";
		var textStyle:CSSStyleDeclaration = textCanvas.style;
		textStyle.position = "absolute";
		textStyle.left = "0px";
		textStyle.top = "0px";
		textStyle.zIndex = "1";
	}

	override function loop() {
		test.mouseMoved(input.mouseX + input.touchX, input.mouseY + input.touchY);
		if (input.mouseL && !input.pmouseL || input.touch && !input.ptouch) test.mouseLPressed();
		if (!input.mouseL && input.pmouseL || !input.touch && input.ptouch) test.mouseLReleased();
		if (input.mouseR && !input.pmouseR) test.mouseRPressed();
		if (!input.mouseR && input.pmouseR) test.mouseRReleased();

		test.loop();

		g.clearRect(0, 0, width, height);
		var lines:Array<String> = test.text.split("\n");
		var y:Int = 8;
		var lineHeight:Int = round(15 * textScale);
		var controlIndex:Int = -1;
		for (line in lines) {
			var w:Float = g.measureText(line).width + 4;
			g.save();
			if (
				(input.mouseX >= 8 && input.mouseX < 8 + w && input.mouseY >= y && input.mouseY < y + lineHeight) ||
				((input.touch || input.ptouch) && input.touchX >= 8 && input.touchX < 8 + w && input.touchY >= y && input.touchY < y + lineHeight)
			) {

				if ((input.dmouseL == 1 || input.dtouch == -1) && controlIndex >= 0) {
					test.action(controlIndex);
				}

				g.fillStyle = "rgba(192, 0, 0, 0.5)";
			} else {
				g.fillStyle = "rgba(0, 0, 0, 0.5)";
			}
			g.fillRect(8, y, w, lineHeight);
			g.restore();
			g.fillText(line, 8, y);

			if (controlIndex >= 0) controlIndex++;
			if (line == "Control") controlIndex = 0;

			y += lineHeight;
		}
	}

	static function main() {
		Browser.window.onload = function() {
			new DemoJS(cast Browser.document.getElementById("canvas"));
		};
	}

}
