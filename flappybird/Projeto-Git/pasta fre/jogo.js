const sprites = new Image();
sprites.src = './sprites.png';
const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');


const flappyBird = {
        spritex: 0,
        spritey: 0,
        largura: 35,
        altura: 25,
        x: 10,
        y: 50,
            desenha() {
            contexto.drawImage(
             sprites,
             flappyBird.spritex, flappyBird.spritey,
             flappyBird.largura, flappyBird.altura,
             flappyBird.x, flappyBird.y, flappyBird.largura, flappyBird.altura,
            );
       
        },
         
        gravidade: 0.25,
        velocidade: 0, 
        atualiza(){ 
            flappyBird.velocidade += flappyBird.gravidade; 
            flappyBird.y = flappyBird.y + flappyBird.velocidade; }
    }
           

const fundo = {
    spritex: 390,
    spritey: 0,
    largura: 277,
    altura: 203,
    x: 0,
    y: 200,
        desenha1() {
        contexto.drawImage(
            sprites,
            fundo.spritex, fundo.spritey,
            fundo.largura, fundo.altura,
            fundo.x, fundo.y, 
            fundo.largura, fundo.altura,
        )
        contexto.drawImage(
            sprites,
            fundo.spritex, fundo.spritey,
            fundo.largura, fundo.altura,
            (fundo.x + fundo.largura - 1), fundo.y, 
            fundo.largura, fundo.altura,
           
        )
    }
}


const chao = {
    spritex: 0,
    spritey: 609,
    largura: 225,
    altura: 110,
    x: 0,
    y: 380,
        desenha2() {
        contexto.drawImage(
         sprites,
         chao.spritex, chao.spritey,
         chao.largura, chao.altura,
         chao.x, chao.y, chao.largura, chao.altura,
        
         );
         contexto.drawImage(
            sprites,
            chao.spritex, chao.spritey,
            chao.largura, chao.altura,
            (chao.x + chao.largura - 1), chao.y, 
            chao.largura, chao.altura,
           
        )
    }
}

const inicio = {
    spritex: 130,
    spritey: 0,
    largura: 180,
    altura: 152,
    x: 70,
    y: 70,
    desenha3() {
    contexto.drawImage(
    sprites,
    inicio.spritex, inicio.spritey,
    inicio.largura, inicio.altura,
    inicio.x, inicio.y,
    inicio.largura, inicio.altura,
        );
        }
        }







const TelaInicio = { desenha() {
    fundo.desenha1(); 
    chao.desenha2();
    flappyBird.desenha(); 
    inicio.desenha3();
        },
    click(){
        telaAtiva = TelaJogo;
    }    
    }
        const TelaJogo = {
        desenha() {
        fundo.desenha1(); 
        chao.desenha2();
        flappyBird.desenha();
        flappyBird.atualiza();
    },
    click(){}    
    }


var telaAtiva = TelaInicio;
function loop() { 
    telaAtiva.desenha() 
    requestAnimationFrame (loop); 
}


function mudaTelaAtiva(){ 
    telaAtiva.click();
}
window.addEventListener("click", mudaTelaAtiva);











function loop(){
   
    contexto.fillStyle = '#70c5ce'; 
    contexto.fillRect(0,0, canvas.width, canvas.height)
    flappyBird.desenha();
    fundo.desenha1();
    chao.desenha2();
    inicio.desenha3();
    telaAtiva.desenha();
    requestAnimationFrame (loop);
           
}
    loop();









