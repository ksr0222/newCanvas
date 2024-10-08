import { useEffect, useRef } from "react";

//3.3 원 그리기
//quadraticCurve 그리기
const QuadraticCurve = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(300, 50);
    ctx.quadraticCurveTo(200, 100, 350, 100);
    ctx.lineTo(350, 200);
    ctx.stroke();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default QuadraticCurve;
