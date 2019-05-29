// BackgroundCalibration.js
// 
// Simple full-screen version of SaturationExperiment background
// for calibrating the light source.
//
// 20190528 - SSP

var backgroundIntensity;

function setup() {
    backgroundIntensity = 255;
    
    createCanvas(windowWidth, windowHeight);

    colorMode(RGB, 255, 255, 255, 100);
    background(0, 0, backgroundIntensity);
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
    background(0, 0, backgroundIntensity);
}