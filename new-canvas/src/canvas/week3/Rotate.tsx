import { useEffect, useRef } from "react";

//3.8 이동, 회전, 스케일, 변형하기
//회전시키기 ~ 사각형 형태 변형하기
const Rotate = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;
    // ctx.strokeRect(100, 100, 100, 100);
    // ctx.fillRect(100, 100, 100, 100);
    // ctx.rotate(5 * Math.PI / 180);
    // ctx.strokeRect(100, 100, 100, 100);
    // ctx.fillRect(100, 100, 100, 100);
    // ctx.rotate(5 * Math.PI / 180);
    // ctx.strokeRect(100, 100, 100, 100);
    // ctx.fillRect(100, 100, 100, 100);

    // ctx.strokeRect(0, 0, 100, 100);
    // ctx.fillRect(0, 0, 100, 100);
    // ctx.transform(1.5, 0, 0, 1.5, 100, 100);
    // ctx.strokeRect(0, 0, 100, 100);
    // ctx.fillRect(0, 0, 100, 100);

    ctx.strokeRect(0, 0, 100, 100);
    ctx.fillRect(0, 0, 100, 100);
    ctx.setTransform(1, 0.2, 0.2, 1, 100, 100);
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, 100, 100);
    ctx.transform(1, 0, 0, 1, 100, 100);
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 100, 100);
    // ctx.strokeRect(0, 0, 100, 100);
    // ctx.fillRect(0, 0, 100, 100);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Rotate;
