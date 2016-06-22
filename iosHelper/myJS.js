var oLi=document.querySelectorAll("#question li");
var answer=document.querySelectorAll(".answer");
var arr=document.querySelectorAll(".arr");
var now=-1;
var h=[];
for (var i = oLi.length - 1; i >= 0; i--) {
	answer[i].style.height="auto";
	h[i]=answer[i].offsetHeight;
	answer[i].style.height="0";
	oLi[i].onclick=(function(i){
		return function(){
			if (now==i) {
				answer[i].style.height="0";
				answer[i].style.padding="0 7vw 0 5vw";
				arr[i].className="arr trans"
				now=-1;
				return;
			}
			for (var j = answer.length - 1; j >= 0; j--) {
				answer[j].style.height="0";
				answer[j].style.padding="0 7vw 0 5vw";
				arr[j].className="arr trans"
			}
			now=i;
			answer[i].style.height=h[i]+"px";
			answer[i].style.padding="4vw 7vw 4vw 5vw";
			arr[i].className="arr rotate trans"
		}
	})(i);
}