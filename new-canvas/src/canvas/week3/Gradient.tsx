import { useEffect, useRef } from "react";

//3.4 내부 채우기
//gradient로 내부 채우기
const Gradient = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const grad = ctx.createLinearGradient(50, 50, 250, 50);
    grad.addColorStop(0, "red");
    grad.addColorStop(1 / 6, "orange");
    grad.addColorStop(2 / 6, "yellow");
    grad.addColorStop(3 / 6, "green");
    grad.addColorStop(4 / 6, "aqua");
    grad.addColorStop(5 / 6, "blue");
    grad.addColorStop(1, "purple");
    ctx.lineWidth = 5;
    ctx.fillStyle = grad;
    ctx.fillRect(50, 50, 200, 200);
    ctx.strokeRect(50, 50, 200, 200);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Gradient;
