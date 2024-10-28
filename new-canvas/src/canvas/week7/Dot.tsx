import { useEffect, useRef } from "react";

//8.선 이어 그리기
const Dot = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 600;
    canvas.height = 400;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const img = new Image();
    img.src = "src/images/dottodot_airplane.png";
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };

    let startX = 0;
    let startY = 0;
    const arrCoords: string[] = [];
    const totalPoint = 31;
    const finishImg = new Image();
    finishImg.src = "src/images/dottodot_airplane_finish.png";

    const handleClick = (event: MouseEvent) => {
      //총포인트의 개수를 넘으면 리턴
      if (arrCoords.length >= totalPoint) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = Math.round(event.clientY - rect.top);
      const radius = 8;

      //라인 그리기
      if (arrCoords.length === 0) {
        startX = mouseX - 5;
        startY = mouseY;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
      } else {
        ctx.moveTo(startX, startY);
        startX = mouseX - 5;
        startY = mouseY;
        ctx.lineTo(startX, startY);
      }
      ctx.stroke();

      //circle draw
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, radius, 0, 6.28);
      ctx.fillStyle = "yellow";
      ctx.fill();
      ctx.stroke();

      //text draw
      const coordcnt: number = arrCoords.length + 1;
      ctx.font = "normal bold 8px Arial, sans-serif";
      ctx.fillStyle = "#000000";
      ctx.fillText(coordcnt.toString(), mouseX - 3, mouseY + 4);

      //배열에 담기
      arrCoords.push(mouseX + "," + mouseY);
      //총 포인트의 개수와 같으면 완성된 이미지를 보여주기
      if (arrCoords.length === totalPoint) {
        alert("잘 하셨습니다.");
        render();
      }
      // console.log(arrCoords);
    };

    ctx.canvas.addEventListener("click", handleClick);

    //완성된 이미지를 보여주기
    const render = () => {
      ctx.drawImage(finishImg, 0, 0);
    };

    return () => {
      ctx.canvas.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} />
      <img src={"src/images/dottodot_airplane.png"} id="img" alt="img" />
    </>
  );
};

export default Dot;
