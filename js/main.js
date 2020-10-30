const movementDisplay = document.querySelector('#movement');
const game = document.querySelector('#game');

//SYNCING UP THE CANVAS'S INTERNAL HxW TO ITS APPARENT HxW
const computedStyle = getComputedStyle(game);

const height = computedStyle.height;
const width = computedStyle.width;
game.height = parseInt(height); 
game.width = parseInt(width);



// //CREATING HERO SQAURE AND SETTING ITS STYLE

// ctx.fillStyle = 'white';
// ctx.strokeStyle = 'red';
// ctx.lineWidth = 5;
// ctx.fillRect(10, 10, 100, 100);
// ctx.strokeRect(10, 10, 100, 100);

// function drawBox(x, y, size, color) {
    //     ctx.fillStyle = color
    //     ctx.fillRect(x, y, size, size)
    // }
    
    // document.querySelector('#status').addEventListener('click', function() {
        //     drawBox(200, 200, 50, "pink");
        //     drawBox(300, 300, 50, "pink");
        // })
        

//CREATING HERO SQAURE AND SETTING ITS STYLE
// var ogre = {
//   x: 10,
//   y: 10,
//   color: "#BADA55",
//   width: 40,
//   height: 80,
//   alive: true,
//   render: function () {
//     ctx.fillStyle = this.color
//     ctx.fillRect(this.x, this.y, this.width, this.height)
//   }
// }

// var hero = {
//   x: 0,
//   y: 0,
//   color: "hotpink",
//   width: 20,
//   height: 20,
//   alive: true,
//   render: function () {
//     ctx.fillStyle = this.color
//     ctx.fillRect(this.x, this.y, this.width, this.height)
//   }
// }

//FACTORY FOR character
const ctx = game.getContext('2d');


class Crawler {
    constructor(x, y, color, width, height) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
        this.alive = true;
    }

    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)   
    }
}

const ogre = new Crawler(10, 10, '#BADA55', 40, 80);
const hero = new Crawler(100, 100, 'hotpink', 20, 20);

// console.log(ogre);
// console.log(hero);

document.getElementById('status').addEventListener('click', function() {
    hero.render();
    // if (ogre.alive === false) {
    ogre.render();
    // }
})

document.addEventListener('keyup', function(evt){
    // debugger
    if (evt.key === "w" || evt.key === "ArrowUp") {
        hero.y -= 10;
        // console.log('W or UpArrow was clicked.');  
    } else if (evt.key === "a" || evt.key === "ArrowLeft") {
        hero.x -= 10;
        // console.log('A or LeftArrow was clicked.');  
    } else if (evt.key === "s" || evt.key === "ArrowDown") {
        hero.y += 10;
        // console.log('S or DownArrow was clicked.');  
    } else if (evt.key === "d" || evt.key === "ArrowRight") {
        hero.x += 10;
        // console.log('D or RightArrow was clicked.');  
    }
    // console.log(hero);
    movementDisplay.textContent = `X:${hero.x}, Y:${hero.y}`
})

function detectHit(){
    //Hit coming from right
    if (hero.x < ogre.x + ogre.width
        && hero.x + hero.width > ogre.x
        && hero.y < ogre.y + ogre.height
        && hero.y + hero.height > ogre.y) {
        ogre.alive = false
        console.log('hit');

    }
}

function rePaint(){
    //Clear off canvas game board
    ctx.clearRect(0, 0, game.width, game.height)
    //Render the Hero and Ogre
    hero.render()
    if (ogre.alive) {
    ogre.render()
    }
    detectHit()
}

setInterval(rePaint, 1000 / 60)