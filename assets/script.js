//DINOGAME

const body = document.getElementsByTagName('body')[0];
const background = document.querySelector('.background');
const start = document.querySelector('.start');
let jumpsound = document.querySelector('.jumpsound');
let position = 0;
let jumping = false;


function startGame() {

    //create player
    const player = document.createElement('div');
    player.classList.add('character');
    background.appendChild(player);
    background.removeChild(start);

    //dark-mode
    if (background.classList.contains("darkmode-bg")) {
        player.style.backgroundImage = "url(assets/imgs/dino-dark-mode.png)";
    } else {
        player.style.backgroundImage = "url(assets/imgs/dino.png)";
    }

    //Space key pressed => player jump
    window.addEventListener('keyup', (event) => {
        if (event.code === 'Space') {
            if (!jumping) {
                jump();
                jumpsound.play();
            }
        }
    });

    function jump() {
        jumping = true;

        //validation - height limit 
        let upInterval = setInterval(() => {
            if (position >= 150) {
                clearInterval(upInterval);

                let downInterval = setInterval(() => {

                    //validation - bottom limit
                    if (position <= 0) {
                        clearInterval(downInterval);
                        jumping = false;

                    } else {

                        //falling
                        position -= 20;
                        player.style.bottom = `${position}px`;
                    }
                }, 20)

            } else {

                //jumping
                position += 20;
                player.style.bottom = `${position}px`;
            }
        }, 20);
    }

    //Obstacles
    function createObstacles() {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        background.appendChild(obstacle);

        let obstaclePosition = 0;
        let randomTime = Math.random() * 6000;

        //dark-mode
        if (background.classList.contains("darkmode-bg")) {
            obstacle.style.background = "url(assets/imgs/cactus-dark-mode.png)";
        } else {
            obstacle.style.background = "url(assets/imgs/cactus.png)";
        }

        //obstacle's movement
        let leftInterval = setInterval(() => {

            //Validation - Obstacle out of background
            if (obstaclePosition === 900) {
                clearInterval(leftInterval);
                background.removeChild(obstacle);

                //GameOver
            } else if (obstaclePosition < 900 && obstaclePosition > 840 && position < 60) {
                clearInterval(leftInterval);
                clearTimeout(spawnObstacles);

                background.innerHTML = '<h2 class="game-over__title"> Game Over </h2><button class="game-over__button" onClick="window.location.reload();"><i class="fa-solid fa-arrow-rotate-left"></i></button>'

            } else {
                obstaclePosition += 10;
                obstacle.style.right = `${obstaclePosition}px`
            }
        }, 20);

        let spawnObstacles = setTimeout(createObstacles, randomTime);
    }

    createObstacles();

}

const changeModeBtn = document.getElementById('change-mode-btn');
changeModeBtn.addEventListener('click', changeMode);

function changeMode() {
    body.classList.toggle("dark-mode");
}