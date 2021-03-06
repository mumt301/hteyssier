
function runAfterLoadingPage(){

    // Setting up Wavesurfer to display what is being captated by mic
    var wavesurfer = WaveSurfer.create({
        container     : '#waveform',
        waveColor     : 'black',
        audioRate     : 100,
        interact      : false,
        cursorWidth   : 0,
        height        : 700,
        barHeight     : 2,
        barWidth      : 1,
        plugins : [
            WaveSurfer.microphone.create()
        ]
    });
    
    wavesurfer.microphone.on('deviceReady', function(stream) {
        console.log('Device ready!', stream);
    });

    wavesurfer.microphone.on('deviceError', function(code) {
        console.warn('Device error: ' + code);
    });

    wavesurfer.microphone.start();


    // Setting up the convolvers
    var convolver = new Pizzicato.Effects.Convolver({
        impulse: './media/final_proj/small_church_IR.wav',
        mix: 0.5
    }, function() {
        console.log('Convolver ready to be used.');
    });

    var convolver2 = new Pizzicato.Effects.Convolver({
        impulse: './media/final_proj/cave_bulgaria.wav',
        mix: 0.5
    }, function() {
        console.log('Convolver 2 ready to be used.');
    });
    

    // Setting up the source to be the input stream from microphone
    var voice = new Pizzicato.Sound({
        source: 'input',
    }, function() {
        voice.play()
    });


    // Setting up the backgroud noises
    var church_background = new Pizzicato.Sound({
        source: 'file',
        options: { 
            path : './media/final_proj/church_background.wav', 
            volume: 0.5,
            loop : true 
        }
    }, function() {
        console.log('Church background sound ready to be used.');
    });

    var cave_background = new Pizzicato.Sound({
        source: 'file',
        options: { 
            path : './media/final_proj/cave_background.wav', 
            volume: 0.5,
            loop : true 
        }
    }, function() {
        console.log('Cave background sound ready to be used.');
    });


    // Setting up event listener for the first IR
    const play_buton = document.getElementById("playBtn");
    const stop_button = document.getElementById("stopBtn");
    const play_backgr = document.getElementById("playBackgrBtn")
    const stop_backgr = document.getElementById("stopBackgrBtn")
    const convolution_amount = document.getElementById("rangeInput");

    play_buton.addEventListener("click", function () {
        voice.addEffect(convolver);
    });

    stop_button.addEventListener("click", function () {
        voice.removeEffect(convolver);
    });

    play_backgr.addEventListener("click", function () {
        church_background.play();
    });

    stop_backgr.addEventListener("click", function () {
        church_background.stop();
    });

    convolution_amount.addEventListener("change", function() {
        convolver.mix = (convolution_amount.value)/100;
        document.getElementById("amount").innerHTML = "Intensity : " +convolution_amount.value+"%";
    }, false);


    // Setting up the event listeners on the second convolver
    const play_buton2 = document.getElementById("playBtn2");
    const stop_button2 = document.getElementById("stopBtn2");
    const convolution_amount2 = document.getElementById("rangeInput2");
    const play_backgr2 = document.getElementById("playBackgrBtn2")
    const stop_backgr2 = document.getElementById("stopBackgrBtn2")

    play_buton2.addEventListener("click", function () {
        voice.addEffect(convolver2);
    });

    stop_button2.addEventListener("click", function () {
        voice.removeEffect(convolver2);
    });

    play_backgr2.addEventListener("click", function () {
        cave_background.play();
    });

    stop_backgr2.addEventListener("click", function () {
        cave_background.stop();
    });

    convolution_amount2.addEventListener("change", function() {
        convolver2.mix = (convolution_amount2.value)/100;
        document.getElementById("amount2").innerHTML =  "Intensity : " +convolution_amount2.value+"%";
    }, false);


    // Setting up a key press listener to get a change in color when pressed. 
    document.addEventListener('keypress', function() {
        wavesurfer.setWaveColor(getRandomColor());
        wavesurfer.params.barWidth = getRandomInt(30);
    });

}

// Two helper methods to get random colors and random integers 
function getRandomColor() {
    var r = getRandomInt(255);
    var g = getRandomInt(255);
    var b = getRandomInt(255);
    return "rgba("+r+","+g+","+b+",0.8)";
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

// A method to open the settings window
function openNav() {
    document.getElementById("mySidepanel").style.display = "block";
    document.getElementById("openbtn").style.display = "none";
}
  
// A method to close the settings window
function closeNav() {
    document.getElementById("mySidepanel").style.display = "none";
    document.getElementById("openbtn").style.display = "block";
}

window.onload = runAfterLoadingPage;