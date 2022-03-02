import type { CMYK, HEX, HLS, HSV, RGBA, XYZ } from "@/models";
import { ColorConverter } from "@/utils/color-converter.util";

export class Color {
  RGBA?: RGBA;
  CMYK?: CMYK;
  HSV?: HSV;
  XYZ?: XYZ;
  HEX?: HEX;
  HLS?: HLS;

  createFromRGBA(color: RGBA) {
    this.RGBA = color;
    this.HSV = ColorConverter.convertRGBtoHSV(color);
    this.HEX = ColorConverter.convertRGBAtoHEX(color);
    this.HLS = ColorConverter.convertRGBtoHLS(color);
    this.CMYK = ColorConverter.convertRGBtoCMYK(color);
    this.XYZ = ColorConverter.convertRGBtoXYZ(color);
  }

  createFromCMYK(color: CMYK) {
    this.RGBA = ColorConverter.convertCMYKtoRGB(color);
    this.HSV = ColorConverter.convertRGBtoHSV(this.RGBA);
    this.HEX = ColorConverter.convertRGBAtoHEX(this.RGBA);
    this.HLS = ColorConverter.convertRGBtoHLS(this.RGBA);
    this.CMYK = color
    this.XYZ = ColorConverter.convertRGBtoXYZ(this.RGBA);
  }

  createFromHSV(color: HSV) {
    this.RGBA = ColorConverter.convertHSVtoRGB(color);
    this.HSV = color
    this.HEX = ColorConverter.convertRGBAtoHEX(this.RGBA);
    this.HLS = ColorConverter.convertRGBtoHLS(this.RGBA);
    this.CMYK = ColorConverter.convertRGBtoCMYK(this.RGBA);
    this.XYZ = ColorConverter.convertRGBtoXYZ(this.RGBA);
  }

  createFromXYZ(color: XYZ) {
    this.RGBA = ColorConverter.convertXYZtoRGB(color);
    this.HSV = ColorConverter.convertRGBtoHSV(this.RGBA);
    this.HEX = ColorConverter.convertRGBAtoHEX(this.RGBA);
    this.HLS = ColorConverter.convertRGBtoHLS(this.RGBA);
    this.CMYK = ColorConverter.convertRGBtoCMYK(this.RGBA);
    this.XYZ = color;
  }

  createFromHEX(color: HEX) {
    this.RGBA = ColorConverter.convertHEXtoRGB(color);
    this.HSV = ColorConverter.convertRGBtoHSV(this.RGBA);
    this.HEX = color;
    this.HLS = ColorConverter.convertRGBtoHLS(this.RGBA);
    this.CMYK = ColorConverter.convertRGBtoCMYK(this.RGBA);
    this.XYZ = ColorConverter.convertRGBtoXYZ(this.RGBA);
  }

  createFromHLS(color: HLS) {
    this.RGBA = ColorConverter.convertHLStoRGB(color);
    this.HSV = ColorConverter.convertRGBtoHSV(this.RGBA);
    this.HEX = ColorConverter.convertRGBAtoHEX(this.RGBA);
    this.HLS = color
    this.CMYK = ColorConverter.convertRGBtoCMYK(this.RGBA);
    this.XYZ = ColorConverter.convertRGBtoXYZ(this.RGBA);
  }
}