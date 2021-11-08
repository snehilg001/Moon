// Particle Systems with Image Textures (Image Texture)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/pUhv2CA0omA
// https://thecodingtrain.com/learning/nature-of-code/4.4-image-textures.html

// Texture Maker: https://editor.p5js.org/codingtrain/sketches/NS4rB1Yx-
// Image Texture: https://editor.p5js.org/codingtrain/sketches/TTVoNt58T
// Shader (WEBGL): https://editor.p5js.org/codingtrain/sketches/EXZmcc4m_

// Modified by SNEHIL

let emitter1, emitter2;
let img;
let moonImg;
let random1;
let moonDia = 0;
let circles = [];
let hearts = [];
let xaxis;
let start = false;

function startShow(){
  let stb = document.querySelector("#startButton");
  stb.style.opacity = "0";
  let audio = document.querySelector("audio");
  audio.play();
  start = true;
}

function preload() {
  img = loadImage('texture32.png');
  moonImg = loadImage('moon.png');
}

function setup() {
  let cnv = createCanvas(0.95*windowWidth, 0.85*windowHeight);
  cnv.parent("canvasDiv");
  moonDia = width/4;
  emitter1 = new Emitter(width/2, height/2, moonDia);
  emitter2 = new Emitter(width/2, height/2, 0);
  
  xaxis = createVector(50, 0);
  angleMode(DEGREES);
  blendMode(ADD);
  imageMode(CENTER);
  
  //circle points array
  let j = 0;
  let r=moonDia/9;
  for(let theta=0; theta<360; theta+=24){
    let x = emitter1.position.x + r*cos(theta);
    let y = emitter1.position.y + r*sin(theta);
    circles[j] = {
      "x": x,
      "y": y
    };
    j++;
  }
  
  //heart forces array
  j = 0;
  let c = 360 / 50;
  for(let theta=0; theta<360; theta+=c) {
    let x = 16*pow(sin(theta), 3);
    let y = (13*cos(theta)) - (5*cos(2*theta)) - 
        (2*cos(3*theta)) - cos(4*theta);
    hearts[j] = {
      "x": x,
      "y": y
    };
    j++;
  }
  frameRate(12);
}

function draw() {
  if(start){
    clear();
    background(0);
    
    random1 = random(1);
    
    if(emitter1.particles.length < 19 && random1 < 0.4) {
      emitter1.emit(1);
    }
    emitter1.applyForce();

    if(random1 < 0.01) { 
      if(emitter2.isEmpty()){
        emitter2.placeHearts();
        emitter2.makeHearts();
      }
    }
    
    emitter1.show();
    emitter1.update();

    emitter2.show();
    emitter2.update();

    push();
    noTint();
    blendMode(BLEND);
    // noFill();
    // ellipse(width/2, height/2, moonDia, moonDia);
    image(moonImg, width/2, height/2, moonDia, moonDia);
    pop();
   
  }
}
