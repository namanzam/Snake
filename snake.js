function Snake() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.total = 0; // history of itself
    this.tail = [];
    this.rate = 10;

    this.death = function() {
        for(let i = 0; i < this.tail.length; i++) {
            let pos = this.tail[i];
            let d = dist(this.x, this.y, pos.x, pos.y);
            if(d < 1) {
                this.total = 0;
                this.tail = [];
                text("GAME OVER", 290, 290)
                this.xSpeed == 0;
                this.ySpeed == 0;
            }
        }
    }

    this.edgeCheck = function() {
        if(this.x >= 780 && this.xSpeed == 1) {
            this.x = 0;
        }else if(this.x <= 0 && this.xSpeed == -1) {
            this.x = 780;
        }else if(this.y >= 780 && this.ySpeed == 1) {
            this.y = 0;
        }else if(this.y <= 0 && this.ySpeed == -1) {
            this.y = 780;
        }
    }

    this.update = function() {
        // when food eaten then shift everything over
        if(this.total === this.tail.length) {
            for (let i = 0; i < this.total-1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }
        // add new position
        this.tail[this.total - 1] = createVector(this.x, this.y);
        this.x = this.x + this.xSpeed * scl;
        this.y = this.y + this.ySpeed * scl;

        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);
    }

    this.frameUpdate = function() {

    }

    this.show = function() {
        fill(255)
        for(let i = 0; i < this.total; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl)
        }
        rect(this.x, this.y, scl, scl)
    }

    this.dir = function(x, y) {
        this.xSpeed = x;
        this.ySpeed = y;
    }

    this.eat = function(pos) {
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.total++;
            if(this.rate < 25) {
                this.rate = this.rate * 1.1;
                frameRate(this.rate);
            }
            return true;
        }
        return false;
    }
}