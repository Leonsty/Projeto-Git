chao = {
	y: window.innerHeight,
	altura: 5,
	cor:"#30f91d",

	desenha:function(){
		if(score.value > 10) this.cor="#ff9100"
		if(score.value > 21) this.cor="#fd0000"

		ctx.fillStyle = this.cor
		ctx.fillRect(0, this.y - this.altura, LARGURA, this.altura)

	}
}