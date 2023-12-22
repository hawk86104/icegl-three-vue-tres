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
package com.element.oimo.physics.constraint.contact {
	public class ContactPointDataBuffer {
		public var norX:Number;
		public var norY:Number;
		public var norZ:Number;
		public var tanX:Number;
		public var tanY:Number;
		public var tanZ:Number;
		public var binX:Number;
		public var binY:Number;
		public var binZ:Number;
		
		public var rp1X:Number;
		public var rp1Y:Number;
		public var rp1Z:Number;
		public var rp2X:Number;
		public var rp2Y:Number;
		public var rp2Z:Number;
		
		public var norU1X:Number;
		public var norU1Y:Number;
		public var norU1Z:Number;
		public var norU2X:Number;
		public var norU2Y:Number;
		public var norU2Z:Number;
		public var tanU1X:Number;
		public var tanU1Y:Number;
		public var tanU1Z:Number;
		public var tanU2X:Number;
		public var tanU2Y:Number;
		public var tanU2Z:Number;
		public var binU1X:Number;
		public var binU1Y:Number;
		public var binU1Z:Number;
		public var binU2X:Number;
		public var binU2Y:Number;
		public var binU2Z:Number;
		
		public var norT1X:Number;
		public var norT1Y:Number;
		public var norT1Z:Number;
		public var norT2X:Number;
		public var norT2Y:Number;
		public var norT2Z:Number;
		public var tanT1X:Number;
		public var tanT1Y:Number;
		public var tanT1Z:Number;
		public var tanT2X:Number;
		public var tanT2Y:Number;
		public var tanT2Z:Number;
		public var binT1X:Number;
		public var binT1Y:Number;
		public var binT1Z:Number;
		public var binT2X:Number;
		public var binT2Y:Number;
		public var binT2Z:Number;
		
		public var norTU1X:Number;
		public var norTU1Y:Number;
		public var norTU1Z:Number;
		public var norTU2X:Number;
		public var norTU2Y:Number;
		public var norTU2Z:Number;
		public var tanTU1X:Number;
		public var tanTU1Y:Number;
		public var tanTU1Z:Number;
		public var tanTU2X:Number;
		public var tanTU2Y:Number;
		public var tanTU2Z:Number;
		public var binTU1X:Number;
		public var binTU1Y:Number;
		public var binTU1Z:Number;
		public var binTU2X:Number;
		public var binTU2Y:Number;
		public var binTU2Z:Number;
		
		public var norImp:Number;
		public var tanImp:Number;
		public var binImp:Number;
		
		public var norDen:Number;
		public var tanDen:Number;
		public var binDen:Number;
		
		public var norTar:Number;
		
		public var next:ContactPointDataBuffer;
		public var last:Boolean;
		
		public function ContactPointDataBuffer() {
		}
		
	}

}