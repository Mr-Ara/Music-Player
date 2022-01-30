let musics = [
    {
     name : "Gorg2",
     cover: "images/2.png",
     audio: new Audio("./musics/Gorg 2.mp3")
    },
    {
        name : "Velesh Kon",
        cover: "images/3.png",
        audio: new Audio("./musics/08 Velesh Kon.mp3")
    },
    {
        name : "Ki Mesle To",
        cover: "images/1.png",
        audio: new Audio("./musics/Ki Mesle To.mp3")
    }
]

let range = document.querySelector("#music-time")
let playBtn = document.querySelector("#play-btn")
let nextBtn = document.querySelector("#next-btn")
let preBtn = document.querySelector("#pre-btn")
let musicCover = document.querySelector("#music-cover")
let musicName = document.querySelector("#music-name")
let min = document.querySelector("#min")
let sec = document.querySelector("#sec")

let curentMusic = 0
let audio = musics[curentMusic].audio
 musicCover.src = musics[curentMusic].cover
 musicName.innerText = musics[curentMusic].name
 

 audio.addEventListener("canplay",()=>{
     range.max = audio.duration
    
 })


 audio.addEventListener("timeupdate",()=>{
    range.value = audio.currentTime
    let time = audio.duration - audio.currentTime
    min = Math.floor(time/60)
    sec = Math.floor( time%60)
    document.querySelector("#min").innerHTML = min 
    document.querySelector("#sec").innerHTML = sec 
})

range.addEventListener("input",()=>{
    audio.currentTime = range.value 
})

playBtn.addEventListener("click",()=>{
    if(audio.paused){
        audio.play()
        musicCover.style.animationPlayState = "running"
        playBtn.classList.replace("fa-play","fa-pause")
    }
    else{
        audio.pause()
        musicCover.style.animationPlayState = "paused"
        playBtn.classList.replace("fa-pause","fa-play")
    }
})

nextBtn.addEventListener("click",()=>{
    changeMusic("next")
})

preBtn.addEventListener("click",()=>{
    changeMusic("pre")
})

function changeMusic(state){

    audio.pause()
    playBtn.classList.replace("fa-pause","fa-play")
    musicCover.style.animationPlayState = "paused"
    range.value = 0
    audio.currentTime = 0
    if (state == "next") {
        if (curentMusic == musics.length-1) {
            curentMusic = 0
        }else{
            curentMusic += 1 
        }
    }else if (curentMusic == 0) {
            curentMusic = musics.length-1
        }else{
            curentMusic -= 1 
        }
   


        audio = musics[curentMusic].audio
        musicCover.src = musics[curentMusic].cover
        musicName.innerText = musics[curentMusic].name

        audio.addEventListener("timeupdate",()=>{
            range.value = audio.currentTime
            let time = audio.duration - audio.currentTime
            min = Math.floor(time/60)
            sec = Math.floor( time%60)
            document.querySelector("#min").innerHTML = min 
            document.querySelector("#sec").innerHTML = sec 
        })

        audio.play()
        musicCover.style.animationPlayState = "running"
        playBtn.classList.replace("fa-play","fa-pause")
    }

window.addEventListener("keyup",(e)=>{
    switch (e.keyCode == 32) {
        case playBtn.className.includes("fa-play"):
            audio.play()
            playBtn.classList.replace("fa-play","fa-pause")
            musicCover.style.animationPlayState = "running"
            break;
        case playBtn.className.includes("fa-pause"):
            playBtn.classList.replace("fa-pause","fa-play");
            musicCover.style.animationPlayState = "paused"
            audio.pause()
            break;
        default:
            break;
    }

    
})

