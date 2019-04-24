$(document).ready(function(){
    console.log('ready')
    loadButtons()
    console.log(data)
})

function loadButtons() {
    $("#list").empty()
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
        var btn; 
        if (wish_list.includes(key)) {
            btn = $('<button>Remove   <span class=\"remBtn glyphicon glyphicon-minus\"></span></button>')
            $(btn).click(function(){
                removeWish(key)
            })
        } else {
            btn = $('<button>Add To Wish List    <span class=\"addBtn glyphicon glyphicon-plus\"></span></button>')
            $(btn).click(function(){
                addToWishList(key)
    
            })
        }

        // var addBtn = $('<button>Add To Wish List    <span class=\"addBtn glyphicon glyphicon-plus\"></span></button>')
        // $(addBtn).attr('id', "btn_"+key.splice(' ').join('_'))
        // $(addBtn).click(function(){
        //     addToWishList(key)

        // })
        $(row).append(btn)
		
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
            // var btn = $("#btn_"+brew_m.splice(' ').join('_'))
            // makeRemove(btn, brew_m)
            loadButtons()
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
}

function makeRemove(btn) {
    $(btn).html("Remove   <span class=\"remBtn glyphicon glyphicon-minus\"></span>")
    $(btn).click(function(){
        removeWish(brew_m)
    })
}
//var rmvBtn = $('<button>Remove   <span class=\"remBtn glyphicon glyphicon-minus\"></span></button>')
  
function makeAdd(btn) {

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
            loadButtons()
            
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
}