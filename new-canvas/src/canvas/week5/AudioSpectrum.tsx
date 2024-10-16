import { useEffect, useRef } from "react";

//3.20 오디오 스펙트럼 만들기
//오디오 태그에서 사운드가 제대로 재생되는지 확인하기
const AudioSpectrum = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 100;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const audio = new Audio();
    audio.src = "src/sounds/nutcracker.mp3";
    audio.controls = true;
    audio.loop = false;
    audio.autoplay = false;

    const currentAudioRef = audioRef.current;
    if (currentAudioRef) {
      currentAudioRef.appendChild(audio);
    }

    return () => {
      if (currentAudioRef) {
        currentAudioRef.removeChild(audio);
      }
    };
  }, []);

  return (
    <>
      <div id="audio_player">
        <canvas ref={canvasRef}>CANVAS를 지원하지 않습니다.</canvas>
        <div id="audio_box" ref={audioRef}></div>
      </div>
    </>
  );
};

export default AudioSpectrum;
