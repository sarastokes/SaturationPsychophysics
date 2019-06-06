var backgroundIntensity;
var circleIntensity;
var circleDiameter;

var lastBackgroundIntensity;
var lastCircleIntensity;
var firstFrame

// User interface
var bkgdSlider;
var circleSlider;
var fixationCheckbox;
var fixationEnabled;

// View intensity settings
var verbose;

function setup() {
    backgroundIntensity = 255;
    circleIntensity = 255;

    circleDiameter = 80;
    
    firstFrame = true;
    fixationEnabled = true;
    verbose = true;
    
    createCanvas(windowWidth, windowHeight);

    colorMode(RGB, 255, 255, 255, 100);
    background(0, 0, backgroundIntensity);
    noStroke();
    ellipseMode(RADIUS);
    frameRate(20);

    // Slider to change the background intensity
    bkgdSlider = createSlider(0, 255, backgroundIntensity, 5);
    bkgdSlider.position(20, 20);

    // Slider to change the circle intensity
    circleSlider = createSlider(0, 255, circleIntensity, 5);
    circleSlider.position(20, 50);

    // Checkbox to toggle the fixation point
    fill(255, 255, 255);
    fixCheckbox = createCheckbox(' ', fixationEnabled);
    fixCheckbox.position(20, 90);
    fixCheckbox.changed(myCheckedEvent);
}

function draw() {    
    if (firstFrame == true) {
        // Always draw the scene on the first frame
        drawScene();
        firstFrame = false;
    } else {
        // Update intensity to match slider value
        lastBackgroundIntensity = backgroundIntensity;
        backgroundIntensity = bkgdSlider.value();
        lastCircleIntensity = circleIntensity;
        circleIntensity = circleSlider.value();

        // Redraw the scene if intensity values changed
        if (lastBackgroundIntensity != backgroundIntensity) {
            drawScene();
        } else if (lastCircleIntensity != circleIntensity) {
            drawScene();
        }
    }
}

function drawScene() {
    clear();
    colorMode(RGB, 255, 255, 255, 100);
    background(0, 0, backgroundIntensity);
    noStroke();
    ellipseMode(RADIUS);

    fill(0, circleIntensity, 0);
    ellipse(windowWidth/2, windowHeight/2, circleDiameter, circleDiameter);

    addFixation();

    if (verbose) {
        textSize(14);
        fill(255, 255, 255);
        text("Circle", 10, 130);
        text(circleIntensity, 150, 130);
        text("Background", 10, 150);
        text(backgroundIntensity, 150, 150);
        text("Show Fixation", 50, 105);
    }
}

function addFixation() {
    if (fixationEnabled == true) {
        fill(100, 100, 100);
        ellipse(windowWidth / 2, windowHeight / 2, 2, 2);
        fill(0, 0, 0);
        ellipse(windowWidth / 2, windowHeight / 2, 1, 1);
    }
}

function myCheckedEvent() {
    if (this.checked()) {
        fixationEnabled = true;
        drawScene();
    } else {
        fixationEnabled = false;
        drawScene();
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
    drawScene();
}