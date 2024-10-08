import {useEffect, useRef} from 'react';

//3.10 합성하기
//알파값 적용하기 ~ 두 개의 이미지를 합성하여 그리기
const Composite = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if(!canvas) return;

        canvas.width = 400;
        canvas.height = 300;

        const ctx = canvas.getContext('2d');

        if(!ctx) return;

        ctx.fillStyle = "rgba(63, 169, 245, 1)";
        ctx.fillRect(20, 20, 100, 100);
        ctx.globalCompositeOperation = "source-over";
        // ctx.globalAlpha = 0.5;
        ctx.fillStyle = "blue";
        ctx.fillRect(50, 50, 100, 100);
    },[]);

    return (
        <canvas ref={canvasRef}/>
    )
}

export default Composite;