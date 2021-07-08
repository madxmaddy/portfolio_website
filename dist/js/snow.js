// grab reference to canvas element
var canvas = document.getElementById("canvas");
// returns drawing context on the canvas
var ctx = canvas.getContext("2d");
var particlesOnScreen = 245;
var particlesArray = [];
var w, h;
w = canvas.width = window.innerWidth;
h = canvas.height = window.innerHeight;

function random(min, max) {
    return min + Math.random() * (max - min + 1);
}

// when the user changes the width and height of the window, the canvas adjusts
function clientResize(ev) {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
// Adding event listener of resize to call the clientResize function
window.addEventListener("resize", clientResize);

function createSnowFlakes() {
    for (var i = 0; i < particlesOnScreen; i++) {
        particlesArray.push({
            x: Math.random() * w,
            y: Math.random() * h,
            opacity: Math.random(),
            speedX: random(-11, 11),
            speedY: random(7, 15),
            radius: random(.5, 4.2),

        })
    }
}


function drawSnowFlakes() {
    for (var i = 0; i < particlesArray.length; i++) {
        /* Canvas 2D API: method that creates a radial gradient using the size and coordinates of two circles.
        CanvasGradient ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
        x-start, y-start, r-start(nonneg, finite), x-end, y-end, r-end (nonneg, finite) of circle */
        var gradient = ctx.createRadialGradient(
            particlesArray[i].x,
            particlesArray[i].y,
            0,
            particlesArray[i].x,
            particlesArray[i].y,
            particlesArray[i].radius
        );
        gradient.addColorStop(0, "rgba(255,255,255," + particlesArray[i].opacity + ")"); //white
        gradient.addColorStop(0, "rgba(210, 236, 242," + particlesArray[i].opacity + ")"); //bluish
        gradient.addColorStop(0, "rgba(237, 247, 249," + particlesArray[i].opacity + ")"); //white

        // starts a new path by emptying the list of sub-paths
        ctx.beginPath();
        // adds a circular arc to the current sub-path
        //ctx.arc(x,y,radius,startAngle,endAngle[,counterclockwise]);
        // defaults to clockwise 
        ctx.arc(
            particlesArray[i].x, //x
            particlesArray[i].y, //y 
            particlesArray[i].radius, //radius
            0, //startAngle
            Math.PI * 2, //Math.PI property represents the ratio of circumference of a circle to its diameter
            false //clockwise or counterclockwise
        );

        ctx.fillStyle = gradient;
        ctx.fill();
    }
}

function moveSnowFlakes() {
    for (var i = 0; i < particlesArray.length; i++) {
        particlesArray[i].x += particlesArray[i].speedX;
        particlesArray[i].y += particlesArray[i].speedY;

        if (particlesArray[i].y > h) {
            particlesArray[i].x = Math.random() * w * 1.5;
            particlesArray[i].y = -50; //Puts it off screen to fall down
        }
    }

}

function updateSnowFall() {
    ctx.clearRect(0, 0, w, h);
    drawSnowFlakes();
    moveSnowFlakes();
}

setInterval(updateSnowFall, 50);
createSnowFlakes();