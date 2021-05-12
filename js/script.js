const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//Utilities
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateColor() {
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);

  return `rgb(${red}, ${green}, ${blue})`;
}

function distance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

// function for creating ball
function circle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.move = {
    x: Math.random() * 2.5 - 1.5,
    y: Math.random() * 2.5 - 1.5
  };

  this.draw = () =>{
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  };
  
  this.checkCollision = (circles) =>{
    for(let i = 0; i < circles.length; i++){
      if(this === circles[i]) continue;
      if(distance(this.x, this.y, circles[i].x, circles[i].y) <= this.radius*2){
        this.move.x = -this.move.x;
        this.move.y = -this.move.y;
      }
    }
    if(this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) this.move.x = -this.move.x;
    if(this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) this.move.y = -this.move.y;

    this.x += this.move.x;
    this.y += this.move.y;
  };
}

// Implementation
let circles;
function init() {
  circles = [];

  for (let i = 0; i < 85; i++) {
    let radius = 10;
    let x = randomIntFromRange(radius, canvas.width-radius);
    let y = randomIntFromRange(radius, canvas.height-radius);
    let color = generateColor();

    if(i!=0){
      for(let j = 0; j < circles.length; j++){
        if(distance(x, y, circles[j].x, circles[j].y) <= radius*2){
          x = randomIntFromRange(radius, canvas.width-radius);
          y = randomIntFromRange(radius, canvas.height-radius);
          j = -1; //so as to restart the loop
        }
      }
    }
    circles.push(new circle(x, y, radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  circles.forEach(circle => {
   circle.draw(circles);
   circle.checkCollision(circles);
  });
}

init();
requestAnimationFrame(animate);