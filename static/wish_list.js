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
		$(row).addClass('row')
        var form = $("<form>")
        $(form).css('display', 'inline')
		$(form).attr('action','/coffee/' + name)
		$(form).attr('method', 'get')
        $(form).data('value', data[name])
        
        var newConcept= $("<button class='btn btn-dark homeBtn'>")
        $(newConcept).html(name)
        $(form).append(newConcept)
        
        $(row).append(form)
        var rmvBtn = $('<button>Remove   <span class=\"remBtn glyphicon glyphicon-minus\"></span></button>')
        $(rmvBtn).data('value', name)
        $(rmvBtn).click(function(){
            removeWish($(this).data('value'))
        })
        $(row).append(rmvBtn)
        // $(newConcept).hover(function() {
        //     $( this ).addClass( "hover" );
        //   }, function() {
        //     $( this ).removeClass( "hover" );
        //   }
        // );
		//svar rateBtn = $$('<button>Rate   <span class=\"remBtn glyphicon glyphicon-minus\"></span></button>')
        $("#wish_list").append(row)
    }
}

function loadDone(){
    $("#done_list").empty()
    for(var i=0; i< done_list.length; i++) {
        var name = done_list[i]['brew']['name']
        var row = $("<div>")
		$(row).addClass('row')
        var form = $("<form>")
        $(form).css('display', 'inline')
		$(form).attr('action','/coffee/' + name)
		$(form).attr('method', 'get')
        $(form).data('value', data[name])
        
        var newConcept= $("<button class='btn btn-info doneBtn'>")
        $(newConcept).html(name)
        $(form).append(newConcept)
        
        $(row).append(form)
        var rating = done_list[i]['rating']
        $(row).append("Your rating:" + rating + '/5')
        $("#done_list").append(row)
    }
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

