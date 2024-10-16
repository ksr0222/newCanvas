import { useEffect, useRef } from "react";

interface Particles {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
}

//3.19 간단한 불꽃 파티클 만들기
//불꽃 파티클을 여러 개 만들기
const SeveralParticles = () => {
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

    //파티클
    const particles: Particles[] = [];
    const totalCount = 30;

    const gravity = 1; //중력

    //파티클 추가
    const addParticle = () => {
      //배열의 개수를 제한
      if (particles.length >= totalCount) {
        return;
      }

      const x = ctxW / 2;
      const y = ctxH / 4;
      const size = 3;
      //초속도
      const vx = Math.random() * 20 - 10;
      const vy = Math.random() * 20 - 15;

      //파티클을 생성해서 배열에 삽입
      particles.push({ x: x, y: y, size: size, vx: vx, vy: vy });
    };

    const particle = () => {
      addParticle();

      for (let i = 0; i < particles.length; i++) {
        //하얀 원형을 하나 생성
        ctx.beginPath();
        ctx.fillStyle = "white";
        const x = (particles[i].x += particles[i].vx);
        const y = (particles[i].y += particles[i].vy);
        particles[i].vy += gravity;
        ctx.arc(x, y, particles[i].size, 0, Math.PI * 2);
        ctx.fill();

        //화면을 넘어가면 삭제
        if (particles[i].y > ctxH) {
          particles.splice(i, 1);
        }
      }
    };

    const animate = () => {
      //배경을 검게
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, ctxW, ctxH);
      ctx.fill();
      particle();
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default SeveralParticles;
