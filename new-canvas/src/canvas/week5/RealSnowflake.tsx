import { useEffect, useRef } from "react";

interface Snowflake {
  x: number;
  y: number;
  size: number;
}

//3.18 파티클 만들기
//눈송이 낙하 속도를 조정하여 사실적으로 보이게 하기
const RealSnowflake = () => {
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

    const bgImage = new Image();
    bgImage.src = "src/images/winternight.jpg";

    const snowflakes: Snowflake[] = [];
    //눈송이 추가
    const addSnowflake = () => {
      const x = Math.floor(Math.random() * ctxW) + 1; //x좌표 랜덤
      const y = 0;
      const size = Math.floor(Math.random() * 3) + 1; //눈송이 크기 랜덤

      //눈송이를 생성해서 배열에 삽입
      snowflakes.push({ x: x, y: y, size: size });
    };

    //눈송이 그리기
    const snow = () => {
      addSnowflake();

      ctx.fillStyle = "rgba(255,255,255,0.75)";
      for (let i = 0; i < snowflakes.length; i++) {
        ctx.beginPath();
        const ty = (snowflakes[i].y += snowflakes[i].size * 0.5);
        ctx.arc(snowflakes[i].x, ty, snowflakes[i].size * 0.5, 0, Math.PI * 2);
        ctx.fill();

        //화면을 넘어가면 삭제
        if (snowflakes[i].y > ctxH) {
          snowflakes.splice(i, 1);
          i--;
        }
      }
    };

    //눈송이의 갯수를 화면에 표시
    const displayCount = () => {
      ctx.fillStyle = "white";
      ctx.font = "bold 14px Arial, sans-serif";
      ctx.fillText(snowflakes.length.toString(), 10, 20);
    };

    const animate = () => {
      ctx.clearRect(0, 0, ctxW, ctxH);
      ctx.drawImage(bgImage, 0, 0);
      snow();
      displayCount();
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default RealSnowflake;
