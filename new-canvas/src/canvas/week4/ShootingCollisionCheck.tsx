import { useEffect, useRef } from "react";

//3.17 슈팅 충돌 체크하기
//비행기를 화면 하단에 배치하여 좌우로 움직임 구현하기 ~ 미사일과 적기의 충돌 처리하기 2
const ShootingCollisionCheck = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const canW = canvas.width;
    const canH = canvas.height;
    const ctx_speed = 5;
    const enemySpeed = 0.5;

    const keysDown: { [key: string]: boolean } = {};

    interface Missile {
      x: number;
      y: number;
      w: number;
      h: number;
      bg: string;
    }

    const missiles: Missile[] = [];

    const fighterImage = new Image();
    fighterImage.src = "src/images/BlueFighter.png";
    const enemyImage = new Image();
    enemyImage.src = "src/images/EnemyFighter.png";

    const enemies = [
      { id: "enemy1", x: 100, y: -70, w: 43, h: 61 },
      { id: "enemy2", x: 200, y: -70, w: 43, h: 61 },
      { id: "enemy3", x: 300, y: -70, w: 43, h: 61 },
    ];

    class Enemy {
      render = () => {
        if (enemies.length === 0) {
          this.gameOver();
          return;
        }

        for (let i = 0; i < enemies.length; i++) {
          const enemyY = (enemies[i].y += enemySpeed);
          ctx?.drawImage(enemyImage, enemies[i].x, enemyY);
        }
      };

      gameOver = () => {
        clearInterval(objAnimate);
        if (ctx) {
          ctx.font = "bold 36px Arial, sans-serif";
          ctx.fillStyle = "#FC0";
          ctx.textAlign = "center";
          ctx.fillText("YOU WIN!", canW * 0.5, 150);
        }
      };
    }

    class Player {
      x: number;
      y: number;
      w: number;
      h: number;

      constructor() {
        this.y = 250;
        this.x = canW * 0.5 - 25;
        this.w = 50;
        this.h = 45;
      }

      render = () => {
        ctx?.drawImage(fighterImage, this.x, this.y);

        for (let i = 0; i < missiles.length; i++) {
          const m = missiles[i];
          if (ctx) {
            ctx.fillStyle = m.bg;
            ctx.fillRect(m.x, (m.y -= 5), m.w, m.h);
          }

          this.checkCollision(m, i);

          if (m.y <= 0) {
            missiles.splice(i, 1);
            i--;
          }
        }
      };

      checkCollision = (m: { x: number; y: number }, mi: number) => {
        for (let i = 0; i < enemies.length; i++) {
          const e = enemies[i];
          if (
            m.x >= e.x &&
            m.x <= e.x + e.w &&
            m.y >= e.y &&
            m.y <= e.y + e.h
          ) {
            missiles.splice(mi, 1);
            enemies.splice(i, 1);
          }
        }
      };
    }

    const player = new Player();
    const enemy = new Enemy();

    const update = () => {
      if ("a" in keysDown) {
        player.x -= ctx_speed;
      } else if ("d" in keysDown) {
        player.x += ctx_speed;
      }

      if (player.x < 0) {
        player.x = 0;
      } else if (player.x > canW - player.w) {
        player.x = canW - player.w;
      }
    };

    document.addEventListener("keydown", (event) => {
      keysDown[event.key] = true;

      if (event.key === " ") {
        missiles.push({
          x: player.x + player.w * 0.5,
          y: player.y - 5,
          w: 3,
          h: 10,
          bg: "red",
        });
      }
    });

    document.addEventListener("keyup", (event) => {
      delete keysDown[event.key];
    });

    const animate = () => {
      ctx?.clearRect(0, 0, canW, canH);
      enemy.render();
      update();
      player.render();
    };

    const objAnimate = setInterval(animate, 30);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default ShootingCollisionCheck;
