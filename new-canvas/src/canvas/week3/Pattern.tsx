import { useEffect, useRef } from "react";

//3.4 내부 채우기
//패턴으로 사각형 내부 채우기
const Pattern = () => {
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
      ctx.fillStyle = ctx.createPattern(heart, "repeat") as CanvasPattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Pattern;
