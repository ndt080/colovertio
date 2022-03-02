import { ColorConverter } from "@/utils/color-converter.util";

export class HSV {
  hue: number;
  saturation: number;
  value: number;

  constructor(hue: number, saturation: number, value: number) {
    this.hue = hue;
    this.saturation = saturation;
    this.value = value;
  }

  static stringToHSV(value: string): HSV {
    const values = value
      .replaceAll(' ', '')
      .replaceAll('%', '')
      .split(",");

    return new HSV (
      Number(values[0]) || 0,
      Number(values[1]) / 100 || 0,
      Number(values[2]) / 100 || 0
    );
  }

  toString() {
    return `${this.hue}, ${Math.floor(this.saturation * 100)}%, ${Math.floor(this.value * 100)}%`;
  }

  toRGBString(opacity = 1) {
    const rgb = ColorConverter.convertHSVtoRGB(this);
    return `rgb(${rgb?.red},${rgb?.green},${rgb?.blue})`;
  }
}