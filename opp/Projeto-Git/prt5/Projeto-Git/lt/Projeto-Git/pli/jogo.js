// Aqui teremos a programação do Flappy Bird :D//
const som_punch = new Audio();
som_punch.src = './punch.wav';
let animation_frame = 0;
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
    movimentos: [ 
        { spriteX: 0, spriteY: 0, },                 
        { spriteX: 0, spriteY: 26,},                 
        { spriteX: 0, spriteY: 52, },                 
        { spriteX: 0, spriteY: 26, },
    ],
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
        flappyBird.atualizaFrame();
    },

    frameAtual: 0,
    atualizaFrame(){
        if((animation_frame % 10) == 0){ 
            flappyBird.frameAtual = flappyBird.frameAtual + 1; 
            flappyBird.frameAtual = flappyBird.frameAtual % flappyBird.movimentos.length; 
            flappyBird.spriteX = flappyBird.movimentos[flappyBird.frameAtual].spriteX; 
            flappyBird.spriteY = flappyBird.movimentos[flappyBird.frameAtual].spriteY;
        }
    },     
}
const planodeFundo = {
    spriteX: 390.5,
    spriteY: 0,
    largura: 275.5,
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
        contexto.drawImage(
            sprites,
            planodeFundo.spriteX, planodeFundo.spriteY,
            planodeFundo.largura, planodeFundo.altura,
            planodeFundo.x + planodeFundo.largura*2, planodeFundo.y,
            planodeFundo.largura, planodeFundo.altura,
    )
    },
    atualiza() {
        planodeFundo.x = planodeFundo.x - 1/2;
        planodeFundo.x = planodeFundo.x % (planodeFundo.largura );
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
    },

    atualiza(){
        chao.x = chao.x - 5;
        chao.x = chao.x % (chao.largura / 2);
    }
}
const canos = {
    largura: 52,
    altura: 400,
    ceu: {
        spriteX: 52,
        spriteY: 169,
        x: 120,
        y: -150
    },
    chao: {
        spriteX: 0,
        spriteY: 170
    },
    pares: [],
    espacamentoEntreCanos: 120,
    
    desenha(){
        
        for(i=0;i<canos.pares.length;i++){
            canos.ceu.x = canos.pares[i].x;
            canos.ceu.y = canos.pares[i].y;        
            // [Cano do Céu]
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canos.ceu.x, canos.ceu.y,
                    canos.largura, canos.altura,
                )
            // [Cano do Chão]
            const canoChaoX = canos.ceu.x;
            const canoChaoY = canos.altura + this.espacamentoEntreCanos + canos.ceu.y;
            contexto.drawImage(
                sprites,
                canos.chao.spriteX, canos.chao.spriteY,
                canos.largura, canos.altura,
                canoChaoX, canoChaoY,
                canos.largura, canos.altura,
            )
        }
    },
    atualiza(){
        canos.ceu.x = canos.ceu.x - 2;
        const passou100Frames = (animation_frame % 100 === 0);
        if(passou100Frames) {
            const novoPar = {
                x: canvas.width,
                y: -150 * (Math.random() +1),
            }
            canos.pares.push(novoPar);
        }
        for(i=0;i<canos.pares.length;i++){
            const par = canos.pares[i];
            par.x = par.x - 2;
            if(par.x + canos.largura <= 0){
                canos.pares.shift();
           
            }
               if(fazColisaoobstaculo(par)){
                   som_punch.play();
                   telaAtiva = TelaInicio;
                   return;
               
             } 
            
            }
    }
}


function fazColisaoobstaculo (par){
    if(flappyBird.x >= par.x) {
    const alturaCabecaFlappy = flappyBird.y;
    const alturaPeFlappy  =flappyBird.y + flappyBird.altura;
    const bocaCanoCeuY  = par.y +canos.altura;
    const bocaCanoChaoY = par.y + canos.altura + canos.espacamentoEntreCanos;
    if(alturaCabecaFlappy <= bocaCanoCeuY){
    return true;
    }
    if(alturaPeFlappy >= bocaCanoChaoY){
    return true;
    }
    }
    return false;
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
        )
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
        planodeFundo.atualiza();
        chao.desenha();
        chao.atualiza();
        flappyBird.desenha();
        flappyBird.atualiza();
        canos.desenha();
        canos.atualiza();
    },
    click(){
        flappyBird.pula();
    }
}
var telaAtiva = TelaInicio;

function loop(){ 
    contexto.fillStyle = '#2fc2c2'; 
    contexto.fillRect(0,0, canvas.width, canvas.height)
    telaAtiva.desenha()
    requestAnimationFrame(loop);
    animation_frame = animation_frame + 1;
}

loop();
function mudaTelaAtiva(){
    telaAtiva.click();
}
window.addEventListener("click", mudaTelaAtiva);

function fazColisao(){
    if(flappyBird.y < chao.y-30){
        return false
    }
    else{
        return true
    }
}

