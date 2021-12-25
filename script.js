const firstletter = document.querySelector('.firstletter');
const sound = document.querySelector('.sound');
const clip = document.querySelector('.clip');
const reloadWrapper = document.querySelector('.reloadWrapper');
const userInput = document.querySelector('.userInput');
const search = document.querySelector('.btn');
const word = document.querySelector('#word');
const soundIcon = document.querySelector('.soundIcon');
const defs = document.querySelector('.defs');
const def = document.querySelector('.def');
const d = document.querySelector('.d');
var counter = 0;

var pronounce;
var fl;

reloadWrapper.addEventListener('click', function () {
    window.location.reload();
})


search.addEventListener('click', async function () {
    fl = userInput.value[0];
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/sd3/json/${userInput.value}?key=defeb54f-6786-40ff-b27d-b3bbc58fb8a8`);
    word.innerText = userInput.value;
    //console.log(soundIcon.classList)
    soundIcon.classList.remove('hide');
    def.classList.remove('hide');
    const data = await response.json(); // response is coming as the html file. so .json is not required 
    data.map((d) => {
        counter++;
        //console.log(data[0].hwi.prs[0].sound.audio)
        pronounce = data[0].hwi.prs[0].sound.audio;
        console.log(pronounce)
        console.log(d.shortdef)
        defs.innerHTML += `<div class="def">
                <p class="d"><span>${counter}</span>&nbsp;&nbsp;${d.shortdef}</p >
               </div>`
    });
})

sound.addEventListener('click', async function () {
    const response = await fetch(`https://media.merriam-webster.com/audio/prons/en/us/mp3/${fl}/${pronounce}.mp3?key=defeb54f-6786-40ff-b27d-b3bbc58fb8a8`);
    // first character after file extension with the file name itself should be dynamic >> should come from the api data
    const data = await response; // response is coming as the html file. so .json is not required 
    console.log(data.url)
    clip.src = data.url;
    clip.play();
    console.log(pronounce)
})
