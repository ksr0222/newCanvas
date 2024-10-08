import { useEffect, useRef } from "react";

//3.3 원 그리기
//선과 호를 연결하여 라운드 코너 그리기
const RoundCorner = () => {
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
    ctx.arcTo(350, 50, 350, 100, 50);
    ctx.lineTo(350, 200);
    ctx.stroke();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default RoundCorner;
