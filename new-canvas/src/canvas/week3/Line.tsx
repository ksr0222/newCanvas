import { useEffect, useRef } from "react";

//3.1 선 그리기
//선 그리기 ~ 끝부분 처리하기
const Line = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(300, 50);
    ctx.lineTo(300, 200);
    ctx.lineTo(100, 200);
    ctx.lineTo(100, 50);
    ctx.lineWidth = 20;
    ctx.strokeStyle = "#00f";
    ctx.lineCap = "square";
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fill();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Line;
