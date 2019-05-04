$(document).ready(function(){
    console.log('ready')
    console.log(brew)
    var shuffled = makeArray(brew['images'], brew['qs'])
    console.log(shuffled)
    shuffleArray(shuffled)
    populate(shuffled)
    console.log(brew)
    console.log(shuffled)
    $("#check_btn").click(function(){
        check()
    })
});

var answers = []

function makeArray (images, qs) {
    var arr = []
    for (var i=0; i<images.length; i++){
        var item = {'image': images[i], 'q': qs[i], 'index': i}
        arr.push(item)
    }
    return arr
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

function populate(arr) {
    console.log('populating')
    for (var i=0;i<arr.length;i++) {
        answers[i] = false;
        //make draggable div
        //make droppable div
        var row = $("<div>")
        $(row).addClass('row item')
        var img = $("<img class='image col-md-5'>")
        // var img = $("<img class='image'>")
        $(img).attr('src', arr[i]['image'])
        $(row).append(img)
        var col = $("<div class='col-md-7'>")
        $(col).html("<span class='steps'>" + arr[i]['q']+ "</span>")
        $(row).append(col)
        
        $(row).data('value', arr[i]['index'])
        $(row).data('src', arr[i]['image'])
        $(row).data('position', i)
        $(row).draggable({
            refreshPositions: true,
            drag: function(event, ui) {
                $(this).addClass('dragging')
            },
            revert : function(event, ui) {
                if (!event) {
                $(this).removeClass('dragging');
                $(this).removeClass('invisible')
                } 
                if (event) {
                    $(this).addClass('invisible')
                }
               return !event;
           },
           
        })
        // $( ".selector" ).draggable( "option", "revert", "invalid" );
        $("#drag-div").append(row)


        //make droppable
        var drow = $("<div id='"+i+"'>")
        $(drow).addClass('row item')
        $(drow).append("<span class='steps'>"+(i+1)+"</span>")
        // $(drow).append("<img class='image col-md-5' id='"+i+"_image'>")
        $(drow).data('i', i)
        $(drow).droppable({
            drop: function(event, ui){
                // console.log(ui)
                // $(ui.draggable).addClass('invisible')
                var src = $(ui.draggable).data('src')
                var index = $(ui.draggable).data('value')
                console.log('dropped')
                // console.log(index)
                var id_img = $(this).data('i')
                // $("#"+ id_img + "_image").attr('src', src)
                $(this).append("<img class='image col-md-5' src='"+src+"'>")
                var col_d = $("<div class='col-md-6'>")
                console.log('id_img' + id_img)
                console.log(arr);
                var position = $(ui.draggable).data('position')
                $(col_d).html("<span class='steps'>" + arr[position]['q']+ "</span>")
                $(this).append(col_d)
                if (index == id_img){
                    answers[id_img] = true
                }
                $(this).droppable("disable")
            }
        })
        $("#drop-div").append(drow)
    }
}

function check(){
    console.log('checking answers')
    console.log(answers)
    var score = 0
    for (var i=0; i< answers.length; i++) {
        $("#"+i).addClass('checked')
        if (answers[i]){
            score++;
            $("#"+i).css('background-color','rgba(45, 179, 45, 0.63)')
        } else {
            $("#"+i).css('background-color','rgba(223, 51, 51, 0.582)')
        }
    }
    var score_p = (score/answers.length)*100
    console.log(score_p)
    saveRating(parseInt(score_p))
    $("#score").empty()
    $("#score").append("You scored: " +score_p + "%")
    $("#score").append("<br><span class='bck-msg'>Go back to <a href='/wish_list'>your lists</a> to keep learning or to take different quizzes!</span>")
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