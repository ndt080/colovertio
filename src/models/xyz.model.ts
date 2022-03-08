export class XYZ {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static stringToXYZ(value: string): XYZ {
    const values = value.replaceAll(' ', '').split(',');
    return new XYZ(
      Number(values[0]) || 0,
      Number(values[1]) || 0,
      Number(values[2]) || 0,
    );
  }

  toString() {
    return `${this.x}, ${this.y}, ${this.z}`;
  }
}