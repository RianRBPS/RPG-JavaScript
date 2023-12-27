// Variáveis essenciais
let exp = 0;
let health = 100;
let gold = 50;
let aux = 0;
let currentWeapon = 0;
let monsterHealth;
let monsterlevel;
let pride = 5;
let level = 1;
let inventory = ["stick"];
let fighting;
let defense = 1;
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const expText = document.querySelector("#expText");
const goldText = document.querySelector("#goldText");

// Botões Essenciais
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// Loja e funções da loja
function goStore( ){
  button1.innerText = "Buy 10 health (10 gold)";
  button2.innerText = "Buy weapon (30 gold)";
  button3.innerText = "Get out of the store";
  button1.onclick = buyHealth;
  button2.onclick = buyWeapon;
  button3.onclick = goTown;
  text.innerText = "You enter the store.";
}

function buyHealth() {
  if (health >= 150){
    text.innerText = "You are already at full health.";
  } else if (gold >= 10) {
    gold -= 10;
    goldText.innerText = gold;
    health = health + 10;
    healthText.innerText = health;
    text.innerText = "You bought 10 health";
  } else {
    text.innerText = "You don't have enough gold"; 
  }
  if(health > 150){
    health = 150;
    healthText.innerText = health;
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if(gold >= 30){
      currentWeapon++;
      gold -=30;
      goldText.innerText = gold;
      holdingText.innerText = weapons[currentWeapon].name;
    }else{
      text.innerText = "You don't have enough gold";
    }
  }
}

// Armas da loja
const weapons = [
  {
    name: "stick",
    power: 5
  },
  {
    name: "Iron dagger",
    power: 30
  },
  {
    name: "Steel sword",
    power: 50
  },
  {
    name: "Enchanted Sword",
    power: 100
  },
  {
    name: "Firearm",
    power: 200
  }];

// Ir para a cidade
function goTown(){
  monsterStats.style.display = "none";
  button1.innerText = "Go to store";
  button2.innerText = "Go to cave";
  button3.innerText = "Fight dragon";
  button1.onclick = goStore;
  button2.onclick = goCave;
  button3.onclick = fightDragon;
  text.innerText = "You are in the town square."
}

// Ir para a caverna
function goCave(){
  button1.innerText = "Fight blob";
  button2.innerText = "Fight Skeleton";
  button3.innerText = "Go back to town"
  button1.onclick = fightBlob;
  button2.onclick = fightSkeleton;
  button3.onclick = goTown;
  text.innerText = "You enter the cave, monsters are nearby.."
}

// Monstros
const monsters = [
  {
    name: "blob",
    level: 1,
    health: 15
  },
  {
    name: "Skeleton",
    level: 2,
    health: 40  
  },
  {
    name: "Dragon",
    level: 3,
    health: 600          
  }
];

// Batalhas
function fightBlob() {
  fighting = 0;
  goFight();
}

function fightSkeleton() {
  fighting = 1;
  goFight();    
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
    button1.innerText = "Attack";
    button2.innerText = "Dodge";
    button3.innerText = "Run";
    button1.onclick = attack;
    button2.onclick = dodge;
    button3.onclick = goTown;
    text.innerText = "You are fighting a " + monsters[fighting].name + ".";
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";

    if (isMonsterHit()) {
        health -= getMonsterAttackValue(monsters[fighting].level);
    } else {
    text.innerText += " You miss.";
  }

  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * exp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;   
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    // Caso a batalha seja contra o dragão, o jogador irá ganhar o jogo ao vencer
    fighting === 2 ? winGame() : defeatMonster();
  }

  if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += " Your " + inventory.pop() + " breaks.";
        currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * exp));
    console.log(hit);
    return hit;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

function defeatMonster() {
    text.innerText = "You defeat the " + monsters[fighting].name + ".";
    monsterStats.style.display = "none";
    gold += Math.floor(monsters[fighting].level * 6.7)
    exp += monsters[fighting].level;
    goldText.innerText = gold;
    //expText.innerText = exp;
    goTown();
}

function lose(){
  monsterStats.style.display = "none";
  text.innerText = "You lost the game. ";
  button1.innerText = "REPLAY?";
  button2.innerText = "REPLAY?";
  button3.innerText = "REPLAY?";
  button1.onclick = restart;
  button2.onclick = restart;
  button3.onclick = restart;
}

function winGame(){
  monsterStats.style.display = "none";
  text.innerText = "You defeat the dragon! YOU WIN THE GAME! ";
  button1.innerText = "REPLAY?";
  button2.innerText = "REPLAY?";
  button3.innerText = "REPLAY?";
  button1.onclick = restart;
  button2.onclick = restart;
  button3.onclick = restart;
}

function restart(){
  goTown();
  text.innerText = "You had a strange dream about dying or killing a dragon";
  exp = 0;
  xpText = exp;
  health = 100;
  healthText.innerText = health;
  gold = 50;
  goldText.innerText = gold;
  aux = 0;
  currentWeapon = 0;
  holdingText.innerText = weapons[currentWeapon].name;
}
