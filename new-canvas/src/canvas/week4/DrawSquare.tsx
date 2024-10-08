import { useEffect, useRef } from "react";

//3.12 클릭한 곳에 사각형 그리기
//마우스로 클릭한 곳의 좌표 얻기
const DrawSquare = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.canvas.addEventListener("click", (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      // console.log("X: " + mouseX + ", Y: " + mouseY);
      ctx.fillStyle = "red";
      ctx.fillRect(mouseX - 10, mouseY - 10, 20, 20);
    });
  }, []);

  return <canvas ref={canvasRef} />;
};

export default DrawSquare;
