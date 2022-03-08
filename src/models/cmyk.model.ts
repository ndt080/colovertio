export class CMYK {
  cyan: number;
  magenta: number;
  yellow: number;
  black: number;

  constructor(cyan: number, magenta: number, yellow: number, black: number) {
    this.cyan = cyan;
    this.magenta = magenta;
    this.yellow = yellow;
    this.black = black;
  }

  static stringToCMYK(value: string): CMYK {
    const values = value
      .replaceAll(' ', '')
      .replaceAll('%', '')
      .split(',');
    console.log(values)
    return new CMYK(
      Number(values[0]) || 0,
      Number(values[1]) || 0,
      Number(values[2]) || 0,
      Number(values[3]) || 0,
    );
  }

  toString() {
    return `${this.cyan}%, ${this.magenta}%, ${this.yellow}%, ${this.black}%`;
  }
}