const fs = require('fs');

const SVG_WIDTH = 500;
const SVG_HEIGHT = 500;
const STAR_COUNT = 300;
const FONT_SIZE = 10;


function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

function getStarChar(r) {
    if (r > 0.9) return '*';
    if (r > 0.6) return '+';
    if (r > 0.3) return '.';
    return '';
}

function generateSVG() {
    // psuedo random
    const seed = Date.now();
    const rand = mulberry32(seed);

    let starTags = '';
    for (let i = 0; i < STAR_COUNT; i++) {
        const x = rand() * SVG_WIDTH;
        const y = rand() * SVG_HEIGHT;
        const char = getStarChar(rand());
        
        if (char) {
            starTags += `<text x="${x.toFixed(2)}" y="${y.toFixed(2)}">${char}</text>\n`;
        }
    }

    const svgContent = `
<svg viewBox="0 0 ${SVG_WIDTH} ${SVG_HEIGHT}" xmlns="http://www.w.org/2000/svg" width="100%" height="100%" style="background-color: #0a0a14; font-family: 'Courier New', Courier, monospace;">
    <style>
        text { fill: #aaa; font-size: ${FONT_SIZE}px; text-anchor: middle; dominant-baseline: middle; }
    </style>
    ${starTags}
</svg>`;

    fs.writeFileSync('starfield.svg', svgContent);
}

generateSVG();

