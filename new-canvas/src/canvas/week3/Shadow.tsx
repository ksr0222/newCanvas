import { useEffect, useRef } from "react";

//3.7 그림자 그리기
const Shadow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 3;
    ctx.fillStyle = "red";
    ctx.fillRect(50, 50, 100, 100);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Shadow;
