var time = Date.now();
var elapsed = 0;
var timeSinceLastParticle = 0;

var particleList = [];
var mouse = {x: 0, y: 0};

function startCanvas()
{
  c = document.getElementById("canvas");
  ctx = c.getContext("2d");

  window.addEventListener('resize', resizeCanvas, false);
  resizeCanvas();

  setInterval(() => {
    var now = Date.now();
    var delta = (now-time)/1000;
    time = now;
    elapsed += delta;
    update(delta);
    draw();
  }, 1000/60);
}

function resizeCanvas() {
  sw = c.width = window.innerWidth;
  sh = c.height = window.innerHeight;
  draw();
}

function update(delta)
{
  timeSinceLastParticle += delta;
  for (var i = 0; i < particleList.length; i++) {
    var p = particleList[i];
    p.life -= delta;
    if(p.life <= 0)
    {
      particleList.splice(i, 1);
      continue;
    }
    p.ang += p.v * 2 * delta;
    p.y -= (p.v + 128-p.z) * delta;
    p.alpha = Math.min(1, p.life*2);
  }

  if(timeSinceLastParticle >= 0.1)
    createParticle();
}

function draw()
{
  ctx.clearRect(0, 0, c.width, c.height);
  for (var particle of particleList) {
    drawParticle(particle);
  }
}

function drawParticle(p)
{
  var x = p.x;
  var y = p.y;

  /*
  // Mouse parallax
  x = (p.x - (8*(mouse.x-c.width/2)/(p.z+64)))%c.width;
  y = p.y + 8*(c.height-mouse.y)/(p.z+64);
  if(x < -64)
  {
    x += c.width+128;
  }
  */

  // Lights
  var grd = ctx.createRadialGradient(x, y, 0, x, y, 32);
  grd.addColorStop(0, `rgba(255, 0, 0, ${p.alpha*.2})`);
  grd.addColorStop(1, "transparent");
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.arc(x, y, 64, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = `rgba(255, 0, 0, ${p.alpha})`;
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.rotate(p.ang * Math.PI/180);
  ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
  ctx.stroke();
  ctx.resetTransform();
}

function createParticle()
{
  var x = Math.random() * sw;
  var z = 16 + Math.random() * 128;
  var v = 16;
  var w = 8;
  var h = 8;
  var a = Math.random() * 360;
  var lt = 6;

  particleList.push({x: x, y: sh+32, z: z, v: v, w: w, h: h, ang: a, alpha: 1, life: lt});
  timeSinceLastParticle = 0;
}
