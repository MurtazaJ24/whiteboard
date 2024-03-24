import { useEffect, useRef, useState } from "react";
import {
  emitCanvasImage,
  emitCanvasClear,
  emitCanvasUndo,
} from "../socket/connection";
import { useCanvasStore } from "../store/store";
import useDebounce from "./useDebounce";

export const useCanvas = (
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void
) => {
  const [mouseDown, setMouseDown] = useState(false);
  const canvasImage = useCanvasStore((state) => state.canvasImage);

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

  const undo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    emitCanvasUndo();
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "whiteboard.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const debouncedEmitCanvasImage = useDebounce(emitCanvasImage, 500);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (canvasImage === 0) {
      return clear();
    }
    const image = new Image();
    image.src = canvasImage;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Draw the image onto the canvas
    image.onload = () => {
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
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
      debouncedEmitCanvasImage(canvasRef.current?.toDataURL());
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

  return { canvasRef, onMouseDown, clear, download, undo };
};
