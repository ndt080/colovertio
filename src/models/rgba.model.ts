export class RGBA {
  red: number;
  green: number;
  blue: number;
  opacity: number;

  constructor(red: number, green: number, blue: number, opacity = 1) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.opacity = opacity;
  }

  static stringToRGBA(value: string): RGBA {
    const values = value.replace(' ', '').split(',');

    return new RGBA(
      Number(values[0]) || 0,
      Number(values[1]) || 0,
      Number(values[2]) || 0,
      Number(values[3]) || 1
    );
  }

  toString() {
    return `${this.red}, ${this.green}, ${this.blue}, ${this.opacity}`;
  }

  toRGBString() {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

  toRGBAString() {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.opacity})`;
  }
}