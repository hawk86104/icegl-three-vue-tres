void clip( float clipValue, float alphaThreshold, int type )
{
    // switch operation because were only value checking type
    switch( type )
    {
        case 0: // 0 means less than
            if( clipValue < alphaThreshold ) discard;
        break;

        case 1: // 1 means greater than
            if( clipValue > alphaThreshold ) discard;
        break;

        case 2: // less than equal to
            if( clipValue <= alphaThreshold ) discard;
        break;

        case 3: // greater than equal 2
            if( clipValue >= alphaThreshold ) discard;
        break;

        case 4: // equal to
            if( clipValue == alphaThreshold ) discard;
        break;

        default: // defaults to less than
            if( clipValue < alphaThreshold ) discard;
        break;
    }
}