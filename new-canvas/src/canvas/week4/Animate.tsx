import { useEffect, useRef } from "react";

//3.11 애니메이션 만들기
//사각형을 x축으로 왼쪽에서 오른쪽으로 움직이기
const Animate = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    let x = 0;

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "red";
      ctx.fillRect(x, 10, 50, 50);
      // ctx.rotate(0.6);
      x++;
    };

    setInterval(animate, 30);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Animate;
