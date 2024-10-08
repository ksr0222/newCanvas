import "./App.css";
import Line from "./canvas/week3/Line";
import LineEnd from "./canvas/week3/LineEnd";
import Square from "./canvas/week3/Square";
import Circle from "./canvas/week3/Circle";
import RoundCorner from "./canvas/week3/RoundCorner";
import QuadraticCurve from "./canvas/week3/QuadraticCurve";
import BezierCurve from "./canvas/week3/BezierCurve";
import Gradient from "./canvas/week3/Gradient";
import RadialGradient from "./canvas/week3/RadialGradient";
import Pattern from "./canvas/week3/Pattern";
import DrawImage from "./canvas/week3/DrawImage";
import DrawLetter from "./canvas/week3/DrawLetter";
import AlignLeftRightLetter from "./canvas/week3/AlignLeftRightLetter";
import AlignTopBottomLetter from "./canvas/week3/AlignTopBottomLetter";
import Shadow from "./canvas/week3/Shadow";
import MoveLocation from "./canvas/week3/MoveLocation";
import Rotate from "./canvas/week3/Rotate";
import Greyscale from "./canvas/week3/Greyscale";
import Inversion from "./canvas/week3/Inversion";
import Composite from "./canvas/week4/Composite";
import Animate from "./canvas/week4/Animate";
import StopAnimate from "./canvas/week4/StopAnimate";
import DrawSquare from "./canvas/week4/DrawSquare";
import BgAnimate from "./canvas/week4/BgAnimate";
import MoveImage from "./canvas/week4/MoveImage";
import DrawSquareObject from "./canvas/week4/DrawSquareObject";
import DrawImageObject from "./canvas/week4/DrawImageObject";
import ShootingCollisionCheck from "./canvas/week4/ShootingCollisionCheck";

function App() {
  return (
    <>
      <h1>🪄3주차</h1>
      <div className="wrap">
        <Line />
        <LineEnd />
        <Square />
        <Circle />
        <RoundCorner />
        <QuadraticCurve />
        <BezierCurve />
        <Gradient />
        <RadialGradient />
        <Pattern />
        <DrawImage />
        <DrawLetter />
        <AlignLeftRightLetter />
        <AlignTopBottomLetter />
        <Shadow />
        <MoveLocation />
        <Rotate />
        <Greyscale />
        <Inversion />
      </div>
      <h1>🪄4주차</h1>
      <div className="wrap">
        <Composite />
        <Animate />
        <StopAnimate />
        <DrawSquare />
        <BgAnimate />
        <MoveImage />
        <DrawSquareObject />
        <DrawImageObject />
        <ShootingCollisionCheck />
      </div>
    </>
  );
}

export default App;
