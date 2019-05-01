$(document).ready(function(){
    console.log('ready')
    loadWish()
    loadDone()
    console.log(data)
    console.log(wish_list)
    console.log(done_list)
})

function loadWish() {
    $("#wish_list").empty()
    for(var i=0; i< wish_list.length; i++) {
        var name = wish_list[i]
        var row = $("<div>")
        // $(row).addClass('row')
        $(row).addClass('row item')
        var img = $("<img class='image col-md-5'>")
        $(img).attr('src', data[name]['images'][data[name]['images'].length-1])
        $(row).append(img)
        var col1 = $("<div class='col-md-4'>")
        var m_name = $("<a href='coffee/"+name+"' class='name'>")
        $(m_name).html(name)
        $(col1).append(m_name)
        $(col1).append("<div class='lvl'>Skill Level: "+ data[name]['lvl']+"</div>")
        $(col1).append("<div class='time'>Brew Time: "+ data[name]['time']+"</div>")
        var col2 = $("<div class='col-md-3'>")
        var form = $("<form>")
        // $(form).css('display', 'inline')
		$(form).attr('action','/coffee/' + name)
		$(form).attr('method', 'get')
        $(form).data('value', data[name])
        
        var newConcept= $("<button class='btn btn-info wlist-btns'>")
        $(newConcept).html('View Instructions')
        $(form).append(newConcept)
        $(col2).append(form)
        

        var qform = $("<form>")
        // $(qform).css('display', 'inline')
		$(qform).attr('action','/quiz/' + name)
		$(qform).attr('method', 'get')
        $(qform).data('value', data[name])
        var quizbtn = $("<button class='btn btn-warning wlist-btns'>")
        $(quizbtn).html('Take the Quiz!')
        $(qform).append(quizbtn)
        $(col2).append(qform)


        
        var rmvBtn = $('<button class=\"remBtn wlist-btns btn btn-danger\">Remove   <span class=\"remBtn glyphicon glyphicon-minus \"></span></button>')
        $(rmvBtn).data('value', name)
        $(rmvBtn).click(function(){
            removeWish($(this).data('value'))
        })
        $(col2).append(rmvBtn)
        $(row).append(col1)
        $(row).append(col2)
        $("#wish_list").append(row)
    }
}

function loadDone(){
    $("#done_list").empty()
    for(var i=0; i< done_list.length; i++) {
        var name = done_list[i]['brew']['name']
        var row = $("<div>")
        
        $(row).addClass('row item')
        var img = $("<img class='image col-md-5'>")
        $(img).attr('src', data[name]['images'][data[name]['images'].length-1])
        $(row).append(img)
        var col1 = $("<div class='col-md-4'>")
        var m_name = $("<a href='coffee/"+name+"' class='name'>")
        $(m_name).html(name)
        $(col1).append(m_name)

        var col2 = $("<div class='col-md-3'>")
        var form = $("<form>")
        // $(form).css('display', 'inline')
		$(form).attr('action','/coffee/' + name)
		$(form).attr('method', 'get')
        $(form).data('value', data[name])
        
        var newConcept= $("<button class='btn btn-info wlist-btns'>")
        $(newConcept).html('View Instructions')
        $(form).append(newConcept)
        
        

        var qform = $("<form>")
        // $(qform).css('display', 'inline')
		$(qform).attr('action','/quiz/' + name)
		$(qform).attr('method', 'get')
        $(qform).data('value', data[name])
        var quizbtn = $("<button class='btn btn-warning wlist-btns'>")
        $(quizbtn).html('Retake Quiz!')
        $(qform).append(quizbtn)
        $(col2).append(qform)
        $(col2).append(form)
        var rating = parseInt(done_list[i]['rating'])
    
        $(col1).append("Your score: " + rating + '%')
        make_bar(rating, col1)
        $(row).append(col1)
        $(row).append(col2)
        
        $("#done_list").append(row)

        
    }
}

function make_bar (rating, div) {
    var bar = $("<div class='progress'>")
    var p = $("<div>")
    $(p).css('width', rating + '%')
    $(p).css('height', 'inherit')
    $(p).css('border', '15px;')
    var color;
    if (rating>70) {
        color = 'green'
    } else if (rating>40) {
        color = 'orange'
    } else if (rating>15) {
        color = 'yellow'
    } else {
        color = 'red'
    }
    $(p).css('background-color', color)
    $(bar).append(p)

    $(div).append(bar)
}

function removeWish(brew_m) {
    $.ajax({
        type: 'POST',
        url: 'remove_wish',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(brew_m),
        success: function(result){
            wish_list= result['wish_list']
            console.log(wish_list)
            loadWish()
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
}

