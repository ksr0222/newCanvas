import { useEffect, useRef } from "react";

//3.3 원 그리기
//기본 원 그리기
const Circle = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.arc(150, 150, 100, 0, Math.PI * 2);
    ctx.stroke();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Circle;
