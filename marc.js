let canvas = document.getElementById("draw-canvas");
let ctx = canvas.getContext("2d");
let isDrawing = false;
let model;

ctx.lineCap = "round";
function changeThickness(num) {
  switch (num) {
    case 1:
      ctx.lineWidth = 10;
      break;
    case 2:
      ctx.lineWidth = 4;
      break;
    case 3:
      ctx.lineWidth = 2;
      break;
    default:
      ctx.lineWidth = 2;
  }
  return ctx.lineWidth;
}
function changeColor(num) {
  switch (num) {
    case 1:
      ctx.strokeStyle = "#2717fdff";
      break;
    case 2:
      ctx.strokeStyle = "#09090dff";
      break;
    case 3:
      ctx.strokeStyle = "#c20b30ff";
      break;
    case 4:
      ctx.strokeStyle = "#097934ff";
      break;
    default:
      ctx.strokeStyle = "#09090dff";
  }
  return ctx.strokeStyle;
}
canvas.addEventListener("mousedown", () => (isDrawing = true));
canvas.addEventListener("mouseup", () => {
  isDrawing = false;
  ctx.beginPath();
  predict();
});
canvas.addEventListener("mousemove", draw);

function draw(e) {
  if (!isDrawing) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = changeColor(num) || black;
  ctx.lineWidth = changeThickness(num) || 2;
}

document.getElementById("putzen").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#09090dff";
  ctx.lineWidth = 2;
});
