// SaturationNoiseMaskExperiment.js
//
// Annulus with noise mask 
//
// 20190529 - SSP
// Based on Jim Kuchenbecer's VioletExperiment.js

var backgroundIntensity;
var stimulusIntensity;
var lastStimulusIntensity;

var noisePixelSize;
var noiseGain;

var stimulusRadius; // radius (horizontal plane)
var lastStimulusRadius;

var rad0;
var rad1;
var rad2;
var rad3;
var rad4;
var rad5;
var fixationInnerRadius;
var fixationOuterRadius;

var radiusSlider;
var gapSlider;

var greenSlider;
var setGreenButton;
var greenInput;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noisePixelSize = 2;

    noiseGain = 0.8;

    stimulusRadius = 100; // radius (horizontal plane)

    fixationInnerRadius = 2;
    fixationOuterRadius = 1;

    rad0 = 0.500 * stimulusRadius;
    rad1 = 0.600 * stimulusRadius;
    rad2 = 0.675 * stimulusRadius;
    rad3 = 0.820 * stimulusRadius;
    rad4 = 0.900 * stimulusRadius;
    rad5 = 1.000 * stimulusRadius;

    stimulusIntensity = 50;
    backgroundIntensity = 50;

    colorMode(RGB, 100, 100, 100, 100);
    background(0, 0, backgroundIntensity);
    noStroke();
    ellipseMode(RADIUS);
    frameRate(30);

    radiusSlider = createSlider(0, 200, 100);
    radiusSlider.position(20, 20);
    gapSlider = createSlider(0, 100, 100);
    gapSlider.position(20, 50);
    greenSlider = createSlider(0, 100, 50);
    greenSlider.position(20, 80)

    setGreenButton = createButton('set grn val');
    setGreenButton.position(200, 50);
    setGreenButton.size(84, 25);
    setGreenButton.mousePressed(setGreenButtonChange);

    greenInput = createInput();
    greenInput.position(200, 80);
    greenInput.size(80, 18);
    greenInput.value(50);
}

function setGreenButtonChange() {
    greenSlider.value(greenInput.value());
}

function draw() {
    lastStimulusRadius = stimulusRadius;
    stimulusRadius = radiusSlider.value();
    if (lastStimulusRadius != stimulusRadius) {
        clear();
        colorMode(RGB, 100, 100, 100, 100);
        background(0, 0, backgroundIntensity);
        noStroke();
        ellipseMode(RADIUS);
    }
    
    // Calculate the intermediate radii
    rad0 = 0.500 * stimulusRadius;
    rad1 = 0.600 * stimulusRadius;
    rad2 = 0.675 * stimulusRadius;
    rad3 = 0.820 * stimulusRadius;
    rad4 = 0.900 * stimulusRadius;
    rad5 = 1.000 * stimulusRadius;
    boundary = stimulusRadius * gapSlider.value() / 1000;

    lastStimulusIntensity = stimulusIntensity;
    stimulusIntensity = greenSlider.value();
    if (lastStimulusIntensity != stimulusIntensity) {
        greenInput.value(stimulusIntensity);
    }

    drawCenterCircles()
}


