import { useEffect, useRef } from "react";

//3.4 내부 채우기
//radial gradient로 사각형 내부 채우기
const RadialGradient = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const grad = ctx.createRadialGradient(0, 0, 0, 100, 100, 300);
    grad.addColorStop(0, "red");
    grad.addColorStop(0.5, "yellow");
    grad.addColorStop(1, "black");
    ctx.lineWidth = 5;
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 300, 300);
    ctx.strokeRect(0, 0, 300, 300);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default RadialGradient;
