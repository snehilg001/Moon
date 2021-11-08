// Particle Systems with Image Textures (Image Texture)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/pUhv2CA0omA
// https://thecodingtrain.com/learning/nature-of-code/4.4-image-textures.html

// Texture Maker: https://editor.p5js.org/codingtrain/sketches/NS4rB1Yx-
// Image Texture: https://editor.p5js.org/codingtrain/sketches/TTVoNt58T
// Shader (WEBGL): https://editor.p5js.org/codingtrain/sketches/EXZmcc4m_

// Modified by SNEHIL

class Emitter {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.particles = [];
  }

  emit(num) {
    for(let i=0; i<num; i++) {
      let j = int(random(circles.length-1));
      let x = circles[j]["x"];
      let y = circles[j]["y"];
      let force = createVector(x, y);
      force.sub(this.position);
      force = force.normalize();
      force.mult(-0.08);
      this.particles.push(
        new Particle(x, y, false, force)
      );
    }
  }

  applyForce() {
    for(let particle of this.particles) {
      particle.applyForce(particle.force);
    }
  }

  applyForce2(f) {
    for(let particle of this.particles) {
      particle.applyForce(f);
    }
  }
  
  placeHearts() {
    for(let i=0; i<50; i++) {
      this.particles.push(
        new Particle(this.position.x, this.position.y, true)
      );
    }
  }

  makeHearts(){
    let j = 0;
    for (let particle of this.particles) {
      particle.applyForce(createVector(hearts[j]["x"], -hearts[j]["y"]));
      j++;
    }
  }
  
  isEmpty(){
    return this.particles.length == 0;
  }

  update() {
    for (let particle of this.particles) {
      particle.update();
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (this.particles[i].finished()) {
        this.particles.splice(i, 1);
      }
    }
  }

  show() {
    for (let particle of this.particles) {
      particle.show();
    }
  }
}
