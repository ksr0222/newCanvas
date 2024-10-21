import { useEffect, useRef } from "react";

interface Lasers {
  x: number;
  y: number;
}

interface Asteroid {
  x: number;
  y: number;
}

//6.스페이스 슈팅 게임 만들기
const Shooting = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 600;
    canvas.height = 400;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const spaceImage = new Image();
    spaceImage.src = "src/images/space.png";
    const fighterImage = new Image();
    fighterImage.src = "src/images/fighter.png";
    const speed = 5;
    const keysDown: { [key: string]: boolean } = {};

    let bool_laser = false;
    const lasers: Lasers[] = [];
    const laserTotal = 10;

    const laserImage = new Image();
    laserImage.src = "src/images/laser.png";

    laserImage.onload = function () {
      bool_laser = true;
    };

    const asteroid: Asteroid = { x: 0, y: 0 };
    let bool_asteroid = false;

    const asteroidImage = new Image();
    asteroidImage.src = "src/images/asteroid.png";

    let asteroidSpeed: number = 10;
    let randScale: number;
    let ang = 0;
    const arrScale: number[] = [0.4, 0.6, 0.8, 1];
    asteroid.x = canvas.width;
    asteroid.y = Math.floor(Math.random() * 350);

    //배경 그리기
    class Background {
      x: number;
      y: number;

      constructor() {
        this.x = 0;
        this.y = 0;
      }

      render = () => {
        ctx?.drawImage(spaceImage, this.x--, 0);
        if (this.x <= -600) {
          this.x = 0;
        }
      };
    }

    //비행기 그리기
    class Player {
      x: number;
      y: number;

      constructor() {
        this.x = 30;
        this.y = 150;
      }

      render = () => {
        ctx?.drawImage(fighterImage, this.x, this.y);
      };
    }

    const background = new Background();
    const player = new Player();

    //비행기 움직이기
    const update = () => {
      //up w
      if ("w" in keysDown) {
        player.y -= speed;
        //down s
      } else if ("s" in keysDown) {
        player.y += speed;
        //left a
      } else if ("a" in keysDown) {
        player.x -= speed;
        //right d
      } else if ("d" in keysDown) {
        player.x += speed;
      }

      //boundery limit
      if (player.x <= 0) {
        player.x = 0;
      }
      if (player.x >= canvas.width - 60) {
        player.x = canvas.width - 60;
      }
      if (player.y <= 0) {
        player.y = 0;
      }
      if (player.y >= canvas.height - 30) {
        player.y = canvas.height - 30;
      }
    };

    //레이져 그리기
    const drawLaser = () => {
      if (lasers.length) {
        for (let i = 0; i < lasers.length; i++) {
          // ctx.drawImage(laserImage, lasers[i][0], lasers[i][1]);
          ctx.drawImage(laserImage, lasers[i].x, lasers[i].y);
        }
      }
    };

    //레이져 움직이기
    const moveLaser = () => {
      for (let i = 0; i < lasers.length; i++) {
        if (lasers[i].x > 0) {
          lasers[i].x += 20;
        }

        if (lasers[i].x > 600) {
          lasers.splice(i, 1);
          i--;
        }
      }
    };

    //운석의 크기를 배열에서 랜덤으로 뽑기
    const shuffle = (arr: number[]) => {
      const rand = Math.floor(Math.random() * arr.length);
      return arr[rand];
    };

    //운석 초기값
    const reset = () => {
      asteroidSpeed = Math.floor(Math.random() * 5) + 5;
      asteroid.x = canvas.width;
      asteroid.y = Math.floor(Math.random() * 350);

      if (asteroid.y < 40) {
        asteroid.y = 40;
      }

      if (asteroid.y > 360) {
        asteroid.y = 360;
      }

      randScale = shuffle(arrScale);
    };

    //운석 그리기
    const moveAstroid = () => {
      const w = asteroidImage.width * randScale;
      const h = asteroidImage.height * randScale;
      const coordX = (asteroidImage.width / 2) * randScale;
      const coordY = (asteroidImage.height / 2) * randScale;

      ctx.save();
      ctx.translate(asteroid.x + coordX, asteroid.y + coordY);
      ctx.rotate((Math.PI / 180) * (ang += 5));
      ctx.translate(-asteroid.x - coordX, -asteroid.y - coordY);
      ctx.drawImage(asteroidImage, (asteroid.x -= speed), asteroid.y, w, h);
      ctx.restore();

      if (asteroid.x <= -100) {
        reset();
      }
    };

    const animate = () => {
      background.render();
      player.render();
      update();

      if (bool_laser) {
        drawLaser();
        moveLaser();
      }

      if (bool_asteroid) {
        moveAstroid();
      } else {
        //운석이 로드되면 이동 시작
        if (bool_asteroid) {
          reset(); //Reset을 호출해 랜덤 위치와 속도 부여
        }
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    //이미지가 로드되면 bool_asteroid를 true로 설정
    asteroidImage.onload = function () {
      bool_asteroid = true;
      reset(); //첫 초기화
    };

    document.addEventListener("keydown", (event) => {
      keysDown[event.key.toLowerCase()] = true;
      if (event.key === " " && lasers.length <= laserTotal) {
        lasers.push({ x: player.x + 50, y: player.y + 10 });
      }
    });

    document.addEventListener("keyup", (event) => {
      delete keysDown[event.key.toLowerCase()];
    });

    return () => {
      document.removeEventListener("keydown", () => {});
      document.removeEventListener("keyup", () => {});
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Shooting;
