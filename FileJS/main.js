//select elemets
let landing = document.querySelector(".landing-page");
let backGround = ["01.jpg","03.jpg","04.jpg","05.jpg"];
let setting = document.querySelector(".setting");
let settingDivIcon = document.querySelector(".setting .icon");
let settingIcon = document.querySelector(".setting .icon i");
let allColors = document.querySelectorAll(".options .color ul li");
let checkBoxForChangBackground = document.querySelector(".background input");
let allProgress = document.querySelectorAll(".skill .prograss");
let allGallery = document.querySelectorAll(".Gallery .imgs img");
let allBulet = document.querySelectorAll(".bulets .bulet");
let setBulet = document.querySelector(".setting .options .bullets input");
let menuForMobile = document.querySelector(".landing-page .heading ul");
let change;

startWebSite();

//setting
settingDivIcon.onclick = function(){
    settingIcon.classList.toggle("fa-spin");
    setting.classList.toggle("open");
}

//Add event for ==> change color
for(let i = 0 ; i < allColors.length ; i++){
    allColors[i].addEventListener("click" , function(){
        document.styleSheets[2].rules[0].style.setProperty("--main-color" , this.getAttribute("seting-color"));
        window.localStorage.setItem("color" , this.getAttribute("seting-color"));
        document.querySelector(".options .color ul li.active").classList.remove("active");
        this.classList.add("active");
    });
}

//function start web site
function startWebSite(){
    if(window.localStorage.getItem("color") != null){
        document.styleSheets[2].rules[0].style.setProperty("--main-color" , window.localStorage.getItem("color"));
        document.querySelector(".options .color ul li.active").classList.remove("active");
        for(let i = 0 ; i < allColors.length ; i++){
            if(allColors[i].getAttribute("seting-color") === window.localStorage.getItem("color")){
                allColors[i].classList.add("active");
                break;
            }
        }
    }

    if(window.localStorage.getItem("backGround") != null){
        checkBoxForChangBackground.checked = (window.localStorage.getItem("backGround") === "true");
    }

    if(checkBoxForChangBackground.checked){
        changeBackgroung();
    }

    if(window.localStorage.getItem("bullets") != null){
        setBulet.checked = (window.localStorage.getItem("bullets") === "true");
        if(setBulet.checked){
            document.querySelector(".bulets").style = "display: block;";
        }
        else{
            document.querySelector(".bulets").style = "display: none;";
        }
    }
}

//change backGround
function changeBackgroung(){
    change = window.setInterval(function(){
    let num = Math.floor(Math.random() * backGround.length);
    landing.style = `background-image: url(img/${backGround[num]});`;
    } , 20000);
}

//stop change background
checkBoxForChangBackground.onclick = function(){
    if(checkBoxForChangBackground.checked){
        changeBackgroung();
        window.localStorage.setItem("backGround" , "true");
    }
    else{
        window.clearInterval(change);
        window.localStorage.setItem("backGround" , "false");
    }
}

//Animation our skills
window.onscroll = function(){
    if(window.scrollY >= 650 && window.scrollY <= 1750){
        if(window.scrollY >= 700 && window.scrollY <= 1700){
            for(let i = 0 ; i < allProgress.length ; i++){
                allProgress[i].style = `width:${allProgress[i].getAttribute("data-prograss")}`;
            }
        }
        else{
            for(let i = 0 ; i < allProgress.length ; i++){
                allProgress[i].style = `width:0%`;
            }
        }
    }
}

//add event for Gallery
for(let i = 0 ; i < allGallery.length ; i++){
    allGallery[i].addEventListener("click" , function(e){
        let layer = document.createElement("div");
        layer.classList.add("styleLayers");
        document.body.appendChild(layer);

        let myDiv = document.createElement("div");
        myDiv.classList.add("styleImg");
        let myImg = document.createElement("img");
        myImg.src = this.src;
        myImg.style = "width: 100%;"
        myDiv.appendChild(myImg);
        document.body.appendChild(myDiv);
        
        let close = document.createElement("div");
        close.classList.add("close");
        close.appendChild(document.createTextNode("X"));
        myDiv.appendChild(close);

        close.onclick = function(){
            document.querySelector(".styleLayers").remove();
            document.querySelector(".styleImg").remove();
        }
    });
}

//add event scroll for bullets
for(let i = 0 ; i < allBulet.length ; i++){
    allBulet[i].addEventListener("click" , function(){
        document.querySelector("."+this.getAttribute("data-for-scroll")).scrollIntoView({
            behavior: "smooth"
        });
    });
}

//set Bullets
setBulet.onclick = function(){
    if(setBulet.checked){
        document.querySelector(".bulets").style = "display: block;";
        window.localStorage.setItem("bullets" , "true");
    }
    else{
        document.querySelector(".bulets").style = "display: none;";
        window.localStorage.setItem("bullets" , "false");
    }
}

//Reset options 
document.querySelector(".reset").onclick = function(){
    window.localStorage.clear();
    window.location.reload();
}

//menu for mobile
document.querySelector("button.icon").onclick = function(){
    menuForMobile.classList.toggle("open-men");
};