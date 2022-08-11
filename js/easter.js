var currentImg = -1;

var styleData = [
  {img: "9a9bc94992ea13a100f564698ae38f84.gif", backgroundA: "0, 0, 16", backgroundB: "4, 16, 32", border: "255, 255, 192", particle: "200, 200, 255", light: "255, 255, 255", font: "255, 255, 255"},
  {img: "9cbb767099aaaa8e38d8581d90511988.gif", backgroundA: "11, 4, 2", backgroundB: "16, 5, 2", border: "170, 39, 30", particle: "251, 213, 90", light: "234, 182, 70", font: "255, 255, 255"},
  {img: "b1a8e5915ce7dec05ce022b2b619df82.gif", backgroundA: "0, 0, 0", backgroundB: "17, 0, 17", border: "153, 50, 68", particle: "153, 50, 68", light: "153, 50, 68", font: "255, 255, 255"},
  {img: "tumblr_nl2z6atdZh1qlp4x9o1_r1_500.webp", backgroundA: "0, 0, 6", backgroundB: "1, 0, 9", border: "255, 255, 124", particle: "187, 200, 205", light: "187, 200, 205", font: "255, 255, 255"},
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

    #pimg:hover
    {
      box-shadow: 0 0 16px rgba(${style.border}, 0.5);
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
