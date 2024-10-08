import { useEffect, useRef } from "react";

//3.14 이미지를 키보드로 움직이기
//3.13절에서 만든 배경에 이어서 비행기 만들어보기, 키보드를 눌렀을 때 비행기가 움직이도록 하기
const MoveImage = () => {
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
    const fighterImage = new Image();
    fighterImage.src = "src/images/fighter.png";
    // const x = 0;
    const speed = 5;
    let keyCodeValue: string = "";

    class Background {
      x: number;
      y: number;
      w: number;
      h: number;

      constructor() {
        this.x = 0;
        this.y = 0;
        this.w = spaceImage.width;
        this.h = spaceImage.height;
      }

      render = () => {
        ctx?.drawImage(spaceImage, this.x--, 0);
        if (this.x <= -600) {
          this.x = 0;
        }
      };
    }

    class Player {
      x: number;
      y: number;
      w: number;
      h: number;

      constructor() {
        this.x = 30;
        this.y = 150;
        this.w = fighterImage.width;
        this.h = fighterImage.height;
      }

      render = () => {
        ctx?.drawImage(fighterImage, this.x, this.y);
      };
    }

    const background = new Background();
    const player = new Player();

    const update = () => {
      if (keyCodeValue === "w") {
        player.y -= speed;
      } else if (keyCodeValue === "s") {
        player.y += speed;
      } else if (keyCodeValue === "a") {
        player.x -= speed;
      } else if (keyCodeValue === "d") {
        player.x += speed;
      }
    };

    const animate = () => {
      background.render();
      player.render();
      update();
    };

    const intervalId = setInterval(animate, 30);

    document.addEventListener("keydown", (event) => {
      keyCodeValue = event.key.toLowerCase();
    });

    document.addEventListener("keyup", () => {
      keyCodeValue = "";
    });

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("keydown", () => {});
      document.removeEventListener("keyup", () => {});
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default MoveImage;
