import { useEffect, useRef } from "react";

//3.9 색상 보정하기
//이미지에서 영역을 선택하여 그 부분의 색상 반전시키기
const Inversion = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const heart = new Image();
    heart.src = "src/images/heart.png";

    heart.onload = function () {
      draw();
    };

    const draw = () => {
      ctx.drawImage(heart, 0, 0);
      const src = ctx.getImageData(100, 0, 100, 100);
      const datas = src.data;
      const numPixels = datas.length;

      for (let i = 0; i < numPixels; i += 4) {
        datas[i] = 255 - datas[i];
        datas[i + 1] = 255 - datas[i + 1];
        datas[i + 2] = 255 - datas[i + 2];
      }

      ctx.putImageData(src, 100, 100);
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 3;
      ctx.strokeRect(100, 0, 100, 100);
      ctx.strokeRect(100, 100, 100, 100);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Inversion;
