// Define the canvas and its 2D context
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Set line style
ctx.strokeStyle = "#1c8a51";
ctx.lineWidth = 4;

// Define oscillation parameters for controlX
var controlX = 450; // Initial control point X position this is a test
var controlY = 900; // Initial control point Y position this is a test
var speedOfOsc = 6;
var oscillationDirectionX = 1; // 1 for increasing, -1 for decreasing this is a test
var oscillationDirectionY = 1; // 1 for increasing, -1 for decreasing this is a test
var isTransitioningX = false;
var isTransitioningY = false;

// Easing function
function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// Begin drawing vertical curve
function drawCurve() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    ctx.beginPath();
    ctx.moveTo(450, 100);
    ctx.quadraticCurveTo(controlX, controlY, 450, 850);
    ctx.stroke();
}

// Begin drawing horizontal curve
function drawCurveTwo() {
    
    ctx.beginPath();
    ctx.moveTo(50, 500);
    ctx.quadraticCurveTo(controlX, controlY, 850, 500);
    ctx.stroke();
}

// Begin drawing CurveThree curve
function drawCurveThree() {
    
    ctx.beginPath();
    ctx.moveTo(125, 175);
    ctx.quadraticCurveTo(controlX, controlY, 775, 825);
    ctx.stroke();
}

// Begin drawing CurveFour curve
function drawCurveFour() {
    
    ctx.beginPath();
    ctx.moveTo(125, 825);
    ctx.quadraticCurveTo(controlX, controlY, 775, 175);
    ctx.stroke();
}

// Begin drawing arcTwelveThree
function arcTwelveThree() {

    ctx.beginPath();
    ctx.moveTo(450, 100);
    ctx.quadraticCurveTo((controlX/2+200), controlY/2+200, 450, 850);
    ctx.stroke();
}

// Begin drawing arcThreeOne
function arcThreeOne() {
    
    ctx.beginPath();
    ctx.moveTo(50, 500);
    ctx.quadraticCurveTo(controlX/2+200, controlY/2+200, 850, 500);
    ctx.stroke();
}

// Begin drawing arcSixSix
function arcSixSix() {

    ctx.beginPath();
    ctx.moveTo(450, 100);
    ctx.quadraticCurveTo((controlX/4+300), controlY/4+300, 450, 850);
    ctx.stroke();
}

// Begin drawing arcTwoTwo
function arcTwoTwo() {
    
    ctx.beginPath();
    ctx.moveTo(50, 500);
    ctx.quadraticCurveTo(controlX/4+300, controlY/4+300, 850, 500);
    ctx.stroke();
}

// Begin drawing linerNiner
function linerNiner() {
    
    ctx.moveTo(425, 450);
    ctx.lineTo(controlX/2+225, controlY/2+250);
    ctx.stroke();
}

// Function to smoothly transition between two values with easing for controlX
function smoothTransitionX(startValue, endValue, duration, updateFunction, oscillationDirection) {
    isTransitioningX = true;
    let currentFrame = 0;
    const framesPerSecond = 60;
    const totalFrames = duration / 1000 * framesPerSecond;
    const transitionInterval = setInterval(function() {
        currentFrame++;
        const t = currentFrame / totalFrames;
        const easedT = easeInOut(t);
        currentValue = startValue + (endValue - startValue) * easedT;
        updateFunction(currentValue);
        if (currentFrame >= totalFrames) {
            clearInterval(transitionInterval);
            isTransitioningX = false;
            oscillationDirection *= -1; // Toggle oscillation direction
            alternateValuesX(oscillationDirection); // After reaching the target value, alternate back
        }
    }, 1000 / framesPerSecond);
}

// Function to smoothly transition between two values with easing for controlY
function smoothTransitionY(startValue, endValue, duration, updateFunction, oscillationDirection) {
    isTransitioningY = true;
    let currentFrame = 0;
    const framesPerSecond = 60;
    const totalFrames = duration / 1000 * framesPerSecond;
    const transitionInterval = setInterval(function() {
        currentFrame++;
        const t = currentFrame / totalFrames;
        const easedT = easeInOut(t);
        currentValue = startValue + (endValue - startValue) * easedT;
        updateFunction(currentValue);
        if (currentFrame >= totalFrames) {
            clearInterval(transitionInterval);
            isTransitioningY = false;
            oscillationDirection *= -1; // Toggle oscillation direction
            alternateValuesY(oscillationDirection); // After reaching the target value, alternate back
        }
    }, 1000 / framesPerSecond);
}

// Function to alternate between two values smoothly for controlX
function alternateValuesX(oscillationDirection) {
    if (isTransitioningX) {
        return; // Exit if transition is already in progress
    }
    // Determine the target value based on the current controlX value and oscillationDirection
    var targetValue = (oscillationDirection === 1) ? 50 : 900;
    smoothTransitionX(controlX, targetValue, 300 * speedOfOsc, function(currentValue) {
        controlX = currentValue; // Update controlX with the current value
        // Redraw the curve with the updated controlX value
        drawCurve();
        drawCurveTwo();
        arcTwelveThree();
        arcThreeOne();
        arcSixSix();
        arcTwoTwo();
        linerNiner();
    }, oscillationDirection);
}

// Function to alternate between two values smoothly for controlY
function alternateValuesY(oscillationDirection) {
    if (isTransitioningY) {
        return; // Exit if transition is already in progress
    }
    // Determine the target value based on the current controlY value and oscillationDirection
    var targetValue = (oscillationDirection === 1) ? 50 : 900;
    smoothTransitionY(controlY, targetValue, 320 * speedOfOsc, function(currentValue) {
        controlY = currentValue; // Update controlY with the current value
        // Redraw the curve with the updated controlY value
        drawCurve();
        drawCurveTwo();
        arcTwelveThree();
        arcThreeOne();
        arcSixSix();
        arcTwoTwo();
        linerNiner();
    }, oscillationDirection);
}

// Call the function to start alternating for both controlX and controlY
alternateValuesX(oscillationDirectionX);
alternateValuesY(oscillationDirectionY);
