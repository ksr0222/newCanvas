import { useEffect, useRef } from "react";

//3.19 간단한 불꽃 파티클 만들기
//파티클의 불꽃 하나 만들기 ~ 불꽃 파티클 움직이기
const Particles = () => {
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
    let x = 200;
    let y = 150;

    const animate = () => {
      //배경을 검게
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, ctxW, ctxH);

      //하얀 원형을 하나 생성
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.arc(x++, (y += 0.5), 5, 0, Math.PI * 2);
      ctx.fill();
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Particles;