function drawCenterCircles() {
    // this is an alternative to the Gaussian to work with the distractors
    var centerH = windowHeight / 2;
    var centerV = windowWidth / 2;
    var randB = noiseGain * (100 * random() - 50);
    var dist_qr;

    // Draw the fixation point
    fill(0, 0, 100);
    ellipse(centerV, centerH, fixationInnerRadius);
    fill(0, 0, 0);
    ellipse(centerV, centerH, fixationOuterRadius);

    for (var q = centerV - stimulusRadius; q < centerV + stimulusRadius; q += noisePixelSize) {
        for (var r = centerH - stimulusRadius; r < centerH + stimulusRadius; r += noisePixelSize) {
            // Now I need to have a circle that confines this
            dist_qr = Math.pow(Math.pow(q - centerV, 2) + Math.pow(r - centerH, 2), 0.5);

            if (dist_qr > rad0 && dist_qr <= rad1) {
                fill(0, 0, backgroundIntensity + randB);
                rect(q - 1, r - 1, noisePixelSize, noisePixelSize);
                randB = noiseGain * (100 * random() - 50);
            }

            else if (dist_qr > rad1 && dist_qr <= rad2 && q < centerV - boundary) {
                fill(0, stimulusIntensity, backgroundIntensity + randB);
                rect(q - 1, r - 1, noisePixelSize, noisePixelSize);
                randB = noiseGain * (100 * random() - 50);
            }

            else if (dist_qr > rad1 && dist_qr <= rad2 && q >= centerV + boundary) {
                fill(0, stimulusIntensity, backgroundIntensity + randB);
                rect(q - 1, r - 1, noisePixelSize, noisePixelSize);
                randB = noiseGain * (100 * random() - 50);
            }

            // this is the newly added white noise to suppress "filling in"
            else if (dist_qr >= rad1 && dist_qr < rad2 && q >= centerV - boundary && q < centerV + boundary) {
                fill(0, 0, backgroundIntensity + randB);
                rect(q - 1, r - 1, noisePixelSize, noisePixelSize);
                randB = noiseGain * (100 * random() - 50);
            }

            // full colored circles no background noise
            else if (dist_qr >= rad2 && dist_qr < rad3 && q < centerV - boundary) {
                fill(0, stimulusIntensity, 0);
                rect(q - 1, r - 1, noisePixelSize, noisePixelSize);
                randB = noiseGain * (100 * random() - 50);
            }

            // full colored circles no background noise
            else if (dist_qr >= rad2 && dist_qr < rad3 && q >= centerV + boundary) {
                fill(0, stimulusIntensity, 0);
                rect(q - 1, r - 1, noisePixelSize, noisePixelSize);
                randB = noiseGain * (100 * random() - 50);
            }

            // this is the newly added white noise to suppress "filling in"
            else if (dist_qr >= rad2 && dist_qr < rad3 && q >= centerV - boundary && q < centerV + boundary) {
                fill(0, 0, backgroundIntensity + randB);
                rect(q - 1, r - 1, noisePixelSize, noisePixelSize);
                randB = noiseGain * (100 * random() - 50);
            }

            else if (dist_qr >= rad3 && dist_qr < rad4 && q < centerV - boundary) {
                fill(0, stimulusIntensity, backgroundIntensity + randB);
                rect(q - 1, r - 1, noisePixelSize, noisePixelSize);
                randB = noiseGain * (100 * random() - 50);
            }

            else if (dist_qr >= rad3 && dist_qr < rad4 && q >= centerV + boundary) {
                fill(0, stimulusIntensity, backgroundIntensity + randB);
                rect(q - 1, r - 1, noisePixelSize, noisePixelSize);
                randB = noiseGain * (100 * random() - 50);
            }

            // this is the newly added white noise to suppress "filling in"
            else if (dist_qr >= rad3 && dist_qr < rad4 && q >= centerV - boundary && q < centerV + boundary) {
                fill(0, 0, backgroundIntensity + randB);
                rect(q - 1, r - 1, noisePixelSize, noisePixelSize);
                randB = noiseGain * (100 * random() - 50);
            }

            else if (dist_qr >= rad4 && dist_qr < rad5) {
                fill(0, 0, backgroundIntensity + randB);
                rect(q - 1, r - 1, noisePixelSize, noisePixelSize);
                randB = noiseGain * (100 * random() - 50);
            }
        }
    }
}


function windowResized() {
    if (fullscreen()) {
        resizeCanvas(displayWidth, displayHeight);
    } else {
        resizeCanvas(windowWidth, windowHeight);
    }
    cursor();
    showing = true;
    background(0, 0, backgroundIntensity, 100);
}