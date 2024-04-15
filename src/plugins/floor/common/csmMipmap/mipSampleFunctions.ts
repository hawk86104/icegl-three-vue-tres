export const sampleFunctions = /* glsl */`

	// Without original size argument for power of two targets
	vec4 packedTexture2DLOD( sampler2D tex, vec2 uv, int level ) {

		// the fraction of the uv space used by the target mip
		float targetSubview = 1.0 / pow( 2.0, float( level ) );
		float widthRatio = 2.0 / 3.0;
		vec2 scaledDimensions = vec2( targetSubview * widthRatio, targetSubview );

		// all levels > 0 are on the right third of the texture
		// y is offset from the bottom
		vec2 offset = vec2(
			level > 0 ? widthRatio : 0.0,
			level > 0 ? targetSubview : 0.0
		);

		vec2 samplePoint = mix( offset, offset + scaledDimensions, uv );
		return texture2D( tex, samplePoint );

	}

	vec4 packedTexture2DLOD( sampler2D tex, vec2 uv, float level ) {

		float ratio = mod( level, 1.0 );
		int minLevel = int( floor( level ) );
		int maxLevel = int( ceil( level ) );

		vec4 minValue = packedTexture2DLOD( tex, uv, minLevel );
		vec4 maxValue = packedTexture2DLOD( tex, uv, maxLevel );

		return mix( minValue, maxValue, ratio );

	}

	// With original size argument
	vec4 packedTexture2DLOD( sampler2D tex, vec2 uv, int level, vec2 originalPixelSize ) {

		float floatLevel = float( level );
		vec2 atlasSize;
		atlasSize.x = floor( originalPixelSize.x * 1.5 );
		atlasSize.y = originalPixelSize.y;

		// we stop making mip maps when one dimension == 1
		float maxLevel = min( floor( log2( originalPixelSize.x ) ), floor( log2( originalPixelSize.y ) ) );
		floatLevel = min( floatLevel, maxLevel );

		// use inverse pow of 2 to simulate right bit shift operator
		vec2 currentPixelDimensions = floor( originalPixelSize / pow( 2.0, floatLevel ) );
		vec2 pixelOffset = vec2(
			floatLevel > 0.0 ? originalPixelSize.x : 0.0,
			floatLevel > 0.0 ? currentPixelDimensions.y : 0.0
		);

		// "minPixel / atlasSize" samples the top left piece of the first pixel
		// "maxPixel / atlasSize" samples the bottom right piece of the last pixel
		vec2 minPixel = pixelOffset;
		vec2 maxPixel = pixelOffset + currentPixelDimensions;
		vec2 samplePoint = mix( minPixel, maxPixel, uv );
		samplePoint /= atlasSize;

		vec2 halfPixelSize = 1.0 / ( 2.0 * atlasSize );
		samplePoint = min( samplePoint, maxPixel / atlasSize - halfPixelSize );
		samplePoint = max( samplePoint, minPixel / atlasSize + halfPixelSize );

		return texture2D( tex, samplePoint );

	}

	vec4 packedTexture2DLOD( sampler2D tex, vec2 uv, float level, vec2 originalPixelSize ) {

		float ratio = mod( level, 1.0 );
		int minLevel = int( floor( level ) );
		int maxLevel = int( ceil( level ) );

		vec4 minValue = packedTexture2DLOD( tex, uv, minLevel, originalPixelSize );
		vec4 maxValue = packedTexture2DLOD( tex, uv, maxLevel, originalPixelSize );

		return mix( minValue, maxValue, ratio );

	}

`;