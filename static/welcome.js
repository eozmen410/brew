$(document).ready(function(){
    console.log('ready')
    loadButtons()
    console.log(data)
})

function loadButtons() {
    Object.keys(data).forEach(function(key, value) {
        var name = key
        var row = $("<div>")
		$(row).addClass('row')
        var form = $("<form>")
        $(form).css('display', 'inline')
		$(form).attr('action','/coffee/' + name)
		$(form).attr('method', 'get')
        $(form).attr('value', value)
        
        var newConcept= $("<button class='btn btn-dark homeBtn'>")
        $(newConcept).html(name)
        $(form).append(newConcept)
        
        $(row).append(form)
        var addBtn = $('<button>Add To Wish List    <span class=\"addBtn glyphicon glyphicon-plus\"></span></button>')
        $(addBtn).click(function(){
            addToWishList(key)
        })
        $(row).append(addBtn)
		
        $("#list").append(row)
    })
}

function addToWishList(brew_m) {
    $.ajax({
        type: 'POST',
        url: 'add_wish',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(brew_m),
        success: function(result){
            wish_list= result['wish_list']
            console.log(wish_list)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
}