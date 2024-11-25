import { useEffect, useRef } from "react";

const Orgel = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 1000;
    canvas.height = 600;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let rotationAngle = 0;

    const drawBackground = () => {
      ctx.fillStyle = "#87CEFA"; // 연한 파란색 하늘
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 눈 그리기
      ctx.fillStyle = "white";
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 3 + 1;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawMusicBox = () => {
      ctx.save(); // 현재 상태 저장

      ctx.translate(250, 250); // 오르골의 중심으로 이동
      ctx.rotate(rotationAngle); // 오르골 회전

      // 오르골 본체
      ctx.fillStyle = "#8B4513"; // 나무 색상
      ctx.fillRect(-100, 20, 200, 150); // 본체 크기

      // 오르골 윗부분
      ctx.fillStyle = "#D2691E"; // 나무 색상
      ctx.fillRect(-60, -30, 120, 50); // 윗부분 크기

      // 손잡이
      ctx.fillStyle = "#C0C0C0"; // 은색
      ctx.beginPath();
      ctx.arc(0, -30, 10, 0, Math.PI * 2); // 손잡이 원
      ctx.fill();

      // 오르골 뚜껑에 장식
      ctx.fillStyle = "gold";
      ctx.beginPath();
      ctx.arc(0, -30, 5, 0, Math.PI * 2); // 장식
      ctx.fill();

      ctx.restore(); // 상태 복원
    };

    // 크리스마스 트리 그리기
    const drawTree = () => {
      ctx.save(); // 트리의 위치와 회전 상태 저장
      ctx.translate(250, 120); // 트리의 위치 설정

      // 크리스마스 트리 그리기
      ctx.fillStyle = "green";
      ctx.beginPath();
      ctx.moveTo(0, -50); // 트리 맨 위
      ctx.lineTo(-60, 50); // 왼쪽
      ctx.lineTo(60, 50); // 오른쪽
      ctx.closePath();
      ctx.fill();

      // 트리 장식
      ctx.fillStyle = "red";
      for (let i = 0; i < 5; i++) {
        const x = Math.random() * 120 - 60;
        const y = Math.random() * 100 - 50;
        const size = Math.random() * 4 + 2;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore(); // 상태 복원
    };

    // 애니메이션 루프
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
      drawBackground(); // 배경 그리기
      drawMusicBox(); // 오르골 그리기
      drawTree(); // 크리스마스 트리 그리기

      rotationAngle += 0.01; // 각도 증가 (회전 속도)
      requestAnimationFrame(animate); // 애니메이션 호출
    };

    animate();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Orgel;
