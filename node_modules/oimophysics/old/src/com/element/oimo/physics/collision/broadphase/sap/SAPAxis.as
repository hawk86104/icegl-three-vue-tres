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
package com.element.oimo.physics.collision.broadphase.sap {
	/**
	 * A projection axis for sweep and prune broad-phase.
	 * @author saharan
	 */
	public class SAPAxis {
		public var elements:Vector.<SAPElement>;
		private var numElements:int;
		private var bufferSize:int;
		private const stack:Vector.<int> = new Vector.<int>(64, true);
		
		public function SAPAxis() {
			bufferSize = 256;
			elements = new Vector.<SAPElement>(bufferSize);
		}
		
		public function addElements(min:SAPElement, max:SAPElement):void {
			if (numElements + 2 >= bufferSize) {
				bufferSize <<= 1;
				var newElements:Vector.<SAPElement> = new Vector.<SAPElement>(bufferSize, true);
				for (var i:int = 0; i < numElements; i++) {
					newElements[i] = elements[i];
				}
			}
			elements[numElements++] = min;
			elements[numElements++] = max;
		}
		
		public function removeElements(min:SAPElement, max:SAPElement):void {
			var minIndex:int = -1;
			var maxIndex:int = -1;
			for (var i:int = 0; i < numElements; i++) {
				var e:SAPElement = elements[i];
				if (e == min || e == max) {
					if (minIndex == -1) {
						minIndex = i;
					} else {
						maxIndex = i;
						break;
					}
				}
			}
			for (i = minIndex + 1; i < maxIndex; i++) {
				elements[i - 1] = elements[i];
			}
			for (i = maxIndex + 1; i < numElements; i++) {
				elements[i - 2] = elements[i];
			}
			elements[--numElements] = null;
			elements[--numElements] = null;
		}
		
		public function sort():void {
			var count:int = 0;
			var threshold:int = 1;
			while ((numElements >> threshold) != 0) threshold++;
			threshold = threshold * numElements >> 2;
			count = 0;
			var giveup:Boolean = false;
			const elements:Vector.<SAPElement> = this.elements;
			for (var i:int = 1; i < numElements; i++) { // try insertion sort
				var tmp:SAPElement = elements[i];
				var pivot:Number = tmp.value;
				var tmp2:SAPElement = elements[i - 1];
				if (tmp2.value > pivot) {
					var j:int = i;
					do {
						elements[j] = tmp2;
						if (--j == 0) break;
						tmp2 = elements[j - 1];
					} while (tmp2.value > pivot);
					elements[j] = tmp;
					count += i - j;
					if (count > threshold) {
						giveup = true; // stop and use quick sort
						break;
					}
				}
			}
			if (!giveup) return;
			count = 2;
			const stack:Vector.<int> = this.stack;
			stack[0] = 0;
			stack[1] = numElements - 1;
			while (count > 0) {
				var right:int = stack[--count];
				var left:int = stack[--count];
				var diff:int = right - left;
				if (diff > 16) { // quick sort
					var mid:int = left + (diff >> 1);
					tmp = elements[mid];
					elements[mid] = elements[right];
					elements[right] = tmp;
					pivot = tmp.value;
					i = left - 1;
					j = right;
					while (true) {
						var ei:SAPElement;
						var ej:SAPElement;
						do {
							ei = elements[++i];
						} while (ei.value < pivot);
						do {
							ej = elements[--j];
						} while (pivot < ej.value && j != left);
						if (i >= j) break;
						elements[i] = ej;
						elements[j] = ei;
					}
					elements[right] = elements[i];
					elements[i] = tmp;
					if (i - left > right - i) {
						stack[count++] = left;
						stack[count++] = i - 1;
						stack[count++] = i + 1;
						stack[count++] = right;
					} else {
						stack[count++] = i + 1;
						stack[count++] = right;
						stack[count++] = left;
						stack[count++] = i - 1;
					}
				} else { // insertion sort
					for (i = left + 1; i <= right; i++) {
						tmp = elements[i];
						pivot = tmp.value;
						tmp2 = elements[i - 1];
						if (tmp2.value > pivot) {
							j = i;
							do {
								elements[j] = tmp2;
								if (--j == 0) break;
								tmp2 = elements[j - 1];
							} while (tmp2.value > pivot);
							elements[j] = tmp;
						}
					}
				}
			}
		}
		
		public function calculateTestCount():int {
			var num:int = 1;
			var sum:int = 0;
			for (var i:int = 1; i < numElements; i++) {
				if (elements[i].max) {
					num--;
				} else {
					sum += num;
					num++;
				}
			}
			return sum;
		}
		
	}

}