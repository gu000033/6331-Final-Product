
var birdGame={
	TOTLE:24,
	totle:12,
	imgs:[],
	randomImg:[],
	//gameTime:120,
	seeTime:5,
	onloadImg:0,
	timer:null,
	first:-1,
	lockCard:0,
	peidui:0,
	timeCount:100,
	Count:100,
	state:5,
	GAMEOVER:6,
	RUNNING:1,
	PAUSE:2,
	CONTUNUE:3,
	SUCC:4,
	SCORE:0,
	start:function(){
		
		var ulclick=document.getElementById("bubbling");
		ulclick.addEventListener("click",function(e){
			var target=e.target;
			if("level3"==target.innerHTML){
				if(this.state!=this.PAUSE){
					if(this.state==this.GAMEOVER||this.state==this.SUCC||this.state==this.RUNNING){
						clearInterval(this.timer);
						this.timer=null;
						this.SCORE=0;
						this.timeCount=this.Count;
						this.score();
						document.getElementById("timeCal")
								.innerHTML="time:"+this.timeCount+"s";
						document.getElementById("mask")
								.className="mask_every nosee";
						document.getElementById("success")
								.className="mask_every nosee";
					}
					//this.state=this.RUNNING;
					var birdImg=document.getElementsByClassName("birdImg")[0];
					birdImg.innerHTML="";
					this.first=-1;
					this.lockCard=0;
					this.peidui=0;
					this.setHtml();
					var time=this.seeTime;
					var timer1=setInterval(function(){//////
						if(0==time){
							this.timer=setInterval(this.timeCal.bind(this),1000);
							this.rotedAll();
							this.click();
							clearInterval(timer1);
							this.state=this.RUNNING;/////////////
						}
						if(this.seeTime==time){
							this.rotedAll();
						}
						time--;
					}.bind(this),1000);
				}
			}else if(("pause"==target.innerHTML)){
				if(this.state==this.RUNNING){
					console.log(this.state);
					this.pause();
				}
			}else if("continue"==target.innerHTML){
				if(this.state==this.PAUSE){
					this.contin();
				}
			}else if("exit game"==target.innerHTML){
				this.close();
			}
		}.bind(this));
	},
	timeCal:function(){
		var li=document.getElementById("timeCal");
		li.innerHTML="time:"+this.timeCount+"s";
		this.timeCount--;
		if(0==this.timeCount){
			document.getElementById("mask").className="mask_every block";
			li.innerHTML="game over";
			clearInterval(this.timer);
			this.timer=null;
			this.state=this.GAMEOVER;
			//this.timeCount=this.Count;
		}
	},
	pause:function(){
		this.state=this.PAUSE;
		clearInterval(this.timer);
		this.timer=null;
		//$("#pause").css("display","none");
		//document.getElementById("pause").style.display="block";
		document.getElementById("pause").className="mask_every block";
	},
	contin:function(){
		this.state=this.RUNNING;
		document.getElementById("pause").className="mask_every";
		this.timer=setInterval(this.timeCal.bind(this),1000)
	},
	close:function(){
		window.close();
	},
	score:function(){
		var ul=document.getElementById("bubbling");
		ul.children[0].innerHTML="Score:"+this.SCORE;
	},
	getImg:function(){
		for(var i=0;i<this.totle;i++){
			this.imgs.push({"cardinfi":"images/"+i+"_a.png","turn":0},
							{"cardinfi":"images/"+i+"_a.png","turn":0});
		}
		var num=this.imgs.length;
		for(var r=0,randomImg=[];r<num;r++){
			var n=Math.floor(Math.random()*this.imgs.length);
			randomImg.push(this.imgs.splice(n,1).pop());
		}
		return randomImg;
	},
	setHtml:function(){
		this.randomImg=this.getImg();
		var frag=document.createDocumentFragment();
		for(var i=0,temImg=[],backImg=[];i<this.TOTLE;i++){
			var div=document.createElement("div")
				div.className="imgContainer";
			var div1=document.createElement("div");
			div1.id="card"+i;
			div1.className="card viewport-flip";
			div.appendChild(div1);
			var div2=document.createElement("div");
			div2.className="list flip out";
			div1.appendChild(div2);
			var div3=document.createElement("div");
			div3.className="list flip";
			div1.appendChild(div3);
			
			temImg[i]=new Image();
			temImg[i].src=this.randomImg[i]["cardinfi"];
			
			backImg[i]=new Image();
			backImg[i].src="images/backImg.png";
			div2.appendChild(temImg[i]);
			div3.appendChild(backImg[i]);
			frag.appendChild(div);
		}
		document.getElementById("birdImg").appendChild(frag);
	},
	rotedAll:function(){
		for(var i=0;i<this.randomImg.length;i++){
			this.roted(i)
		}
	},
	roted:function(idx){
		var div=document.getElementById("card"+idx);
		var divs=div.querySelectorAll("div");
		var cardfont, cardback;
		if(divs[0].className.indexOf("out")!==-1){
			cardfont = divs[0];
            cardback = divs[1];
		}else{
            cardfont = divs[1];
            cardback = divs[0];
        }
		setTimeout(function(){
			cardback.className="list flip out";
			cardfont.className="list flip in";
        }, 500);
		//debugger;
	},
	click:function(){
		for(var i=0;i<this.TOTLE;i++){
			var div=document.getElementById("card"+i);
			div.addEventListener("click",turn.bind(this));
		}
		function turn(e){
			var tar=e.target;
			var div=tar.parentNode.parentNode;
			var n=parseInt(div.id.replace("card",""));
			if(this.lockCard==1){
				return;
			}	
			else if(this.randomImg[n]["turn"]==0){
				//console.log(this.first);
				if(this.first==-1){
					this.roted(n);
					this.first=n;
					this.randomImg[n]["turn"]=1;
					//console.log(this.first);
				}
				else{
					this.roted(n);
					this.randomImg[n]["turn"]=1;
					this.check(n);
				}
			}
		}
	},
	check:function(n){
		this.lockCard=1;
		if((this.randomImg[this.first]["cardinfi"])==
			(this.randomImg[n]["cardinfi"])){
				this.SCORE+=10;
				this.score();
				this.peidui++;
				if(this.peidui==this.totle){
					clearInterval(this.timer);
					this.timer=null;
					this.state=this.SUCC;
					document.getElementById("success")
								.className="mask_every block";
					//this.timeCount=this.Count;
				}
				this.first=-1;
				this.lockCard=0;
		}
		else{
			var et=setTimeout(function(){
				this.roted(n);
				this.roted(this.first);
				this.randomImg[n]["turn"]=0;
				this.randomImg[this.first]["turn"]=0;
				this.first=-1;
				this.lockCard=0;
			}.bind(this),1000);
		}
	}
}
birdGame.start();
console.log('author:xue;date:11/4');
