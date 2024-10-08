import { useEffect, useRef } from "react";

//3.6 글씨 쓰기
//글씨 그리기 ~ 글씨의 외곽선 그리기
const DrawLetter = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.fillStyle = "#6495ED";
    ctx.font = "italic bold 30px Arial, sans-serif";
    ctx.fillText("Hello Canvas World!", 10, 100);
    ctx.lineWidth = 2;
    ctx.strokeText("Hello Canvas World!", 10, 100);
    // ctx.fillText("The fillText() method draws filled text on the canvas.", 50, 100);
    // ctx.fillText("The fillText() method draws filled text on the canvas.", 50, 120, 100);
    // ctx.fillText("The fillText() method draws filled text on the canvas.", 50, 140, 200);
    // ctx.fillText("The fillText() method draws filled text on the canvas.", 50, 160, 300);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default DrawLetter;
