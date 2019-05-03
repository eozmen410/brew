$(document).ready(function(){
    console.log('master quiz ready')
    console.log(quiz)
    shuffleArray(quiz)
   
    makeQuestion(q_nb)
    
    // $("#nextBtn").click(function(){
    //     q_nb++;
    //     makeQuestion(q_nb)
    // })

    // $("#prevBtn").click(function(){
    //     q_nb--;
    //     makeQuestion(q_nb);
    // })
})
 var answers = []
 var q_nb = 0;
function makeQuestion(nb) {
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
    $("#quiz-content").empty()
    console.log('checking answers')
    var checking = []
    var score = 0
    for(var i= 0; i <quiz.length; i++) {
        var q_row = $("<div class='q-row row'>")
        var question = $("<div class='question'>"+String(q_nb+1) +") " + quiz[i]['q']+ "</div>")
        // console.log(q)
        $(q_row).append(question)
        $(q_row).append("<div class='ans'> Your answer: " + answers[i] + "</div>")
        $(q_row).append("<div class='ans'> Correct answer: " + quiz[i]['a'] + "</div>")
        if (answers[i] == quiz[i]['a']){
            score++;
            $(q_row).css('background-color','rgba(45, 179, 45, 0.63)')
        } else {
            $(q_row).css('background-color','rgba(223, 51, 51, 0.582)')
        }
        $("#quiz-content").append(q_row)
    }
    $("#quiz-content").prepend("<div id='score'>You scored:" + parseInt(score/(q_nb+1)*100)+ "%</div>")
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