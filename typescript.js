var Player = (function () {
    function Player(name, initialX, initialY) {
        console.log(name + " has been created");
        this.name = name;
        this.x = initialX;
        this.y = initialY;
        playerloaded = true;
    }
    Player.prototype.move = function (xOffset, yOffset) {
        this.x += xOffset;
        this.y += yOffset;
        console.log(this.name + " has been moved to x: " + this.x + " y: " + this.y);
    };
    Player.prototype.draw = function (x, y, tilesize) {
        context.save();
        context.linewidth = 1;
        context.fillStyle = "lightblue";
        context.fillRect(player.x * tilesize, player.y * tilesize, tilesize, tilesize);
        context.strokeStyle = "darkgrey";
        context.strokeRect(player.x * tilesize, player.y * tilesize, tilesize, tilesize);
        context.restore();
    };
    return Player;
})();
var Map = (function () {
    function Map(width, height, tilesize) {
        this.width = width;
        this.height = height;
        this.tilesize = tilesize;
        maploaded = true;
    }
    Map.prototype.draw = function (width, height, tilesize) {
        for(var y = 0; y < height; y++) {
            for(var x = 0; x < width; x++) {
                context.save();
                context.linewidth = 1;
                context.fillStyle = "lightgrey";
                context.fillRect(x * tilesize, y * tilesize, tilesize, tilesize);
                context.strokeStyle = "darkgrey";
                context.strokeRect(x * tilesize, y * tilesize, tilesize, tilesize);
                context.restore();
            }
        }
    };
    return Map;
})();
function keyInput(e) {
    if(e.keyCode == '38') {
        player.move(0, -1);
    } else if(e.keyCode == '37') {
        player.move(-1, 0);
    } else if(e.keyCode == '39') {
        player.move(1, 0);
    } else if(e.keyCode == '40') {
        player.move(0, 1);
    }
}
var canvas;
var context;
var player;
var map;
function init() {
    console.log("Init");
    document.onkeydown = keyInput;
    canvas = document.getElementById('game');
    context = canvas.getContext('2d');
    player = new Player("Chris", 1, 1);
    map = new Map(40, 20, 16);
}
function update() {
    console.log("Update");
}
function draw() {
    console.log("Draw");
    if(maploaded) {
        map.draw(map.width, map.height, map.tilesize);
    }
    if(playerloaded) {
        player.draw(player.x, player.y, map.tilesize);
    }
}
var maploaded = false;
var playerloaded = false;
var running = false;
function run() {
    var fps = 30;
    init();
    console.log("Now Running");
    running = true;
    while(running) {
        setInterval(update, 1000 / fps);
        setInterval(draw, 100);
        running = false;
    }
}
