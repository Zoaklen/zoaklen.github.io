function onBodyLoad()
{
  startCanvas();
  document.onmousemove = handleMouseMove;
}

function handleMouseMove(event) {
  mouse.x = event.pageX;
  mouse.y = event.pageY;
}
