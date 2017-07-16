(function(){
var canvas = document.getElementById('canvas');
var circles = [];
var count = 100;

window.onresize = resize;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function init() {
    for (i = 0; i < count; i++) {
        circles.push({
            x: rand(0, canvas.width),
            y: rand(0, canvas.height),
            r: rand(5, 70),
            color: randColor(),
            blur: rand(0, 15)
        });
    }

    requestAnimationFrame(frame);
}

function frame() {
    var ctx = document.getElementById('canvas').getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 0.5;

    for (i = 0; i < count; i++) {
        var c = circles[i];

        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r + Math.sin(c.x / 20) * 5, 0, 2 * Math.PI);
        ctx.fillStyle = c.color;
        ctx.shadowColor = c.color;
        ctx.shadowBlur = c.blur;
        //flickering animation:
        //ctx.shadowBlur = rand(5, 50);
        ctx.fill();

    }

    move();
    requestAnimationFrame(frame);
}

function move() {
    for (i = 0; i < count; i++) {
        var c = circles[i];
        c.x++;
        c.y++;
        if ((c.x - c.r) > canvas.width) {
            c.x = 0 - c.r;
        }
        if ((c.y - c.r) > canvas.height) {
            c.y = 0 - c.r;
        }
    }
}

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function randColor() {
    var letters = '0123456789ABCDEF';
    var color = '#ffee';
    for (var i = 0; i < 2; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

resize();
init();

})();