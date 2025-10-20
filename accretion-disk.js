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
    const now = new Date();
    const hours = now.getUTCHours();
    const minutes = now.getUTCMinutes();
    const seconds = now.getUTCSeconds();
    const milliseconds = now.getUTCMilliseconds();

    const totalSecondsInDay = 24 * 60 * 60;
    const currentSeconds = (hours * 3600) + (minutes * 60) + seconds + (milliseconds / 1000);
    const progressOfDay = currentSeconds / totalSecondsInDay;
    
    const scrollCyclesPerDay = 4;
    const offset = progressOfDay * SVG_WIDTH * scrollCyclesPerDay;

    let starTags = '';
    for (let i = 0; i < STAR_COUNT; i++) {
        // psuedo random
        const pseudoRandom = (Math.sin(i * 0.1) + 1) / 2;

        const initialX = (i * 137.5 + pseudoRandom * 50) % SVG_WIDTH;
        
        let yCalc = (i * 97.3 * Math.sin(i * 0.5));
        const initialY = ((yCalc % SVG_HEIGHT) + SVG_HEIGHT) % SVG_HEIGHT;

        const char = getStarChar(pseudoRandom);
        
        let currentX = (initialX - offset);
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
}

generateSVG();

