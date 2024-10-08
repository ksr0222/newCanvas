import { useEffect, useRef } from "react";

//3.9 색상 보정하기
//~ 지정한 부분의 색상을 흑백으로 바꾸어 출력하기
const Greyscale = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.fillStyle = "red";
    ctx.fillRect(20, 30, 100, 100);
    ctx.fillStyle = "green";
    ctx.fillRect(50, 50, 100, 100);
    const src_03_9_1 = ctx.getImageData(0, 0, 100, 100);
    const pixels = src_03_9_1.data;
    const numPixels = pixels.length;

    for (let i = 0; i < numPixels; i++) {
      const avg = (pixels[i * 4] + pixels[i * 4 + 1] + pixels[i * 4 + 2]) / 3;
      pixels[i * 4] = avg;
      pixels[i * 4 + 1] = avg;
      pixels[i * 4 + 2] = avg;
    }

    ctx.putImageData(src_03_9_1, 200, 50);
    ctx.strokeRect(0, 0, 100, 100);
    ctx.strokeRect(200, 50, 100, 100);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Greyscale;
