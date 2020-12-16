// const fs = require("fs");
const images = require("images");
const TextToSVG = require("text-to-svg");
const svg2png = require("svg2png");
const textToSVG = TextToSVG.loadSync("./fonts/msyh.ttf");

function initImg(txt, cb) {
  txt = txt.trim();
  console.log(txt.split("\n"));
  let w = Math.max(...txt.split("\n").map((item) => item.length)) * 80;
  let h = txt.split("\n").length * 164;

  const txtPromise = txt.split("").map((item) => {
    const svg1 = textToSVG.getSVG(item, {
      x: 0,
      y: 0,
      fontSize: 20,
      anchor: "top",
    });
    return svg2png(Buffer.from(svg1), {});
  });
  Promise.all(txtPromise).then((txtImgs) => {
    // const w = 80 * txtImgs.length;
    // let h = 164;
    // console.log(w, h);
    const result = images(w, h);
    let xIndex = 0;
    let yIndex = 0;
    txtImgs.forEach((p, index) => {
      if (txt.split("")[index] == "\n") {
        yIndex += 1;
        xIndex = 0;
      } else {
        result.draw(
          images(
            `./images/QP4a5rvW_${Math.floor(Math.random() * 40)}.png`
          ).draw(images(p).rotate(35), 22, 8),
          xIndex * 80,
          yIndex * 164
        );
        xIndex += 1;
      }
    });
    const fileName = Math.random() + ".png";
    result.save(`./public/${fileName}`);
    cb(fileName);
  });
}

module.exports = {
  initImg,
};
