import { useEffect, useRef } from "react";

//3.19 간단한 불꽃 파티클 만들기
//원형에 초속도, 중력을 설정하여 튀는 모션 만들기
const SplashParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const ctxW = canvas.width;
    const ctxH = canvas.height;
    let x = ctxW / 2;
    let y = ctxH / 2;
    //초속도
    const vx = 10;
    let vy = -10;
    const gravity = 1; //중력

    const animate = () => {
      x += vx;
      y += vy;
      vy += gravity;

      // console.log("x:" + x + " y:" + y);
      // console.log("vx:" + vx + " vy:" + vy);

      //배경을 검게
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, ctxW, ctxH);

      //하얀 원형을 하나 생성
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default SplashParticles;
