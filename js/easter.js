var currentImg = -1;

var styleData = [
  {img: "tumblr_nl2z6atdZh1qlp4x9o1_r1_500.webp", backgroundA: "8, 0, 16", backgroundB: "0, 0, 16", border: "255, 255, 124", particle: "187, 200, 205", light: "187, 200, 205", font: "255, 255, 255"}
];

function updateStyle(style)
{
  const el = document.getElementById('dynamicstyle');
  if(el == null)
    return;

  var darkRgb = style.border.replace(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*/, regexDarkReplace);
  el.innerHTML = `
    #pimg
    {
      border-color: rgb(${style.border});
      background-color: rgb(${style.border});
    }

    body
    {
      background: rgb(${style.backgroundA});
      background: linear-gradient(43deg, rgb(${style.backgroundA}) 0%, rgb(${style.backgroundB}) 100%);
      color: rgb(${style.font});
    }

    .baritem
    {
      border-color: rgb(${style.border});
      color: rgb(${style.border});
    }

    .baritem:hover
    {
      color: rgb(${style.backgroundA});
      background-color: rgb(${style.border});
    }

    .baritem:active
    {
      background-color: rgb(${darkRgb});
      border-color: rgb(${darkRgb});
    }
  `;
  pColor = style.particle;
  pLight = style.light;
  document.getElementById('pimg').src = "img/"+style.img;
}

function regexDarkReplace(match, p1, p2, p3, offset, string)
{
  return parseInt(p1*0.5)+", "+parseInt(p2*0.5)+", "+parseInt(p3*0.5);
}
