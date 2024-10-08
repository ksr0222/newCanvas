import { useEffect, useRef } from "react";

//3.15 JSON 객체와 배열 처리하기
//JSON 객체를 배열로 처리하여 캔버스에 이미지 그리기, 캔버스의 빌딩 이미지를 마우스로 클릭할 때 빌딩 이름 출력하기
const DrawImageObject = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const buildings = [
      { id: "AirPort", x: 50, y: 50, w: 64, h: 64, sx: 0, sy: 0 },
      { id: "Bank", x: 150, y: 50, w: 64, h: 64, sx: 100, sy: 0 },
      { id: "CarRepair", x: 250, y: 50, w: 64, h: 64, sx: 200, sy: 0 },
      { id: "GasStation", x: 50, y: 150, w: 64, h: 64, sx: 300, sy: 0 },
      { id: "Hospital", x: 150, y: 150, w: 64, h: 64, sx: 400, sy: 0 },
      { id: "Temple", x: 250, y: 150, w: 64, h: 64, sx: 500, sy: 0 },
    ];
    const buildingImage = new Image();
    buildingImage.src = "src/images/buildings.png";

    const groundImage = new Image();
    groundImage.src = "src/images/background.png";

    buildingImage.onload = function () {
      ctx.drawImage(groundImage, 0, 0);
      for (let i = 0; i < buildings.length; i++) {
        const sx = buildings[i]["sx"];
        const sy = buildings[i]["sy"];
        const sw = buildings[i]["w"];
        const sh = buildings[i]["h"];
        const dx = buildings[i]["x"];
        const dy = buildings[i]["y"];
        const dw = buildings[i]["w"];
        const dh = buildings[i]["h"];
        ctx.drawImage(buildingImage, sx, sy, sw, sh, dx, dy, dw, dh);
      }
    };

    document.addEventListener("mousedown", function (event) {
      const rect_v2 = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect_v2.left;
      const mouseY = event.clientY - rect_v2.top;

      for (let i = 0; i < buildings.length; i++) {
        const bData = buildings[i];

        if (
          mouseX >= bData.x &&
          mouseX < bData.x + bData.w &&
          mouseY >= bData.y &&
          mouseY < bData.y + bData.h
        ) {
          //            console.log(bData.id);
          ctx.clearRect(100, 260, 200, 30);
          ctx.fillStyle = "yellow";
          ctx.fillRect(100, 260, 200, 30);

          ctx.fillStyle = "#6495ED";
          ctx.textAlign = "center";
          ctx.font = "bold 20px Arial, sans-serif";
          ctx.fillText(bData.id, 200, 280);
        }
      }
    });
  }, []);

  return <canvas ref={canvasRef} />;
};

export default DrawImageObject;
