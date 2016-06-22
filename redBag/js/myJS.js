window.onload=function(){
	var sec=document.querySelector('#check span')
/*立即领取*/
document.querySelector('#submit').addEventListener("touchstart",function(){
	var check=document.querySelector('#check');
	if (check.style.height) {
		location.href="./success.html"
	}
	check.style.height='19vw'
	var timer=setInterval(function(){
		var now=parseInt(sec.innerText);
		if(now>1){
			sec.innerText=--now+'s';
		}else{
			sec.innerText='重发'
		}
	},1000)
})
/*重发短信*/
sec.addEventListener("touchstart",function(){
	if(this.innerText=='重发')this.innerText='60s';
})
/*我知道了*/
document.querySelector('#know').addEventListener("touchstart",function(){
	document.querySelector('#message').style.display='none';
})
}
