import type { RGBA } from "@/models/rgba.model";

export class GradientUtil {
  static setSaturationGradientToCanvas(context: CanvasRenderingContext2D, color: RGBA) {
    const canvasWidth = context.canvas.width;
    const canvasHeight = context.canvas.height;

    context.fillStyle = color.toRGBString();
    context.fillRect(0, 0, canvasWidth, canvasHeight)

    const whiteGradient = context.createLinearGradient(0, 0, canvasWidth, 0);
    whiteGradient.addColorStop(0, `rgba(255,255,255,1)`)
    whiteGradient.addColorStop(1, `rgba(255,255,255,0)`)
    context.fillStyle = whiteGradient
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    const blackGradient = context.createLinearGradient(0, 0, 0, canvasHeight);
    blackGradient.addColorStop(0, `rgba(0,0,0,0)`);
    blackGradient.addColorStop(1, `rgba(0,0,0,1)`);
    context.fillStyle = blackGradient;
    context.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  static setRainbowGradientToCanvas(context: CanvasRenderingContext2D) {
    const canvasWidth = context.canvas.width;
    const canvasHeight = context.canvas.height;
    const gradient = context.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0, '#FF0000');
    gradient.addColorStop(1 / 6, '#FF00FF');
    gradient.addColorStop(2 / 6, '#0000FF');
    gradient.addColorStop(3 / 6, '#00FFFF');
    gradient.addColorStop(4 / 6, '#00FF00');
    gradient.addColorStop(5 / 6, '#FFFF00');
    gradient.addColorStop(1, '#FF0000');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  static setAlphaGradientToCanvas(context: CanvasRenderingContext2D, color: RGBA) {
    const canvasWidth = context.canvas.width;
    const canvasHeight = context.canvas.height;

    const squarePattern = GradientUtil.createAlphaSquarePattern(5);
    context.fillStyle = context.createPattern(squarePattern, 'repeat') as CanvasPattern;
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    const gradient = context.createLinearGradient(0, 0, canvasWidth, canvasHeight);
    gradient.addColorStop(0, `rgba(255,255,255,0)`);
    gradient.addColorStop(1, color.toRGBString());
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  static createAlphaSquarePattern(size: number): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    const doubleSize = size * 2;

    context.canvas.width = doubleSize;
    context.canvas.height = doubleSize;

    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, doubleSize, doubleSize);
    context.fillStyle = '#ccd5db';
    context.fillRect(0, 0, size, size);
    context.fillRect(size, size, size, size);

    return canvas;
  }
}