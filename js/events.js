function onBodyLoad()
{
  startCanvas();
  document.onmousemove = handleMouseMove;
  document.getElementById('githubbutton').parentNode.onclick = () => {
    window.location.href = 'https://github.com/Zoaklen';
  };
}

function handleMouseMove(event) {
  mouse.x = event.pageX;
  mouse.y = event.pageY;
}
