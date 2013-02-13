class Player {
    name: string;
    x: number;
    y: number;
    fillStyle: string;
    strokeStyle: string;
    direction: string;
    leftImage: Image;
    rightImage: Image;
    upImage: Image;
    downImage: Image;
    move(xOffset: number, yOffset: number) {
        this.x += xOffset;
        this.y += yOffset;
        console.log(this.name + " has been moved to x: " + this.x + " y: " + this.y); 
        // Change direction
        if (xOffset == 1) {
            this.direction = "right";
        } else if (xOffset == -1) {
            this.direction = "left";
        } else if (yOffset == -1) {
            this.direction = "up";
        } else {
            this.direction = "down";
        }
    }
    draw(x: number, y: number, tilesize: number) {
        context.save();
        context.linewidth = 1;
        
        if (this.direction == "up") {
            context.drawImage(this.upImage, this.x * tilesize, this.y * tilesize, tilesize, tilesize);
        } else if (this.direction == "down") {
            context.drawImage(this.downImage, this.x * tilesize, this.y * tilesize, tilesize, tilesize);
        } else if (this.direction == "left") {
            context.drawImage(this.leftImage, this.x * tilesize, this.y * tilesize, tilesize, tilesize);
        } else if (this.direction == "right") {
            context.drawImage(this.rightImage, this.x * tilesize, this.y * tilesize, tilesize, tilesize);
        }

        context.strokeStyle = this.strokeStyle;
        context.strokeRect(this.x * tilesize, this.y * tilesize, tilesize, tilesize);
        context.restore();
    }
    loadImages() {
        this.leftImage = new Image();
        this.upImage = new Image();
        this.downImage = new Image();
        this.rightImage = new Image();
        this.leftImage.src = 'left.bmp';
        this.rightImage.src = 'right.bmp';
        this.downImage.src = 'down.bmp';
        this.upImage.src = 'up.bmp'
    }
    constructor(name: string, initialX: number, initialY: number, stroke: string, fill: string) {
        console.log(name + " has been created");
        this.loadImages();
        this.name = name;
        this.x = initialX;
        this.y = initialY;
        this.fillStyle = fill;
        this.strokeStyle = stroke;
        this.direction = "down";
        playerloaded = true;
    }
        
}

class Map {
    width: number;
    height: number;
    tilesize: number;
    fillStyle: string;
    strokeStyle: string;
    constructor(width: number, height: number, tilesize: number, stroke: string, fill: string) {
        this.width = width;
        this.height = height;
        this.tilesize = tilesize;
        this.fillStyle = fill;
        this.strokeStyle = stroke;
        maploaded = true;
    }
    draw(width: number, height: number, tilesize: number) {
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                context.save();
                context.linewidth = 1;
                context.fillStyle = this.fillStyle;
                context.fillRect(x * tilesize, y * tilesize, tilesize, tilesize);
                context.strokeStyle = this.strokeStyle;
                context.strokeRect(x * tilesize, y * tilesize, tilesize, tilesize);
                context.restore();
            }
        }
    }

}

function keyInput(e) {
    if (e.keyCode == '38'){
        // Up
        if (player.y > 0) {
            player.move(0, -1);
        }
    } else if (e.keyCode == '37') {
        // Left
        if (player.x > 0) {
            player.move(-1, 0);
        }
    } else if (e.keyCode == '39') {
        // Right
        if (player.x < (map.width - 1)) {
            player.move(1, 0);
        }
    } else if (e.keyCode == '40') {
        // Down
        if (player.y < (map.height - 1)) {
            player.move(0, 1);
        }
    }
}


// Global variables
var canvas: any;
var context: any;
var player: any;
var map: any;

function init() {

    console.log("Init");
    document.onkeydown = keyInput;
    // Load HTML 5 Canvas and get 2d context
    canvas = document.getElementById('game');
    context = canvas.getContext('2d');
    // Load Player
    player = new Player("Chris", 1, 1, "darkgrey", "green");
    // Load Map
    map = new Map(40, 20, 16, "darkgrey", "lightgrey");
}

function update() {
    
}

function draw() {
    console.log("Draw");
    if (maploaded) {
        map.draw(map.width, map.height, map.tilesize);
    }
    if (playerloaded) {
        player.draw(player.x, player.y, map.tilesize);
    }
}

var maploaded = false;
var playerloaded = false;
var running = false

function run() {
    var fps = 30;
    init();
    console.log("Now Running");
    running = true;
    while (running) {
        setInterval(update, 1000 / fps);
        setInterval(draw, 100);
        running = false;
    }

}
