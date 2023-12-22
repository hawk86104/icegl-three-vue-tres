/* Copyright (c) 2012-2013 EL-EMENT saharan
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation  * files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy,  * modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to
 * whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
 * ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
package com.element.oimo.physics.demo {
	import com.element.oimo.physics.collision.shape.BoxShape;
	import com.element.oimo.physics.collision.shape.ShapeConfig;
	import com.element.oimo.physics.collision.shape.SphereShape;
	import com.element.oimo.physics.dynamics.RigidBody;
	/**
	 * ...
	 * @author saharan
	 */
	public class CollisionFilteringDemo extends DemoBase {
		
		public function CollisionFilteringDemo() {
			title = "Collision filtering";
		}
		
		override public function reset():void {
			// 衝突グループのビット
			var group1:int = 1 << 0;  // 00000000 00000000 00000000 00000001
			var group2:int = 1 << 1;  // 00000000 00000000 00000000 00000010
			var group3:int = 1 << 2;  // 00000000 00000000 00000000 00000100
			var all:int = 0xffffffff; // 11111111 11111111 11111111 11111111
			
			var sc:ShapeConfig = new ShapeConfig();
			var body:RigidBody;
			
			for (var i:int = 0; i < 4; i++) {
				// 直方体
				sc.belongsTo = group2; // グループ2に属する
				sc.collidesWith = all & ~group2; // グループ2とは衝突しない
				
				body = new RigidBody(0, 1.5 + i * 2, 0);
				body.addShape(new BoxShape(sc, 4, 0.4, 1));
				body.setupMass();
				world.addRigidBody(body);
				
				// 立方体
				sc.belongsTo = group3; // グループ3に属する
				sc.collidesWith = all & ~group2; // グループ2とは衝突しない
				
				body = new RigidBody(i % 2 * 2 - 1, 0.5 + i * 2, 0);
				body.addShape(new BoxShape(sc, 1, 1, 1));
				body.setupMass();
				world.addRigidBody(body);
				
				// 球体
				sc.belongsTo = group1; // グループ1に属する
				sc.collidesWith = all & ~group3; // グループ3とは衝突しない
				
				body = new RigidBody((i + 1) % 2 * 2 - 1, 0.5 + i * 2, 0);
				body.addShape(new SphereShape(sc, 0.5));
				body.setupMass();
				world.addRigidBody(body);
			}
			
			// 結果：　立方体は他の物体と衝突せず、球体は直方体と衝突し、直方体同士は衝突しない
			
			// グループ情報を元に戻す
			sc.belongsTo = group1;
			sc.collidesWith = all;
			
			sc.friction = 2;
			sc.density = 10;
			control = new RigidBody(0, 0.75, 6);
			control.addShape(new SphereShape(sc, 0.75));
			control.setupMass();
			world.addRigidBody(control);
		}
		
	}

}