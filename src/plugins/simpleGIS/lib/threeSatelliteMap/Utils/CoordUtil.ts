/*
 * @Description: 
 * @Version: 1.668
 * @Autor: 地虎降天龙
 * @Date: 2024-02-26 18:58:32
 * @LastEditors: 地虎降天龙
 * @LastEditTime: 2024-03-15 11:49:37
 */
export const UTM = 'utm';
export const MERC = 'merc';

const R = 6378137;
const D2R = Math.PI / 180;
export function lonLatToWebMerctor(lon: number, lat: number) {
    const x = R * lon * D2R;
    const y = R * Math.log(Math.tan(Math.PI * 0.25 + lat * D2R * 0.5));
    return [x, y];
}
export function webMercatorToLonLat(x: number, y: number): [number, number] {
    let lon = x / (R * Math.PI) * 180;
    let lat = y / (R * Math.PI) * 180;

    lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);

    return [lon, lat];
}

export function toRadians(n: number) { return n * Math.PI / 180; }
export function toDegrees(n: number) { return n * 180 / Math.PI; };

const ellipsoidsWgs84 = { a: 6378137, b: 6356752.314245, f: 1 / 298.257223563 };
const mgrsLatBands = 'CDEFGHJKLMNPQRSTUVWXX'; // X is repeated for 80-84°N
const falseEasting = 500e3;
const falseNorthing = 10000e3;
// from https://github.com/chrisveness/geodesy/blob/761587cd748bd9f7c9825195eba4a9fc5891b859/utm.js#L272
export function lonLatToUtm(lon: number, lat: number, zoneOverride?: number) {
    if (!(-80 <= lat && lat <= 84)) throw new RangeError(`latitude ‘${lat}’ outside UTM limits`);

    let zone = zoneOverride || Math.floor((lon + 180) / 6) + 1; // longitudinal zone
    let λ0 = toRadians((zone - 1) * 6 - 180 + 3); // longitude of central meridian

    // ---- handle Norway/Svalbard exceptions
    // grid zones are 8° tall; 0°N is offset 10 into latitude bands array
    const latBand = mgrsLatBands.charAt(Math.floor(lat / 8 + 10));
    // adjust zone & central meridian for Norway
    if (zone === 31 && latBand === 'V' && lon >= 3) { zone++; λ0 += toRadians(6); }
    // adjust zone & central meridian for Svalbard
    else if (zone === 32 && latBand === 'X' && lon < 9) { zone--; λ0 -= toRadians(6); }
    else if (zone === 32 && latBand === 'X' && lon >= 9) { zone++; λ0 += toRadians(6); }
    else if (zone === 34 && latBand === 'X' && lon < 21) { zone--; λ0 -= toRadians(6); }
    else if (zone === 34 && latBand === 'X' && lon >= 21) { zone++; λ0 += toRadians(6); }
    else if (zone === 36 && latBand === 'X' && lon < 33) { zone--; λ0 -= toRadians(6); }
    else if (zone === 36 && latBand === 'X' && lon >= 33) { zone++; λ0 += toRadians(6); }

    const φ = toRadians(lat);      // latitude ± from equator
    const λ = toRadians(lon) - λ0; // longitude ± from central meridian

    // allow alternative ellipsoid to be specified
    // const ellipsoid = this.datum ? this.datum.ellipsoid : ELLIPSOIDS_WGS84;
    const { a, f } = ellipsoidsWgs84; // WGS-84: a = 6378137, f = 1/298.257223563;

    const k0 = 0.9996; // UTM scale on the central meridian

    // ---- easting, northing: Karney 2011 Eq 7-14, 29, 35:

    const e = Math.sqrt(f * (2 - f)); // eccentricity
    const n = f / (2 - f);        // 3rd flattening
    const n2 = n * n, n3 = n * n2, n4 = n * n3, n5 = n * n4, n6 = n * n5;

    const cosλ = Math.cos(λ), sinλ = Math.sin(λ); // , tanλ = Math.tan(λ)

    const τ = Math.tan(φ); // τ ≡ tanφ, τʹ ≡ tanφʹ; prime (ʹ) indicates angles on the conformal sphere
    const σ = Math.sinh(e * Math.atanh(e * τ / Math.sqrt(1 + τ * τ)));

    const τʹ = τ * Math.sqrt(1 + σ * σ) - σ * Math.sqrt(1 + τ * τ);

    const ξʹ = Math.atan2(τʹ, cosλ);
    const ηʹ = Math.asinh(sinλ / Math.sqrt(τʹ * τʹ + cosλ * cosλ));

    const A = a / (1 + n) * (1 + 1 / 4 * n2 + 1 / 64 * n4 + 1 / 256 * n6); // 2πA is the circumference of a meridian

    const α = [null, // note α is one-based array (6th order Krüger expressions)
        1 / 2 * n - 2 / 3 * n2 + 5 / 16 * n3 + 41 / 180 * n4 - 127 / 288 * n5 + 7891 / 37800 * n6,
        13 / 48 * n2 - 3 / 5 * n3 + 557 / 1440 * n4 + 281 / 630 * n5 - 1983433 / 1935360 * n6,
        61 / 240 * n3 - 103 / 140 * n4 + 15061 / 26880 * n5 + 167603 / 181440 * n6,
        49561 / 161280 * n4 - 179 / 168 * n5 + 6601661 / 7257600 * n6,
        34729 / 80640 * n5 - 3418889 / 1995840 * n6,
        212378941 / 319334400 * n6];

    let ξ = ξʹ;
    for (let j = 1; j <= 6; j++) ξ += α[j]! * Math.sin(2 * j * ξʹ) * Math.cosh(2 * j * ηʹ);

    let η = ηʹ;
    for (let j = 1; j <= 6; j++) η += α[j]! * Math.cos(2 * j * ξʹ) * Math.sinh(2 * j * ηʹ);

    let x = k0 * A * η;
    let y = k0 * A * ξ;

    // shift x/y to false origins
    x = x + falseEasting;             // make x relative to false easting
    if (y < 0) y = y + falseNorthing; // make y in southern hemisphere relative to false northing

    return [x, y];
}

