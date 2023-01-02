const som_punch = new Audio();
som_punch.src = './som/punch.wav';
const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 35,
    altura: 25,

    x: 10,
    y: 50,
    pulo: 4.6,
    pula(){
        flappyBird.velocidade = -flappyBird.pulo;
    },
    desenha() {
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY,
            flappyBird.largura, flappyBird.altura,
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura,
        );
    },
    gravidade: 0.25,
    velocidade: 0,
    atualiza(){
        if(fazColisao()){
            som_punch.play();
            telaAtiva = TelaInicio;
            return;
        }
        flappyBird.velocidade += flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    }
}
const planodeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 276,
    altura: 204,

    x: 0,
    y: canvas.height - 204,
        desenha() {
        contexto.drawImage(
            sprites,
            planodeFundo.spriteX, planodeFundo.spriteY,
            planodeFundo.largura, planodeFundo.altura,
            planodeFundo.x, planodeFundo.y,
            planodeFundo.largura, planodeFundo.altura,
        );
        contexto.drawImage(
                sprites,
                planodeFundo.spriteX, planodeFundo.spriteY,
                planodeFundo.largura, planodeFundo.altura,
                planodeFundo.x + planodeFundo.largura, planodeFundo.y,
                planodeFundo.largura, planodeFundo.altura,
        )
    }
}
const chao = {
    spriteX: 0,
    spriteY: 609,
    largura: 225,
    altura: 110,

    x: 0,
    y: 375,
        desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura,
        );
        contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x + chao.largura - 1, chao.y,
                chao.largura, chao.altura,
        )
    }
}
const inicio = {
    spriteX: 130,
    spriteY: 0,
    largura: 180,
    altura: 152,
    x: 70,
    y: 70,
        desenha(){
        contexto.drawImage(
            sprites,
            inicio.spriteX, inicio.spriteY,
            inicio.largura, inicio.altura,
            inicio.x, inicio.y,
            inicio.largura, inicio.altura,
        );
    }
}
const TelaInicio = {
    desenha(){
        planodeFundo.desenha();
        chao.desenha();
        flappyBird.desenha();
        inicio.desenha();
    },
    click(){
        telaAtiva = TelaJogo;
    }
}
const TelaJogo = {
    desenha(){
        planodeFundo.desenha();
        chao.desenha();
        flappyBird.desenha();
        flappyBird.atualiza();
    },
    click(){
        flappyBird.pula();
    }
}

var telaAtiva = TelaInicio;

function loop(){ 
    contexto.fillStyle = 'blue'; 
    contexto.fillRect(0,0, canvas.width, canvas.height)
    telaAtiva.desenha()
    requestAnimationFrame(loop);
}

loop();
function mudaTelaAtiva(){
    telaAtiva.click();
}
function fazColisao(){
    if(flappyBird.y < chao.y - 30){
        return false
    }
    else{
        return true
    }
}

window.addEventListener("click", mudaTelaAtiva);









