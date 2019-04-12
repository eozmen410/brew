

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  
function initializeClock(id, endtime) {
    var clock = $("#"+id) //document.getElementById(id);
    var minutesSpan = $("#minutes")//clock.querySelector('.minutes');
    var secondsSpan = $("#seconds")//clock.querySelector('.seconds');
  
    function updateClock() {
      var t = getTimeRemaining(endtime);
      console.log(t)
  
      $(minutesSpan).html ('0' + t.minutes).slice(-2);
      console.log(minutesSpan)
      if(t.seconds<10) {
        $(secondsSpan).html('0' + t.seconds).slice(-2);
      } else {
        $(secondsSpan).html( t.seconds).slice(-2);
      }
  
      if (t.total <= 0) {
        clearInterval(timeinterval);
        alert('timer done!')
      }
    }
  
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

var step = 0  
var brew = data['AeroPress']
var images = brew['images']
var max_steps = brew['nb_steps']
$(document).ready(function(){

    console.log('ready')
    console.log(data)
    $("#timer_start").click(function(){
        console.log('starting timer')
        startTimer();
        
    })




    if (brew['timer'][step]=0) {
        $("#clockdiv").css('display', 'none')
    }
    updateStep()

    $("#nextBtn").click(function(){
        step++
        updateStep()
        updateBar()
        updateTimer()
    })
    $("#prevBtn").click(function(){
        step--;
        updateStep()
        updateBar()
        updateTimer()
    })
})

function startTimer() {
    var timeInMinutes = brew['timer'][step]//data['AeroPress']['timer'][step];
    console.log(timeInMinutes)
    var currentTime = Date.parse(new Date());
    var deadline = new Date(currentTime + timeInMinutes*60*1000);
    initializeClock('clockdiv', deadline);
}
function updateTimer(){
    var timeInMinutes = brew['timer'][step]//data['AeroPress']['timer'][step];
    console.log(timeInMinutes)
    var currentTime = Date.parse(new Date());
    var deadline = new Date(currentTime + timeInMinutes*60*1000);
    var t = getTimeRemaining(deadline);
    console.log(t)
    $("#minutes").html ('0' + t.minutes).slice(-2);
//   console.log(minutesSpan)
    if(t.seconds<10) {
    $("#seconds").html('0' + t.seconds).slice(-2);
    } else {
    $("#seconds").html( t.seconds).slice(-2);
    }
}
function updateStep() {
    $("#steps").html("Step "+ (step+1))
    $("#step_img").attr('src', images[step])
    if (brew['timer'][step]==0) {
        $("#clockdiv").css('display', 'none')
    } else {
        $("#clockdiv").css('display', 'inline-block')
    }
    if (step >= max_steps) {
        $("#nextBtn").attr('disabled', true)
    } else if (step <= 0) {
        $("#prevBtn").attr('disabled', true)
    } else {
        $("#nextBtn").attr('disabled', false)
        $("#prevBtn").attr('disabled', false)
    }

}


function updateBar() {
    
    var width = step / brew['nb_steps'] *100
    $("#p_bar").css('width', width + '%')
    
}