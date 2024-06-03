/** 
generates a random number between min and max.
*/
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function calculateDist(goalX, goalY, startX, startY) {
  return Math.sqrt((goalY - startY)** 2 + (goalX - startX)** 2)
}

class Kreis{
  constructor(x, y, radius, colourR = 255, colourG = 255, colourB = 255) {
    this.x = x
    this.y = y
    this.radius = radius
    this.colourR = colourR
    this.colourG = colourG
    this.colourB = colourB
  }
  show() {
    fill(this.colourR, this.colourG, this.colourB)
    circle(this.x, this.y, this.radius*2)
  }
}

class Movable extends Kreis {
    handleFood(x, y) {
    if (calculateDist(this.x, this.y, x, y) < this.radius) {
      this.radius = this.radius + 1
      return true 
    } else {
      return false
    }
  }
}

class Player extends Movable {
  moveRight() {
    this.x += 1;
  }
  
  moveLeft() {
    this.x -= 1;
  }
  
  moveUp() {
    this.y -= 1;
  }
  
  moveDown() {
    this.y += 1;
  }

}

class Nahrung extends Kreis {
  relocateNahrung(playerX, playerY, botX, botY) {
    this.x = randomNumber(0, 400)
    this.y = randomNumber(0, 400)
    while(true) {
      if(calculateDist(playerX, playerY, this.x, this.y) < player.radius) {
        this.x = randomNumber(0, 400)
        this.y = randomNumber(0, 400)
      } else {
        break
      }
    }
    
     // to do check if relocation is inside of player
  }
}

class Bot extends Movable {
  nextStep(player, nahrungen) {
    let bestNahrungX
    let bestNahrungY
    let shortestDistance = Infinity
    //find shortest distance between bot and nahrung
    for (const nahrung of nahrungen) {
      let currentDistance = calculateDist(nahrung.x, nahrung.y, this.x, this.y)
      if (shortestDistance > currentDistance) {
        shortestDistance = currentDistance
        bestNahrungX = nahrung.x
        bestNahrungY = nahrung.y
      }
    }
    
    //next step calculate direction
    if(this.x < bestNahrungX) {
      this.x = this.x + 1
    } else if(this.x > bestNahrungX){
      this.x = this.x - 1
    }
    if(this.y < bestNahrungY) {
      this.y = this.y + 1
    } else if(this.y > bestNahrungY){
      this.y = this.y - 1
    }
  }
}
// enemy bot
let originX = 0
let numNahrungen = 10
let player = new Player(200, 200, 20, 50, 50, 200) 
let bot = new Bot(randomNumber(0, 400), randomNumber(0, 400), 20, 200, 50, 50)
let nahrungen = []
function setup() {
  createCanvas(400, 400)
  for (let i = 0; i < numNahrungen; i++) {
    nahrungen[i] = new Nahrung(randomNumber(0, 400), randomNumber(0, 400), 10, randomNumber(0, 255), randomNumber(0, 255), randomNumber(0, 255))
  }
}

function draw() {
  background(220)
  // to do make dynamic camera
  // to do speed
  // to do teilen
  // multiplayer??
  player.show()
  bot.show()
  if (keyIsDown(68) === true) { //d
    player.moveRight()
  }
  
  if (keyIsDown(65) === true) { //a
    player.moveLeft()
  }

  if (keyIsDown(87) === true) { //w
    player.moveUp()
  }

  if (keyIsDown(83) === true) { //s
    player.moveDown()
  }
  
  
  bot.nextStep(player, nahrungen)

  for (const nahrung of nahrungen) {
    nahrung.show()
    if (player.handleFood(nahrung.x, nahrung.y) || bot.handleFood(nahrung.x, nahrung.y)) {
      nahrung.relocateNahrung(player.x, player.y, bot.x, bot.y, player.radius)
    }
  }


}