export function utmToLonLat(easting: number, northing: number, zoneOverride?: number): [number, number] {
    const hemisphere = 'N'
    const zone = zoneOverride || 50
    const z = zone
    const h = hemisphere

    const falseEasting = 500e3, falseNorthing = 10000e3;

    const { a, f } = ellipsoidsWgs84 // WGS-84: a = 6378137, f = 1/298.257223563;

    const k0 = 0.9996; // UTM scale on the central meridian

    const x = easting - falseEasting;                           // make x ± relative to central meridian
    const y = h == 'S' ? northing - falseNorthing : northing; // make y ± relative to equator

    // ---- from Karney 2011 Eq 15-22, 36:

    const e = Math.sqrt(f * (2 - f)); // eccentricity
    const n = f / (2 - f);        // 3rd flattening
    const n2 = n * n, n3 = n * n2, n4 = n * n3, n5 = n * n4, n6 = n * n5;

    const A = a / (1 + n) * (1 + 1 / 4 * n2 + 1 / 64 * n4 + 1 / 256 * n6); // 2πA is the circumference of a meridian

    const η = x / (k0 * A);
    const ξ = y / (k0 * A);

    const β = [null, // note β is one-based array (6th order Krüger expressions)
        1 / 2 * n - 2 / 3 * n2 + 37 / 96 * n3 - 1 / 360 * n4 - 81 / 512 * n5 + 96199 / 604800 * n6,
        1 / 48 * n2 + 1 / 15 * n3 - 437 / 1440 * n4 + 46 / 105 * n5 - 1118711 / 3870720 * n6,
        17 / 480 * n3 - 37 / 840 * n4 - 209 / 4480 * n5 + 5569 / 90720 * n6,
        4397 / 161280 * n4 - 11 / 504 * n5 - 830251 / 7257600 * n6,
        4583 / 161280 * n5 - 108847 / 3991680 * n6,
        20648693 / 638668800 * n6];

    let ξʹ = ξ;
    for (let j = 1; j <= 6; j++) ξʹ -= β[j] * Math.sin(2 * j * ξ) * Math.cosh(2 * j * η);

    let ηʹ = η;
    for (let j = 1; j <= 6; j++) ηʹ -= β[j] * Math.cos(2 * j * ξ) * Math.sinh(2 * j * η);

    const sinhηʹ = Math.sinh(ηʹ);
    const sinξʹ = Math.sin(ξʹ), cosξʹ = Math.cos(ξʹ);

    const τʹ = sinξʹ / Math.sqrt(sinhηʹ * sinhηʹ + cosξʹ * cosξʹ);

    let δτi = null;
    let τi = τʹ;
    do {
        const σi = Math.sinh(e * Math.atanh(e * τi / Math.sqrt(1 + τi * τi)));
        const τiʹ = τi * Math.sqrt(1 + σi * σi) - σi * Math.sqrt(1 + τi * τi);
        δτi = (τʹ - τiʹ) / Math.sqrt(1 + τiʹ * τiʹ)
            * (1 + (1 - e * e) * τi * τi) / ((1 - e * e) * Math.sqrt(1 + τi * τi));
        τi += δτi;
    } while (Math.abs(δτi) > 1e-12); // using IEEE 754 δτi -> 0 after 2-3 iterations
    // note relatively large convergence test as δτi toggles on ±1.12e-16 for eg 31 N 400000 5000000
    const τ = τi;

    const φ = Math.atan(τ);

    let λ = Math.atan2(sinhηʹ, cosξʹ);

    // ---- convergence: Karney 2011 Eq 26, 27

    let p = 1;
    for (let j = 1; j <= 6; j++) p -= 2 * j * β[j] * Math.cos(2 * j * ξ) * Math.cosh(2 * j * η);
    let q = 0;
    for (let j = 1; j <= 6; j++) q += 2 * j * β[j] * Math.sin(2 * j * ξ) * Math.sinh(2 * j * η);

    const γʹ = Math.atan(Math.tan(ξʹ) * Math.tanh(ηʹ));
    const γʺ = Math.atan2(q, p);

    const γ = γʹ + γʺ;

    // ---- scale: Karney 2011 Eq 28

    const sinφ = Math.sin(φ);
    const kʹ = Math.sqrt(1 - e * e * sinφ * sinφ) * Math.sqrt(1 + τ * τ) * Math.sqrt(sinhηʹ * sinhηʹ + cosξʹ * cosξʹ);
    const kʺ = A / a / Math.sqrt(p * p + q * q);

    const k = k0 * kʹ * kʺ;

    // ------------

    const λ0 = toRadians((z - 1) * 6 - 180 + 3); // longitude of central meridian
    λ += λ0; // move λ from zonal to global coordinates

    // round to reasonable precision
    const lat = Number(toDegrees(φ).toFixed(14)); // nm precision (1nm = 10^-14°)
    const lon = Number(toDegrees(λ).toFixed(14)); // (strictly lat rounding should be φ⋅cosφ!)

    return [lon, lat];
}
