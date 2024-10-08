import { useEffect, useRef } from "react";

//3.2 사각형 그리기
//사각형 그리기 ~ 내부를 사각형으로 지우기
const Square = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.lineWidth = 10;
    ctx.strokeStyle = "red";
    ctx.fillStyle = "blue";
    ctx.fillRect(50, 50, 200, 200);
    ctx.strokeRect(50, 50, 200, 200);
    ctx.clearRect(70, 70, 100, 50);
    // ctx.fillStyle = "magenta";
    // ctx.fillRect(20, 20, 100, 100);
    // ctx.strokeRect(20, 20, 100, 100);
    // ctx.fillStyle = "green";
    // ctx.fillRect(150, 150, 50, 50);
    // ctx.strokeRect(150, 150, 50, 50);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Square;
