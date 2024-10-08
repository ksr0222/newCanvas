import { useEffect, useRef } from "react";

//3.15 JSON 객체와 배열 처리하기
//JSON 객체를 배열로 처리하여 사각형을 캔버스에 그리기
const DrawSquareObject = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const buildings = [
      { id: "house", x: 50, y: 100, w: 50, h: 50, bg: "red" },
      { id: "hospital", x: 150, y: 100, w: 50, h: 50, bg: "green" },
      { id: "firestation", x: 250, y: 100, w: 50, h: 50, bg: "blue" },
    ];

    for (let i = 0; i < buildings.length; i++) {
      const b = buildings[i];
      ctx.fillStyle = b.bg;
      ctx.fillRect(b.x, b.y, b.w, b.h);
    }
  }, []);

  return <canvas ref={canvasRef} />;
};

export default DrawSquareObject;
