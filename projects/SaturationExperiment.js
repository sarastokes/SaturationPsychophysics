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

// Debugging
var debug1;

function setup() {
    backgroundIntensity = 128;
    circleIntensity = 128;
    circleDiameter = 50;
    firstFrame = true;
    fixationEnabled = true;
    debug1 = true;
    
    createCanvas(windowWidth, windowHeight);
    viewfs = document.getElementById("enter");
    exitfs = document.getElementById("exit");

    colorMode(RGB, 255, 255, 255, 100);
    background(0, 0, backgroundIntensity);
    noStroke();
    ellipseMode(RADIUS);
    frameRate(20);

    bkgdSlider = createSlider(0, backgroundIntensity, 255);
    bkgdSlider.position(20, 20);
    circleSlider = createSlider(0, circleIntensity, 255);
    circleSlider.position(20, 50);

    fill(100, 100, 100);
    fixCheckbox = createCheckbox('show fixation', true);
    fixCheckbox.position(20, 90);
    fixCheckbox.changed(myCheckedEvent);
}

function draw() {    
    if (firstFrame == true)
    {
        drawScene();
        firstFrame = false;
        drawFixation();
    } else {
        lastBackgroundIntensity = backgroundIntensity;
        backgroundIntensity = bkgdSlider.value();
        lastCircleIntensity = circleIntensity;
        circleIntensity = circleSlider.value();
        if (lastBackgroundIntensity != backgroundIntensity) {
            drawScene();
        }

        if (lastCircleIntensity != circleIntensity) {
            drawScene();
        }
    }
    drawFixation();
}

function drawFixation() {
    if (fixationEnabled == true) {
        fill(100, 100, 100);
        ellipse(windowWidth / 2, windowHeight / 2, 2, 2);
        fill(0, 0, 0);
        ellipse(windowWidth / 2, windowHeight / 2, 1, 1);
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

    if (debug1) {
        textSize(14);
        fill(255, 255, 255);
        text("Circle", 10, 130);
        text(circleIntensity, 150, 130);
        text("Background", 10, 150);
        text(backgroundIntensity, 150, 150);
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
    waitress = millis() + 2000;
    if (fullscreen()) {
        resizeCanvas(displayWidth, displayHeight);
        viewfs.style.display = "none";
        exitfs.style.display = "block";
    } else {
        resizeCanvas(windowWidth, windowHeight);
        exitfs.style.display = "none";
        viewfs.style.display = "block";
    }
    cursor();
    showing = true;
    background(0, 0, backgroundIntensity);
}