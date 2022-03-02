export class HEX {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  static stringToHEX(value: string): HEX {
    return new HEX(value.replace(' ', '').replace('#', ''));
  }

  toString() {
    return `${this.value}`;
  }

  toHEXString() {
    return `#${this.value}`;
  }
}