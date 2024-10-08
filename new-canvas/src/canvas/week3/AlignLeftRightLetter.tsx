import { useEffect, useRef } from "react";

//3.6 글씨 쓰기
//글씨의 좌우정렬 알아보기
const AlignLeftRightLetter = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.fillStyle = "#ctx_03_6_5";
    ctx.font = "italic bold 30px Arial, sans-serif";
    ctx.textAlign = "start";
    ctx.fillText("Hello World!", 200, 50);
    ctx.textAlign = "end";
    ctx.fillText("Hello World!", 200, 100);
    ctx.textAlign = "left";
    ctx.fillText("Hello World!", 200, 150);
    ctx.textAlign = "right";
    ctx.fillText("Hello World!", 200, 200);
    ctx.textAlign = "center";
    ctx.fillText("Hello World!", 200, 250);
    ctx.strokeStyle = "blue";
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 400);
    ctx.stroke();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default AlignLeftRightLetter;
