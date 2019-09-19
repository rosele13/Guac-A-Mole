var Game = {
  avocados: document.querySelectorAll(".avocado"),
  scoreBoard: document.querySelector("#score"),
  remainingPeeps: 10,
  score: 0,
  level: {
    min: 1800,
    max: 2800
  },
  lvlDiff (diff){
    switch(diff){
      case "Easy":{
        document.getElementById("lvl-diff").textContent = "Easy";
        this.level.min = 1800;
        this.level.max = 2800;
        break;
        }
      case "Medium":{
        document.getElementById("lvl-diff").textContent = "Medium";
        this.level.min = 800;
        this.level.max = 1800;
        break;
      }
      case "Hard":{
        document.getElementById("lvl-diff").textContent = "Hard";
        this.level.min = 300;
        this.level.max = 700;
        break;
      }
    }
  },
  bonk(avoc){
    var avocado = new Avocado(avoc);
    this.score++;
    avocado.shrink();
    this.scoreBoard.textContent = this.score;
  },
  peep(avoc){
    const time = this.randomTime(this.level.min, this.level.max);
    var avocado = new Avocado(avoc)
    avocado.sprout();
    setTimeout(function(){avocado.shrink()}, time)
    if (this.remainingPeeps > 1)
    {
      this.remainingPeeps--;
      setTimeout(function(){Game.peep(Game.randomAvocado())}, time);
    }
  },
  randomAvocado(){
    return this.avocados[Math.floor(Math.random()*this.avocados.length)];
  },
  randomTime(min, max){
    return Math.floor(min + Math.random()*(max-min));
  }, 
  startGame(){
    return this.remainingPeeps >0 ? this.peep(this.randomAvocado()): this.reset();
  },
  reset(){
    this.remainingPeeps = 10;
    this.score = 0;
    this.scoreBoard.textContent = this.score;
    this.startGame();
  }
}


//Avocado Constructor
class Avocado  {
  constructor(avocado){
    this.avocado = avocado;
  }
  sprout(){
    this.avocado.classList.add("up")
  }
  shrink(){
    this.avocado.classList.remove("up")
  }
  
}
//Showing the level difficulty section
function on() {
  document.getElementById("levels").style.display = "flex";
  document.getElementById("levels").style.justifyContent = "center";
}
function off() {
  document.getElementById("levels").style.display = "none";
  
}

