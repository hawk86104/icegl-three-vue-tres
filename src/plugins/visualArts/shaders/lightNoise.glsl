float N21(vec2 st){// https://thebookofshaders.com/10/
	return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}
float smoothNoise(vec2 ip){// https://www.youtube.com/watch?v=zXsWftRdsvU
	vec2 lv=fract(ip);
	vec2 id=floor(ip);
	
	lv=lv*lv*(3.-2.*lv);
	
	float bl=N21(id);
	float br=N21(id+vec2(1,0));
	float b=mix(bl,br,lv.x);
	
	float tl=N21(id+vec2(0,1));
	float tr=N21(id+vec2(1,1));
	float t=mix(tl,tr,lv.x);
	
	return clamp(mix(b,t,lv.y)*.5+.5,0.,1.);
}
float smoothNoise2(vec2 p){
	p.y+=time;
	p/=4.;
	
	float n=smoothNoise(p)*1.5;
	n+=smoothNoise(p*2.01)*.25;
	n+=smoothNoise(p*4.02)*.125;
	n+=smoothNoise(p*8.03)*.0625;
	n/=(1.5+.25+.125+.0625);
	return clamp(n,0.,1.);
}