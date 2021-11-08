// Particle Systems with Image Textures (Image Texture)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/pUhv2CA0omA
// https://thecodingtrain.com/learning/nature-of-code/4.4-image-textures.html

// Texture Maker: https://editor.p5js.org/codingtrain/sketches/NS4rB1Yx-
// Image Texture: https://editor.p5js.org/codingtrain/sketches/TTVoNt58T
// Shader (WEBGL): https://editor.p5js.org/codingtrain/sketches/EXZmcc4m_

// Modified by SNEHIL

class Particle {
  constructor(x, y, h, f) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 60;
    this.rd = 0.6;
    this.lifetime = 255;
    this.force = f;
    
    this.red = random(255);
    this.green = random(255);
    this.blue = random(255);

    if(!h) {
      let v0 = this.force.copy();
      v0.mult(-1);
      let ang = xaxis.angleBetween(v0);
      ang = ang + random(-80, 80);
      ang = ang * (Math.PI / 180);
      this.vel = p5.Vector.fromAngle(ang);
      this.vel.mult(moonDia/50);

      this.r = moonDia*1.2;
      this.rd = this.r / 150;
    }

  }

  finished() {
    return this.lifetime < 0;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    this.lifetime -= 4;
    this.r -= this.rd;
  }

  show() {
    tint(this.red, this.green, this.blue, this.lifetime);
    image(img, this.pos.x, this.pos.y, this.r, this.r);
    // noStroke();
    // fill(80, 100, 200, this.lifetime);
    // ellipse(this.pos.x, this.pos.y, this.r);
  }
}
