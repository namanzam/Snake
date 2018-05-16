var s;
var scl = 20;
var food;
var dead = false;

function setup() {
    createCanvas(800, 800);
    s = new Snake();
    frameRate(10);
    pickLocation();
}

function pickLocation() {
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}

function draw() {
    background(0)
    if(s.death()) {
        this.dead = true;
    }
    s.edgeCheck();
    s.update();
    s.show();
    if(s.eat(food)) {
        pickLocation();
    }

    fill(255,0, 90);
    rect(food.x, food.y, scl, scl)
}

function keyPressed() {
    if(this.dead) {
        return;
    }
    let anyDir = false;
    if(s.total > 0) {
        anyDir = true;
    }
    if(keyCode === UP_ARROW) {
        if(s.xSpeed == 0 && s.ySpeed == 1 && anyDir) {
            return;
        }
        s.dir(0, -1);
    }else if(keyCode === DOWN_ARROW) {
        if(s.xSpeed == 0 && s.ySpeed == -1 && anyDir) {
            return; 
        }
        s.dir(0, 1);  
    }else if(keyCode === RIGHT_ARROW) {
        if(s.xSpeed == -1 && s.ySpeed == 0 && anyDir) {
            return; 
        }
        s.dir(1, 0);   
    }else if (keyCode === LEFT_ARROW) {
        if(s.xSpeed == 1 && s.ySpeed == 0 && anyDir) {
            return;    
        }
        s.dir(-1, 0);
    }
}
 