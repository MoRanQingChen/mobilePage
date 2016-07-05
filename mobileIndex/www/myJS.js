$ = (ele, flag = false) => flag ? document.querySelectorAll(ele) : document.querySelector(ele);
HTMLElement.prototype.on = function(a, b) {
	this.addEventListener(a, b)
};
class Render {//ajax渲染
	constructor() {
		this.xhr = new XMLHttpRequest();
		this.oBanner = $('#banner>div');
		this.point=$('#banner>ul');
		this.list = $('#list>div', true);
		return this.ajax()
	}
	ajax() {
		this.xhr.open("get", "http://10.101.64.75/data.json", false);
		this.xhr.onreadystatechange = () => {
			if (this.xhr.readyState == 4 && /^2\d\d$/.test(this.xhr.status)) {
				return this.render(JSON.parse(this.xhr.responseText));
			}
		};
		this.xhr.send(null);
	}
	render(data) {
		this.imgs = data.Touch.AdvertiseList;
		for (var i = 0; i < this.imgs.length + 2; i++) {
			let oImg = document.createElement("img");
			let oLi=document.createElement("li")
			oImg.src = this.imgs[i % this.imgs.length].ImageUrl;
			this.oBanner.appendChild(oImg);
			if(i<this.imgs.length-1){
				this.point.appendChild(oLi);
			}
		}
		data.Touch.DistinationList.forEach((a, b, c) => {
			this.list[b].style.background = "url(" + a.ImageUrl + ")";
			this.list[b].innerHTML = a.Title + '<br><span>' + a.SubTitile + '</span>';
			this.list[b].on('click', () => location.href = a.RedirectUrl)
		})
		this.list[this.list.length-1].innerHTML="";
		this.point.style.marginLeft=-this.point.clientWidth/2+'px';
		this.oBanner.style.width = i + '00vw';
	}
};
class Banner { //banner广告
	constructor(){
		this.data=new Render();
		this.oBanner = $('#banner>div');
		this.max = this.oBanner.getElementsByTagName('img').length - 2;
		this.width = this.oBanner.getElementsByTagName('img')[0].clientWidth;
		this.count = -this.max;
		this.start = 0;
		this.startMargin = 0;
		this.point=$('#banner li',true)
		return this.bindEvent();
	}
	bindEvent(){
		this.oBanner.on('touchstart', (e) => {
		this.startMargin = parseFloat(this.oBanner.style.marginLeft);
		if (this.startMargin < -this.max * this.width) {
			this.startMargin += this.max * this.width;
			this.count = -1;
		}
		if (this.startMargin >= 0) {
			this.startMargin -= this.max * this.width;
			this.count = -this.max;
		}
		this.start = e.touches[0].clientX;

		})
		this.oBanner.on('touchmove', (e) => {
			
			this.oBanner.style.marginLeft = e.touches[0].clientX - this.start + this.startMargin + 'px';
		})
		this.oBanner.on('touchend', (e) => {
			e.changedTouches[0].clientX - this.start > 0 ? this.count++ : e.changedTouches[0].clientX - this.start == 0 ? location.href = JSON.parse(this.data.xhr.responseText).Touch.AdvertiseList[-this.count % this.max].RedirectUrl : this.count--;
			this.startMargin = parseFloat(this.oBanner.style.marginLeft);
			Animate.prototype.animate(this.oBanner, this.startMargin, this.count * this.width)
			Animate.prototype.changePoint(this.point,Math.abs(this.count)%this.max);
		})
		return this.interval()
	}
	interval(){
		setInterval(()=>{
		this.count--;
		if(this.count==-this.max-1){
			this.oBanner.style.marginLeft=0;
			this.count=-1;
		}
		if(this.count==-this.max-2){
			this.oBanner.style.marginLeft=this.width+'px';
			this.count=-2;
		}
		Animate.prototype.animate(this.oBanner, parseFloat(this.oBanner.style.marginLeft), this.count * this.width)
		Animate.prototype.changePoint(this.point,Math.abs(this.count)%this.max)
		},10000)
	}
};
class JsonpRender{//JSONP渲染
	constructor(data){
		this.data=data;
		this.times = $('#time i', true);
		this.time = (new Date(data.PIShelfTime.replace('T', ' ')) - new Date(data.CurTime)) / 1000;
		return this.render();
	}
	change(num) {
		return num < 10 ? '0' + parseInt(num) : parseInt(num);
	}
	render(){
		$('#hurryBug>a').href = this.data.PIRedirectUrl;
		$('#hurryBug section>img').src = this.data.ImgUrl;
		$('#hurryBug h4').innerText = this.data.PITitle;
		$('#value+span').innerText = this.data.ActualPrice;
		this.setTime(this.time);
		setInterval(() => {
			this.setTime(--this.time);
		}, 1000)
	}
	setTime(time){
		this.times[2].innerText = this.change(time % 60)
		this.times[1].innerText = this.change(time / 60 % 60)
		this.times[0].innerText = this.change(time / 3600)
	}
}
class Nav{ //拖动型导航
	constructor(){
		this.oBanner = $('#classify');
		this.max = 2;
		this.start = 0;
		this.count = 0;
		this.width = $('#search').clientWidth;
		this.startMargin=0;
		this.point=$('#nav-point li',true)
		return this.bindEvent();
	}
	bindEvent(){
		this.oBanner.on('touchstart', (e) => {
		this.startMargin = parseFloat(this.oBanner.style.marginLeft);
		this.start = e.touches[0].clientX;
		})
		this.oBanner.on('touchmove', (e) => {
			if (e.touches[0].clientX - this.start + this.startMargin > 0) {
				return
			}
			this.oBanner.style.marginLeft = e.touches[0].clientX - this.start + this.startMargin + 'px';
		})
		this.oBanner.on('touchend', (e) => {
			this.startMargin = parseFloat(this.oBanner.style.marginLeft);
			e.changedTouches[0].clientX - this.start < 0 && this.startMargin > -this.width ? this.count-- : e.changedTouches[0].clientX - this.start > 0 && this.startMargin < 0 ? this.count++ : 0
			Animate.prototype.animate(this.oBanner, this.startMargin, this.count * this.width)
			Animate.prototype.changePoint(this.point,Math.abs(this.count));
		})
	}
};
class Animate{
	changePoint(point,count){
		for (let i=0;i<point.length;i++) {
			point[i].className=""
		}
		point[count].className="active";
	}
	animate(ele, start, target){
		let timer = setInterval(() => {
			Math.abs(target - start) >= this.max * this.width ? (start = target) : target - start > 0 ? start += 80 : target - start < 0 ? start -= 80 : 0; //速度
			ele.style.marginLeft = start + 'px';
			if (start < target + 50 && start > target - 50) {
				ele.style.marginLeft = target + 'px'
				clearInterval(timer)
			}
		}, 20)
	}
}
new Nav();new Banner();
let jsonp1 = (data) => new JsonpRender(data);