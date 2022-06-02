var time = Date.now();
var elapsed = 0;
var timeSinceLastParticle = 0;
var lastSuperParticleGhost = 0;

var particleList = [];
var superParticle = {x: 350, y: 2500, oldData: []};
var miniParticleList = [];
var mouse = {x: 0, y: 0};

var maxVel = 128;
var pColor = "255, 255, 255";
var pLight = "255, 255, 255";
var imageRectangle;

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
  imageRectangle = document.getElementById('pimg').getBoundingClientRect();
  maxVel = sh/6;
  draw();
}

function update(delta)
{
  timeSinceLastParticle += delta;
  lastSuperParticleGhost += delta;
  for (var i = 0; i < particleList.length; i++) {
    var p = particleList[i];
    p.life -= delta;
    if(p.life <= 0)
    {
      particleList.splice(i, 1);
      continue;
    }
    p.ang += p.v * 2 * delta;
    p.y -= (p.v + maxVel-p.z) * delta;
    p.alpha = Math.min(1, p.life*2);
  }

  for (var i = 0; i < superParticle.oldData.length; i++) {
    var data = superParticle.oldData[i];
    data.size = (data.size * 0.98) - 2 * delta;
    if(data.size <= 1)
    {
      superParticle.oldData.splice(i, 1);
      continue;
    }
  }

  for (var i = 0; i < miniParticleList.length; i++) {
    var particle = miniParticleList[i];
    particle.size *= 0.95;
    particle.x += particle.vx * delta;
    particle.y += particle.vy * delta;

    particle.vx *= 0.9;
    particle.vy *= 0.9;
    if(particle.size <= 1)
    {
      miniParticleList.splice(i, 1);
      continue;
    }
  }

  //superParticle.x = sw/2 + Math.cos(elapsed * 60 * Math.PI / 180) * 180;
  //superParticle.y = 350 + Math.sin(elapsed * 60 * Math.PI / 180) * 180;
  superParticle.y -= 64 * delta;
  if(superParticle.y < imageRectangle.y+imageRectangle.height/2)
  {
    superParticle.y = 2500;
    updateStyle(styleData[(currentImg += 1)%styleData.length]);
    for (var i = 0; i < 100; i++)
    {
      var ang = Math.random() * 360;
      var spd = 50+Math.random() * 250;
      var vx = spd * Math.cos(ang * Math.PI / 180);
      var vy = spd * Math.sin(ang * Math.PI / 180);
      miniParticleList.push({x: imageRectangle.x+imageRectangle.width/2, y: imageRectangle.y+imageRectangle.height/2, size: 16, vx: vx, vy: vy});
    }
  }

  if(lastSuperParticleGhost >= 0.2)
  {
    lastSuperParticleGhost = 0;
    superParticle.oldData.push({x: superParticle.x, y: superParticle.y, time: elapsed, size: 64, color: `rgba(${styleData[(currentImg + 1)%styleData.length].border}, 1)`});
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

  ctx.lineWidth = 2;
  drawSuperParticle(sw/2, superParticle.y, 64, elapsed);
  for (var i = 0; i < superParticle.oldData.length; i++) {
    var data = superParticle.oldData[i];
    ctx.strokeStyle = data.color;
    drawSuperParticle(sw/2, data.y, data.size, data.time);
  }

  for (var i = 0; i < miniParticleList.length; i++) {
    var particle = miniParticleList[i];
    drawSuperParticle(particle.x, particle.y, particle.size, elapsed);
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
  grd.addColorStop(0, `rgba(${pLight}, ${p.alpha*.2})`);
  grd.addColorStop(1, "transparent");
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.arc(x, y, 64, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = `rgba(${pColor}, ${p.alpha})`;
  ctx.translate(x, y);
  ctx.rotate(p.ang * Math.PI/180);
  ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
  ctx.resetTransform();
}

function drawSuperParticle(x, y, size, time)
{
  var grd = ctx.createRadialGradient(x, y, 0, x, y, size);
  grd.addColorStop(0, `rgba(${styleData[(currentImg + 1)%styleData.length].border}, ${Math.min(1, size/8)*.2})`);
  grd.addColorStop(1, "transparent");
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.arc(x, y, size*2, 0, 2 * Math.PI);
  ctx.fill();

  ctx.strokeStyle = `rgba(${styleData[(currentImg + 1)%styleData.length].border}, ${Math.min(1, size/8)})`;
  var ang = time;
  ctx.translate(x, y);
  ctx.rotate(ang * 15 * Math.PI/180);
  ctx.strokeRect(-size/2, -size/2, size, size);
  ctx.resetTransform();
}

function createParticle()
{
  var x = Math.random() * sw;
  var z = 16 + Math.random() * maxVel;
  var v = 16;
  var w = 8;
  var h = 8;
  var a = Math.random() * 360;
  var lt = 6;

  particleList.push({x: x, y: sh+32, z: z, v: v, w: w, h: h, ang: a, alpha: 1, life: lt});
  timeSinceLastParticle = 0;
}
