export class HLS {
  hue: number;
  lightness: number;
  saturation: number;

  constructor(hue: number, saturation: number, lightness: number) {
    this.hue = hue;
    this.lightness = lightness;
    this.saturation = saturation;
  }

  static stringToHLS(value: string): HLS {
    const values = value
      .replaceAll(' ', '')
      .replaceAll('%', '')
      .split(',');

    return new HLS(
      Number(values[0]) || 0,
      Number(values[1]) || 0,
      Number(values[2]) || 0,
    );
  }

  toString() {
    return `${this.hue}, ${this.saturation}%, ${this.lightness}%`;
  }
}