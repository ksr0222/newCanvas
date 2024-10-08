import { useEffect, useRef } from "react";

//3.5 이미지 그리기
//이미지를 원래 크기대로 그리기 ~ 이미지를 잘라 일부만 그리기
const DrawImage = () => {
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
    heart.onload = () => {
      // ctx.drawImage(heart, 0, 0);
      // ctx.drawImage(heart, 0, 0, 150, 100);
      ctx.drawImage(heart, 100, 0, 150, 100, 0, 0, 300, 200);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default DrawImage;
