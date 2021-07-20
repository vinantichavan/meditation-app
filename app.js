
const app = () => {
 
    const play = document.querySelector('.play');
    const song = document.querySelector('.song');
    const video= document.querySelector('.vid-container video');
    const outline = document.querySelector('.moving-outline circle');
    const selectedDuration = 600; // By default

    // sounds 

    const sounds = document.querySelectorAll('sound-picker button');

    //time display

    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button') ;
    
    // get length of out-line circle 

    const length = outline.getTotalLength() ;
    console.log(length);

    
    outline.style.strokeDasharray = length;
    outline.style.strokeDashoffset = length;

    // play sounds

    play.addEventListener("click" , function()
        {   
            song.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            checkPlaying(song) ;
         
    
        });

    
    // Select time

    timeSelect.forEach(option => { 
        option.addEventListener( "click" , function(this)
        {
             selectedDuration = this.getAttribute("data-time");
        });

    });
    
    // create a function to check if music is paused

  function checkPlaying(song)
    {
          if(song.paused )
          {  
             song.play();
             video.play();
             play.src = "./svg/pause.svg" ;
             
          }

          else{
              song.pause() ;
              video.pause() ;
              play.src = "./svg/play.svg" ;
          }
    };

    // Animate the circle 


    song.ontimeupdate = function()
    {
        let currentTime = song.currentTime ;
        let elapsed = selectedDuration  - currentTime;
        let seconds = Math.floor(elapsed%60);
        let minutes = Math.floor(elapsed/60);

        let progress = length - (currentTime/selectedDuration ) * length ;
        outline.style.strokeDashoffset = progress;

        // Animate the text 

        timeDisplay.textContent = `${minutes}:${seconds}`;
    };

};

app() ;