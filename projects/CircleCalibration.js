// CircleCalibration.js
// 
// Simple full-screen version of SaturationExperiment circle stimulus
// for calibrating the light source.
//
// 20190528 - SSP

var circleIntensity;

function setup() {
    circleIntensity = 255;
    
    createCanvas(windowWidth, windowHeight);

    colorMode(RGB, 255, 255, 255, 100);
    background(0, circleIntensity, 0);
    noStroke();
    ellipseMode(RADIUS);
    frameRate(20);
}

function windowResized() {
    if (fullscreen()) {
        resizeCanvas(displayWidth, displayHeight);
    } else {
        resizeCanvas(windowWidth, windowHeight);
    }
    cursor();
    showing = true;
    background(0, circleIntensity, 0);
}