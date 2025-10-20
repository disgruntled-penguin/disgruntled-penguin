const fs = require('fs');

const SVG_WIDTH = 500;
const SVG_HEIGHT = 500;
const STAR_COUNT = 300;
const FONT_SIZE = 10;

function getStarChar(r) {
    if (r > 0.9) return '*';
    if (r > 0.6) return '+';
    if (r > 0.3) return '.';
    return '';
}

function generateSVG() {
    const seed = Date.now();
    const timestamp = new Date().toUTCString();

    let starTags = '';
    for (let i = 0; i < STAR_COUNT; i++) {
        // psuedo random
        const pseudoRandomSeed = seed + i;
        const pseudoRandomX = (Math.sin(pseudoRandomSeed * 0.0001) + 1) / 2;
        const pseudoRandomY = (Math.cos(pseudoRandomSeed * 0.0001) + 1) / 2;
        const pseudoRandomChar = (Math.sin(pseudoRandomSeed * 0.001) + 1) / 2;

        const x = pseudoRandomX * SVG_WIDTH;
        const y = pseudoRandomY * SVG_HEIGHT;
        const char = getStarChar(pseudoRandomChar);
        
        if (char) {
            starTags += `<text x="${x.toFixed(2)}" y="${y.toFixed(2)}">${char}</text>\n`;
        }
    }


    const svgContent = `
<svg viewBox="0 0 ${SVG_WIDTH} ${SVG_HEIGHT}" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style="background-color: #0a0a14; font-family: 'Courier New', Courier, monospace;">
    <style>
        text { fill: #aaa; font-size: ${FONT_SIZE}px; text-anchor: middle; dominant-baseline: middle; }
    </style>
    <text x="10" y="20" text-anchor="start" font-size="12" fill="#333">${timestamp}</text>
    ${starTags}
</svg>`;


    fs.writeFileSync('starfield.svg', svgContent);
}

generateSVG();

