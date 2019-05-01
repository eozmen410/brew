

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
var timeinterval
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
        $("#timer_start").attr('disabled',false)
        $("#timer_stop").attr('disabled',true)
        alert('timer done!')
      }
    }
  
    updateClock();
    timeinterval = setInterval(updateClock, 1000);
}

var step = 0  
// var brew = data['AeroPress']
var images = brew['images']
var max_steps = brew['nb_steps']
$(document).ready(function(){

    console.log('ready')
    console.log(data)
    $("#timer_start").click(function(){
        console.log('starting timer')
        startTimer();
        $("#timer_start").attr('disabled',true)
        $("#timer_stop").attr('disabled',false)

    })

    $("#timer_stop").click(function(){
        clearInterval(timeinterval)
        $("#timer_start").attr('disabled',false)
        $("#timer_stop").attr('disabled',true)
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

     /* 1. Visualizing things on Hover - See next part for action on click */
  $('#stars li').on('mouseover', function(){
    var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
   
    // Now highlight all the stars that's not after the current hovered star
    $(this).parent().children('li.star').each(function(e){
      if (e < onStar) {
        $(this).addClass('hover');
      }
      else {
        $(this).removeClass('hover');
      }
    });
    
  }).on('mouseout', function(){
    $(this).parent().children('li.star').each(function(e){
      $(this).removeClass('hover');
    });
  });
  
  
  /* 2. Action to perform on click */
  $('#stars li').on('click', function(){
    var onStar = parseInt($(this).data('value'), 10); // The star currently selected
    var stars = $(this).parent().children('li.star');
    
    for (i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass('selected');
    }
    
    for (i = 0; i < onStar; i++) {
      $(stars[i]).addClass('selected');
    }
    
    // JUST RESPONSE (Not needed)
    var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
    saveRating(ratingValue)
  });


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
    // $("#steps").html("Step "+ (step+1))
    // $("#step_img").attr('src', images[step])
    $("#expl").empty()
    $("#steps").html("Step "+ (step+1))
    $("#step_img").attr('src', images[step])
    $("#expl").append(brew['explanations'][step])
    if (brew['timer'][step]==0) {
        $("#clockdiv").css('display', 'none')
    } else {
        $("#clockdiv").css('display', 'inline-block')
    }
    if (step >= max_steps) {
        $("#nextBtn").attr('disabled', true)
        addRateBtn()
    } else if (step <= 0) {
        $("#prevBtn").attr('disabled', true)
        $("#stardiv").addClass('invisible')
    } else if (step +1 == max_steps){
      $("#step_img").attr('src', './images/coffee.jpg')
      addRateBtn()
    } else {
        $("#nextBtn").attr('disabled', false)
        $("#prevBtn").attr('disabled', false)
        $("#stardiv").addClass('invisible')
        
    }

}
function addRateBtn() {
    $("#stardiv").removeClass('invisible')
}

function updateBar() {
    
    var width = step / brew['nb_steps'] *100
    $("#p_bar").css('width', width + '%')
    
}

function saveRating(ratingValue) {
    console.log(ratingValue)
    var saving = {
        'brew': brew,
        'rating': ratingValue
    }
    $.ajax({
        type: 'POST',
        url: '../add_done',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(saving),
        success: function(result){
            done_list= result['done_list']
            console.log(done_list)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
}