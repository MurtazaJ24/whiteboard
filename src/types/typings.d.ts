type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
};

type Point = { x: number; y: number };

type User = {
  id: string;
  name: string;
  username: string;
}