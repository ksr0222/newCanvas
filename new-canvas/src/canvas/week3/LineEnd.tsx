import { useEffect, useRef } from "react";

//3.1 선 그리기
//선의 세 가지 끝부분 처리 방법 알아보기 ~ 선의 간격을 조정하여 점선 만들기
const LineEnd = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.lineWidth = 10;
    ctx.strokeStyle = "#00f";
    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.lineTo(300, 50);
    ctx.lineTo(300, 100);
    // ctx.setLineDash([20]);
    // ctx.setLineDash([20, 10]);
    ctx.setLineDash([20, 10, 50, 10]);
    // ctx.lineJoin = "miter";
    // ctx.lineJoin = "round";
    // ctx.lineJoin = "bevel";
    // ctx.lineCap = "butt";
    ctx.stroke();

    // ctx.beginPath();
    // ctx.moveTo(100, 100);
    // ctx.lineTo(300, 100);
    // ctx.lineCap = "round";
    // ctx.stroke();

    // ctx.beginPath();
    // ctx.moveTo(100, 150);
    // ctx.lineTo(300, 150);
    // ctx.lineCap = "square";
    // ctx.stroke();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default LineEnd;
