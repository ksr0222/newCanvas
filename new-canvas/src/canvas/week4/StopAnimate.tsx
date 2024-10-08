import { useEffect, useRef } from "react";

//3.11 애니메이션 만들기
//두 개의 사각형을 만들고 애니메이션을 멈추게 하기
const StopAnimate = () => {
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
    let x = 0,
      y = 0;

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "red";
      ctx.fillRect(x, 10, 50, 50);
      ctx.fillStyle = "blue";
      ctx.fillRect(10, y, 50, 50);
      x++;
      y++;

      if (x > W) {
        x = 0;
      }

      if (y > H) {
        y = 0;
      }
    };
    const animateInterval = setInterval(animate, 30);

    ctx.canvas.addEventListener("click", function () {
      clearInterval(animateInterval);
    });
  }, []);

  return <canvas ref={canvasRef} />;
};

export default StopAnimate;
