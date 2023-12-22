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
package com.element.oimo.physics.util {
	/**
	 * ワールドが物理演算に要した時間などを記録するクラスです。
	 * 特に表記がない場合、時間の単位はミリ秒です。
	 * @author saharan
	 */
	public class Performance {
		/**
		 * 広域衝突判定に要した時間です。
		 */
		public var broadPhaseTime:uint;
		
		/**
		 * 詳細な衝突判定に要した時間です。
		 */
		public var narrowPhaseTime:uint;
		
		/**
		 * 拘束や積分の計算に要した時間です。
		 */
		public var solvingTime:uint;
		
		/**
		 * その他の更新に要した時間です。
		 */
		public var updatingTime:uint;
		
		/**
		 * ステップ計算に要した合計時間です。
		 */
		public var totalTime:uint;
		
		/**
		 * 新しく Performance オブジェクトを作成します。
		 */
		public function Performance() {
		}
		
	}

}