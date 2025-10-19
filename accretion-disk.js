const fs = require('fs');

const SVG_WIDTH = 500;
const SVG_HEIGHT = 500;
const STAR_COUNT = 300;
const FONT_SIZE = 10;

//pseudo random
function getStarChar(r) {
    if (r > 0.9) return '*'; 
    if (r > 0.6) return '+';
    if (r > 0.3) return '.';
    return ''; 
}

function generateSVG() {
    const time = Date.now();
    const scrollSpeed = 0.005; 

    let starTags = '';
    for (let i = 0; i < STAR_COUNT; i++) {
        const pseudoRandom = (Math.sin(i * 0.1) + 1) / 2;

        const initialX = (i * 137.5 + pseudoRandom * 50) % SVG_WIDTH;
        const initialY = (i * 97.3 * Math.sin(i * 0.5)) % SVG_HEIGHT;
        const char = getStarChar(pseudoRandom); 
        
        let currentX = (initialX - time * scrollSpeed);
        currentX = ((currentX % SVG_WIDTH) + SVG_WIDTH) % SVG_WIDTH;


        if (char) {
            starTags += `<text x="${currentX.toFixed(2)}" y="${initialY.toFixed(2)}">${char}</text>\n`;
        }
    }


    const svgContent = `
<svg viewBox="0 0 ${SVG_WIDTH} ${SVG_HEIGHT}" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style="background-color: #0a0a14; font-family: 'Courier New', Courier, monospace;">
    <style>
        text { fill: #aaa; font-size: ${FONT_SIZE}px; text-anchor: middle; dominant-baseline: middle; }
    </style>
    ${starTags}
</svg>`;


    fs.writeFileSync('starfield.svg', svgContent);
    console.log('stars are plotted and are being warped');
}

generateSVG();

