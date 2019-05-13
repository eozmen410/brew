$(document).ready(function(){
    console.log('mini master quiz ready')
    console.log(quiz)
    console.log(done)
    quiz = pickQs(quiz, done_names(done))
    if (quiz.length > 0) {
       $("#warn-msg").hide()
       shuffleArray(quiz)
       makeQuestion(q_nb)
    }
    console.log("QUIZ")
    console.log(quiz)
    
   

})

function done_names (done) {
    var ans = []
    for (var i=0; i<done.length; i++) {
        console.log(done[i])
        ans.push(done[i]['brew']['name'])
    }
    return ans;
}

function pickQs(q, done) {
    qs = []
    for (var i=0; i<q.length; i++){
        for (var j = 0; j<done.length; j++) {
            if ( q[i]['q'].includes(done[j]) || q[i]['a'].includes(done[j]) )
                qs.push(q[i])
        }
    }
    return qs;
}
 var answers = []
 var q_nb = 0;
function makeQuestion(nb) {
    var width = (nb+1) / quiz.length *100
    $("#p_bar").css('width', width + '%')
    $("#steps").html("Question " + String(nb+1) + " / " + String(quiz.length))
    var q = quiz[nb]['q']
    var a = quiz[nb]['a']
    var w = quiz[nb]['w']
    // w.push(a)
    console.log(w)
    shuffleArray(w)
    $("#quiz-content").empty()
    var q_row = $("<div class='q-row row'>")
    var question = $("<div class='question'>"+String(q_nb+1) +") " + q+ "</div>")
    console.log(q)
    $(q_row).append(question)
    var opt = $("<div>")
    for (var i=0; i<w.length; i++) {
        var choice = $("<button class='m-choice btn btn-info'>"+ w[i] + "</button>")
        $(choice).data('value',w[i])
        $(choice).click(function(){
            console.log('clicked'+ $(this).data('value'))
            answers[nb] = $(this).data('value')
            console.log(answers)
            q_nb++
            if (q_nb < quiz.length){
                makeQuestion(q_nb)
            } else {
                console.log('checking answers')
                $("#quiz-content").empty()
                // q_nb--
                checkAnswers()
            }
        })
        $(opt).append(choice)
    }
    $(q_row).append(opt)
    $("#quiz-content").append(q_row)

}


function shuffleArray(array) {
    console.log(array)
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


function checkAnswers() {
    $("#progress").hide()
    $("#steps").hide()
    $("#quiz-content").empty()
    console.log('checking answers')
    var checking = []
    var score = 0
    for(var i= 0; i <quiz.length; i++) {
        var q_row = $("<div class='q-row row'>")
        var question = $("<div class='question'>"+String(i+1) +") " + quiz[i]['q']+ "</div>")
        // console.log(q)
        $(q_row).append(question)
        $(q_row).append("<div class='ans'> Your answer: " + answers[i] + "</div>")
        // $(q_row).append("<div class='ans'> Correct answer: " + quiz[i]['a'] + "</div>")
        if (answers[i] == quiz[i]['a']){
            score++;
            $(q_row).css('background-color','rgba(45, 179, 45, 0.63)')
        } else {
            $(q_row).css('background-color','rgba(223, 51, 51, 0.582)')
        }
        $("#quiz-content").append(q_row)
    }
    $("#quiz-content").prepend("<div id='score'>You scored:" + parseInt(score/(q_nb)*100)+ "% <br> <a style='margin-right:10px;'class='btn btn-info choose' href='/wish_list'>Keep Learning Other Methods!</a><a class='btn btn-primary choose' href='/mini_quiz'>Start Over     <span class='glyphicon glyphicon-repeat'></span></a></div>")
}


function makeQuestions() {
    console.log('making questions')
    for (var i=0; i<quiz.length; i++ ) {
        var q = quiz[i]['q']
        var a = quiz[i]['a']
        var w = quiz[i]['w']
        w.push(a)
        shuffleArray(w)
        var q_row = $("<div class='q-row row'>")
        var question = $("<div class='question'>"+String(i+1) +") " + q+ "</div>")
        console.log(q)
        $(q_row).append(question)
        var opt = $("<div class='m-choice'>")
        for (var i=0; i<w.length; i++) {
            var lbl = $("<label>"+  w[i]+"</label>")
            var choice = $("<input>")
            $(choice).attr('type', 'radio')
            $(choice).attr('name', w[i])
            if (w[i]== a) {
                $(choice).val('true')
            } else {
                $(choice).val('false')
            }
            $(lbl).prepend(choice)
            $(opt).append(lbl)
        }
        $(q_row).append(opt)
        $("#quiz-content").append(q_row)
    }
}