import { CMYK, HEX, HLS, HSV, RGBA, XYZ } from "@/models";

export class ColorConverter {
  static convertHLStoRGB(color: HLS): RGBA {
    const hue = color.hue / 360;
    const saturation = color.saturation / 100;
    const lightness = color.lightness / 100;

    if (saturation == 0) {
      return new RGBA(lightness, lightness, lightness);
    }

    const hueToRGB = function(p: number, q: number, t: number) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = lightness < 0.5
      ? lightness * (1 + saturation)
      : lightness + saturation - lightness * saturation;
    const p = 2 * lightness - q;

    const r = hueToRGB(p, q, hue + 1 / 3);
    const g = hueToRGB(p, q, hue);
    const b = hueToRGB(p, q, hue - 1 / 3);

    return new RGBA(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
  }

  static convertHEXtoRGB(color: HEX): RGBA {
    const value = color.value;

    return new RGBA(
      parseInt(value.slice(0, 2), 16),
      parseInt(value.slice(2, 4), 16),
      parseInt(value.slice(4, 6), 16),
      Number((parseInt(value.slice(6, 8), 16) / 255).toFixed(3))
    );
  }

  static convertXYZtoRGB(color: XYZ): RGBA {
    let r = (color.x * 3.2404542) + (color.y * -1.5371385) + (color.z * -0.4985314);
    let g = (color.x * -0.969266) + (color.y * 1.8760108) + (color.z * 0.041556);
    let b = (color.x * 0.0556434) + (color.y * -0.2040259) + (color.z * 1.0572252);

    r = r > 0.0031308 ? ((1.055 * (r ** (1.0 / 2.4))) - 0.055) : r * 12.92;
    g = g > 0.0031308 ? ((1.055 * (g ** (1.0 / 2.4))) - 0.055) : g * 12.92;
    b = b > 0.0031308 ? ((1.055 * (b ** (1.0 / 2.4))) - 0.055) : b * 12.92;

    return new RGBA(
      Math.min(Math.max(0, r), 1),
      Math.min(Math.max(0, g), 1),
      Math.min(Math.max(0, b), 1),
      1
    );
  }

  static convertHSVtoRGB(color: HSV, opacity = 1): RGBA {
    const hue = color.hue / 60;
    const saturation = color.saturation;
    let value = color.value;
    const hi = Math.floor(hue) % 6;

    const f = hue - Math.floor(hue);
    const p = 255 * value * (1 - saturation);
    const q = 255 * value * (1 - (saturation * f));
    const t = 255 * value * (1 - (saturation * (1 - f)));

    switch (hi) {
      case 0:
        return new RGBA(value * 255, t, p, opacity);
      case 1:
        return new RGBA(q, value * 255, p, opacity);
      case 2:
        return new RGBA(p, value * 255, t, opacity);
      case 3:
        return new RGBA(p, q, value * 255, opacity);
      case 4:
        return new RGBA(t, p, value * 255, opacity);
      case 5:
        return new RGBA(value * 255, p, q, opacity);
    }

    return new RGBA(0, 0, 0, opacity);
  }

  static convertCMYKtoRGB(color: CMYK): RGBA {
    const cyan = color.cyan / 100;
    const magenta = color.magenta / 100;
    const yellow = color.yellow / 100;
    const key = color.black / 100;

    const red = 1 - Math.min(1, cyan * (1 - key) + key);
    const green = 1 - Math.min(1, magenta * (1 - key) + key);
    const blue = 1 - Math.min(1, yellow * (1 - key) + key);

    return new RGBA(
      Math.round(red * 255),
      Math.round(green * 255),
      Math.round(blue * 255),
      1
    );
  }

  static convertRGBtoXYZ(color: RGBA): XYZ {
    let red = color.red / 255;
    let green = color.green / 255;
    let blue = color.blue / 255;

    red = red > 0.04045 ? (((red + 0.055) / 1.055) ** 2.4) : (red / 12.92);
    green = green > 0.04045 ? (((green + 0.055) / 1.055) ** 2.4) : (green / 12.92);
    blue = blue > 0.04045 ? (((blue + 0.055) / 1.055) ** 2.4) : (blue / 12.92);

    const x = (red * 0.4124564) + (green * 0.3575761) + (blue * 0.1804375);
    const y = (red * 0.2126729) + (green * 0.7151522) + (blue * 0.072175);
    const z = (red * 0.0193339) + (green * 0.119192) + (blue * 0.9503041);

    return new XYZ(
      parseFloat((x * 100).toFixed(3)),
      parseFloat((y * 100).toFixed(3)),
      parseFloat((z * 100).toFixed(3))
    );
  }

  static convertRGBtoCMYK(color: RGBA): CMYK {
    let key = Math.min(1 - color.red / 255, 1 - color.green / 255, 1 - color.blue / 255);
    let cyan = (1 - color.red / 255 - key) / (1 - key);
    let magenta = (1 - color.green / 255 - key) / (1 - key);
    let yellow = (1 - color.blue / 255 - key) / (1 - key);

    return new CMYK(
      Math.round(cyan * 100),
      Math.round(magenta * 100),
      Math.round(yellow * 100),
      Math.round(key * 100)
    );
  }

  static convertRGBtoHLS(color: RGBA): HLS {
    const max = Math.max(color.red, color.green, color.blue);
    const min = Math.min(color.red, color.green, color.blue);
    const l = Math.round((max + min) / ((0xff * 2) / 100));

    if (max === min) return new HLS(0, 0, l);
    const d = max - min;
    const s = Math.round((d / (l > 50 ? 0xff * 2 - max - min : max + min)) * 100);

    if (max === color.red) return new HLS(Math.round(((color.green - color.blue) / d + +(color.green < color.blue && 6)) * 60), s, l);

    return max === color.green
      ? new HLS(Math.round(((color.blue - color.red) / d + 2) * 60), s, l)
      : new HLS(Math.round(((color.red - color.green) / d + 4) * 60), s, l);
  }

  static convertRGBAtoHEX(color: RGBA): HEX {
    let hex = (color.red | 1 << 8).toString(16).slice(1) +
      (color.green | 1 << 8).toString(16).slice(1) +
      (color.blue | 1 << 8).toString(16).slice(1) +
      ((color.opacity * 255) | 1 << 8).toString(16).slice(1);
    return new HEX(hex);
  }

  static convertRGBtoHSV(color: RGBA): HSV {
    const red = color.red / 255;
    const green = color.green / 255;
    const blue = color.blue / 255;
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = max - min;
    let hue = 0;

    if (max === min) {
      hue = 0;
    } else if (max === red) {
      hue = (60 * (green - blue)) / delta;
      if (green < blue) hue += 360;
    } else if (max === green) {
      hue = (60 * (blue - red)) / delta + 120;
    } else if (max === blue) {
      hue = (60 * (red - green)) / delta + 240;
    }

    hue = Math.round(hue);
    let saturation = parseFloat((max === 0 ? 0 : 1 - min / max).toFixed(2));
    let value = parseFloat(max.toFixed(2));
    return new HSV(hue, saturation, value);
  }
}