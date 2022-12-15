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
        }
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








function loop(){
   
    flappyBird.desenha();
    fundo.desenha1();
    chao.desenha2();
    requestAnimationFrame (loop);
           
}
    loop();





