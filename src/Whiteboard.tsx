import { ArrowDownIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { ChromePicker } from "react-color";
import { useCanvas } from "./hooks/useCanvas";
import useMeasure from "./hooks/useMeasure";

const Whiteboard = () => {
  const [ref, size] = useMeasure<HTMLDivElement>();
  const [color, setColor] = useState<string>("#000");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const { canvasRef, onMouseDown, clear, download } = useCanvas(drawLine);

  console.log(size);

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = color;
    const lineWidth = 5;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  return (
    <div
      ref={ref}
      className="w-full h-screen bg-white flex flex-col gap-10 items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={size.width * 0.6}
        height={size.height * 0.7}
        className="border border-black rounded-md"
      />
      <div
        className="grid gap-1 grid-rows-2 grid-flow-col"
        style={{ width: size.width * 0.6 }}
      >
        <div
          role="button"
          className="relative min-w-10 rounded-md border border-black row-span-2"
        >
          <div
            className="w-full h-full hover:brightness-95"
            style={{ backgroundColor: color }}
            onClick={() => setDisplayColorPicker(true)}
          />
          {displayColorPicker ? (
            <div className="absolute bottom-3/4 -left-1/2 z-20">
              <div
                className="fixed inset-0 z-10 bg-black/40"
                onClick={(e) => {
                  e.stopPropagation();
                  setDisplayColorPicker(false);
                }}
              />
              <ChromePicker
                className="relative z-20"
                disableAlpha
                color={color}
                onChange={(e) => setColor(e.hex)}
              />
            </div>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => {
            setColor("#fff");
          }}
          className="min-w-10 rounded-md h-6 bg-white border border-black hover:brightness-95"
        />
        <button
          type="button"
          onClick={() => setColor("#9cacaf")}
          className="min-w-10 rounded-md h-6 bg-gray-400 border border-black hover:brightness-95"
        />
        <button
          type="button"
          onClick={() => setColor("#ef4444")}
          className="min-w-10 rounded-md h-6 bg-red-500 border border-black hover:brightness-95"
        />
        <button
          type="button"
          onClick={() => setColor("#f97316")}
          className="min-w-10 rounded-md h-6 bg-orange-500 border border-black hover:brightness-95"
        />
        <button
          type="button"
          onClick={() => setColor("#eab308")}
          className="min-w-10 rounded-md h-6 bg-yellow-500 border border-black hover:brightness-95"
        />
        <button
          type="button"
          onClick={() => setColor("#22c55e")}
          className="min-w-10 rounded-md h-6 bg-green-500 border border-black hover:brightness-95"
        />
        <button
          type="button"
          onClick={() => setColor("#6ee7b7")}
          className="min-w-10 rounded-md h-6 bg-emerald-300 border border-black hover:brightness-95"
        />
        <button
          type="button"
          onClick={() => setColor("#06b6d4")}
          className="min-w-10 rounded-md h-6 bg-cyan-500 border border-black hover:brightness-95"
        />
        <button
          type="button"
          onClick={() => setColor("#3b82f6")}
          className="min-w-10 rounded-md h-6 bg-blue-500 border border-black hover:brightness-95"
        />
        <button
          type="button"
          onClick={() => setColor("#ec4899")}
          className="min-w-10 rounded-md h-6 bg-pink-500 border border-black hover:brightness-95"
        />
        <button
          type="button"
          onClick={() => setColor("#a855f7")}
          className="min-w-10 rounded-md h-6 bg-purple-500 border border-black hover:brightness-95"
        />
        <button
          type="button"
          onClick={() => setColor("#000")}
          className="min-w-10 rounded-md h-6 bg-black border border-black hover:brightness-95"
        />
        {/* <button
            type="button"
            className="p-2 row-span-2 rounded-md border flex justify-center items-center border-black hover:brightness-95"
            onClick={clear}
          >
            <Undo2Icon className="w-6 h-6" />
          </button> */}
        <button
          type="button"
          className="p-2 row-span-2 rounded-md border flex justify-center items-center border-black hover:brightness-95"
          onClick={clear}
        >
          <TrashIcon className="w-6 h-6" />
        </button>
        <button
          type="button"
          className="p-2 row-span-2 rounded-md border flex justify-center items-center border-black hover:brightness-95"
          onClick={download}
        >
          <ArrowDownIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Whiteboard;
