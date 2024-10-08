import { useEffect, useRef } from "react";

//3.13 백그라운드 이미지 애니메이션 만들기
//이미지 애니메이션 만들기
const BgAnimate = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const spaceImage = new Image();
    spaceImage.src = "src/images/space.png";
    let x = 0;

    const animate = () => {
      ctx.drawImage(spaceImage, x--, 0);

      if (x <= -600) {
        x = 0;
      }
    };
    setInterval(animate, 30);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default BgAnimate;
