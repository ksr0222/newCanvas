import { useEffect, useRef, useState } from "react";

interface Lasers {
  x: number;
  y: number;
}

interface Asteroid {
  x: number;
  y: number;
}

interface Hitexplosion {
  x: number;
  y: number;
}

//6.스페이스 슈팅 게임 만들기
const Shooting = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgAudio = useRef<HTMLAudioElement>(null);
  const isSoundOn = useRef(true);
  const keysDown: { [key: string]: boolean } = {};
  const lasers: Lasers[] = [];
  const laserTotal = 10;
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(2);
  const [showGameOver, setShowGameOver] = useState(false);
  const [gameOverSound] = useState(new Audio("src/sounds/game_over.wav"));
  const [isGameOver, setIsGameOver] = useState(false);

  //Audio handling
  const toggleSound = () => {
    if (isGameOver) {
      if (isSoundOn.current) {
        gameOverSound.pause();
      } else {
        gameOverSound.play();
      }
    } else {
      if (bgAudio.current) {
        if (isSoundOn.current) {
          bgAudio.current.pause();
        } else {
          bgAudio.current.play();
        }
        isSoundOn.current = !isSoundOn.current; // Toggle the sound state
      }
    }
  };

  const restartGame = () => {
    setShowGameOver(false);
    setLives(2); // 초기 생명 수
    setScore(0); // 초기 점수

    setIsGameOver(false);
    // isGameOver = false;

    if (bgAudio.current) {
      if (isSoundOn.current) {
        bgAudio.current.play();
      } else {
        bgAudio.current.pause();
      }
    }

    gameOverSound.currentTime = 0;
    gameOverSound.pause();
  };

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
    // const keysDown: { [key: string]: boolean } = {};

    let bool_laser = false;
    // const lasers: Lasers[] = [];
    // const laserTotal = 10;

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

    let bool_explode = false;
    const hitexplosion: Hitexplosion = { x: 0, y: 0 };
    let bool_hitexplosion = false;
    let spriteCount = 1;

    const explodeImage = new Image();
    explodeImage.src = "src/images/explode.png";

    explodeImage.onload = function () {
      bool_explode = true;
    };

    let bool_fighterexplosion = false;

    const laserSound = new Audio("src/sounds/Laser.wav");
    const explodeSound = new Audio("src/sounds/explosion.wav");
    const hitexplodeSound = new Audio("src/sounds/explosion-02.wav");
    hitexplodeSound.volume = 0.5;

    if (bgAudio.current) {
      bgAudio.current.volume = 0.5;
    }

    // let isGameOver = false;
    // const gameOverSound = new Audio("src/sounds/game_over.wav");
    gameOverSound.loop = true;
    gameOverSound.volume = 0.25;
    gameOverSound.load();

    //레이저 사운드 플레이
    const soundPlay = () => {
      laserSound.volume = 0.12;
      laserSound.load();
      laserSound.play();
    };

    //배경 그리기
    class Background {
      x: number;
      y: number;

      constructor() {
        this.x = 0;
        this.y = 0;
      }

      render = () => {
        if (!isGameOver) {
          ctx?.drawImage(spaceImage, this.x--, 0);
          if (this.x <= -600) {
            this.x = 0;
          }
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

      detectCollision();
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

    //폭발 이미지를 그리기
    const drawExplode = () => {
      ctx.drawImage(
        explodeImage,
        spriteCount * 39,
        0,
        39,
        40,
        hitexplosion.x,
        hitexplosion.y,
        39 * (1 + randScale),
        40 * (1 + randScale)
      );
      spriteCount++;
      if (spriteCount > 13) {
        spriteCount = 1;
        bool_hitexplosion = false;
      }
    };

    //충돌 처리
    const detectCollision = () => {
      const aw = asteroidImage.width * randScale;
      const ah = asteroidImage.height * randScale;
      const fw = fighterImage.width;
      const fh = fighterImage.height;

      //fighter Collision
      if (
        (player.x > asteroid.x &&
          player.x < asteroid.x + aw &&
          player.y > asteroid.y &&
          player.y < asteroid.y + ah) ||
        (player.x + fw > asteroid.x &&
          player.x + fw < asteroid.x + aw &&
          player.y > asteroid.y &&
          player.y < asteroid.y + ah) ||
        (player.x > asteroid.x &&
          player.x < asteroid.x + aw &&
          player.y + fh > asteroid.y &&
          player.y + fh < asteroid.y + ah) ||
        (player.x + fw > asteroid.x &&
          player.x + fw < asteroid.x + aw &&
          player.y + fh > asteroid.y &&
          player.y + fh < asteroid.y + ah)
      ) {
        bool_fighterexplosion = true;
        bool_explode = true;
        bool_hitexplosion = true;
        hitexplosion.x = asteroid.x;
        hitexplosion.y = asteroid.y;
        reset();
        resetFigher();
        explodeSound.load();
        explodeSound.play();

        if (lives > 0) {
          setLives((prev) => {
            const newLives = prev - 1;
            if (newLives < 0) {
              gameOver();
            }
            return newLives;
          });
        }
      }

      //laser Collision
      if (lasers.length) {
        for (let i = 0; i < lasers.length; i++) {
          if (
            lasers[i].x > asteroid.x &&
            lasers[i].x < asteroid.x + aw &&
            lasers[i].y > asteroid.y &&
            lasers[i].y < asteroid.y + ah
          ) {
            hitexplosion.x = lasers[i].x;
            hitexplosion.y = lasers[i].y;
            bool_hitexplosion = true;
            lasers.splice(i, 1);
            reset();
            setScore((prev) => prev + 100);
            // console.log("hit");
            hitexplodeSound.load();
            hitexplodeSound.play();
            // $("#score").text(Number($("#score").text()) + 100);
          }
        }
      }
    };

    //비행기의 위치 초기화
    const resetFigher = () => {
      player.x = 0;
      player.y = canvas.height / 2;
    };

    //게임 오버 화면
    const gameOver = () => {
      setIsGameOver(true);
      bool_explode = false;

      // Toggle sound off
      if (bgAudio.current) {
        bgAudio.current.pause();
        bgAudio.current.currentTime = 0;
      }

      // Play game over sound if sound is on
      if (isSoundOn.current) {
        gameOverSound.currentTime = 0;
        gameOverSound.play();
      }

      // Show game over screen
      setShowGameOver(true); // 새로운 상태를 추가합니다.
    };

    const animate = () => {
      if (!isGameOver) {
        background.render();
        player.render();

        update();

        if (bool_laser) {
          drawLaser();
          moveLaser();
        }

        //비행기 폭발할 때 처리
        if (bool_fighterexplosion) {
          ctx.drawImage(fighterImage, (player.x += 1), player.y);
          if (player.x >= 50) {
            bool_fighterexplosion = false;
          }
        } else {
          ctx.drawImage(fighterImage, player.x, player.y);
        }

        if (bool_asteroid) {
          moveAstroid();
        } else {
          //운석이 로드되면 이동 시작
          if (bool_asteroid) {
            reset(); //Reset을 호출해 랜덤 위치와 속도 부여
          }
        }

        if (bool_explode && bool_hitexplosion) {
          drawExplode();
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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isGameOver) {
        keysDown[event.key.toLowerCase()] = true;
        if (event.key === " " && lasers.length <= laserTotal) {
          lasers.push({ x: player.x + 50, y: player.y + 10 });
          soundPlay();
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      delete keysDown[event.key.toLowerCase()];
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isGameOver]);

  return (
    <>
      <div
        className={`sound ${isSoundOn.current ? "sound-on" : "sound-off"}`}
        onClick={toggleSound}
      ></div>
      <audio ref={bgAudio} className="myAudio" autoPlay loop>
        <source src="src/sounds/bg.mp3" type="audio/mpeg" />
      </audio>
      <canvas ref={canvasRef}></canvas>
      <div className="lives">
        LIVE: <span>{lives}</span>
      </div>
      <div className="score">
        SCORE: <span>{score}</span>
      </div>
      {showGameOver && (
        <div className="game-over" id="game-over">
          GAME OVER
          <p>
            <span id="restart" onClick={restartGame}>
              [Restart]
            </span>
          </p>
        </div>
      )}
    </>
  );
};

export default Shooting;
