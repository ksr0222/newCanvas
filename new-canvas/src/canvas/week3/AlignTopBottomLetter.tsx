import { useEffect, useRef } from "react";

//3.6 글씨 쓰기
//글씨의 상하정렬 알아보기
const AlignTopBottomLetter = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.fillStyle = "#ctx";
    ctx.font = "italic bold 20px Arial, sans-serif";
    ctx.textBaseline = "top";
    ctx.fillText("top!", 10, 150);
    ctx.textBaseline = "bottom";
    ctx.fillText("bottom!", 50, 150);
    ctx.textBaseline = "middle";
    ctx.fillText("middle!", 130, 150);
    ctx.textBaseline = "alphabetic";
    ctx.fillText("alphabetic!", 220, 150);
    ctx.textBaseline = "hanging";
    ctx.fillText("hanging!", 300, 150);
    ctx.strokeStyle = "red";
    ctx.moveTo(0, 150);
    ctx.lineTo(400, 150);
    ctx.stroke();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default AlignTopBottomLetter;
