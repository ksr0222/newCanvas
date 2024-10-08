import { useEffect, useRef } from "react";

//3.8 이동, 회전, 스케일, 변형하기
//위치 이동시키기 ~ 크기 변형하기
const MoveLocation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.fillStyle = "green";
    ctx.fillRect(50, 50, 100, 100);
    ctx.scale(0.5, 0.5);
    // ctx_03_7_1.translate(100, 100);
    ctx.fillStyle = "red";
    ctx.fillRect(50, 50, 100, 100);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default MoveLocation;
