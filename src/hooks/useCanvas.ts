import { useEffect, useRef, useState } from "react";
import { emitCanvasImage, emitCanvasClear } from "../socket/connection";
import { useStore } from "../store/store";

export const useCanvas = (
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void
) => {
  const [mouseDown, setMouseDown] = useState(false);
  const canvasImage = useStore((state) => state.canvasImage);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<null | Point>(null);

  const onMouseDown = () => setMouseDown(true);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    emitCanvasClear();

  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "whiteboard.png";
    link.href = canvas.toDataURL();
    link.click();
  
  }

  useEffect(() => {
    if (!canvasRef.current) return;
    if (canvasImage === undefined){
        return clear();
    } 
    const image = new Image();
    image.src = canvasImage;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Draw the image onto the canvas
    image.onload = () => {
      ctx?.drawImage(image, 0, 0);
    };
  }, [canvasImage]);


  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!mouseDown) return;
      const currentPoint = computePointInCanvas(e);

      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !currentPoint) return;

      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
      emitCanvasImage(canvasRef.current?.toDataURL());
      prevPoint.current = currentPoint;
    };

    const computePointInCanvas = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      return { x, y };
    };

    const mouseUpHandler = () => {
      setMouseDown(false);
      prevPoint.current = null;
    };

    // Add event listeners
    canvasRef.current?.addEventListener("mousemove", handler);
    window.addEventListener("mouseup", mouseUpHandler);

    // Remove event listeners
    return () => {
      canvasRef.current?.removeEventListener("mousemove", handler);
      window.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [onDraw]);

  return { canvasRef, onMouseDown, clear, download };
};
