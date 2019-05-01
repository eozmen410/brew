$(document).ready(function(){
    console.log('ready')
    console.log(data)
    loadButtons()
    updateCount(wish_list.length)
})
function updateCount(count) {
    $("#count").html(count)
}

function loadButtons() {
    $("#list").empty()
    Object.keys(data).forEach(function(key, value) {
        var name = key
        var row = $("<div>")
        $(row).addClass('row item')
        var img = $("<img class='image col-md-5'>")
        console.log(value)
        console.log(key)
        $(img).attr('src', data[key]['images'][data[key]['images'].length-1])
        $(row).append(img)
        var col = $("<div class='col-md-7'>")
        var name = $("<a href='coffee/"+key+"' class='name'>")
        $(name).html(key)
        $(col).append(name)
        
        $(col).append("<div class='lvl'>Skill Level: "+ data[key]['lvl']+"</div>")
        $(col).append("<div class='time'>Brew Time: "+ data[key]['time']+"</div>")

        var btn; 
        if (wish_list.includes(key)) {
            btn = $('<button class=\"btn btn-dark remBtn\"> <span class=\" glyphicon glyphicon-minus\"></span></button>')
            $(btn).click(function(){
                removeWish(key)
            })
        } else {
            btn = $('<button class=\"btn btn-dark addBtn\"> <span class=\" glyphicon glyphicon-plus\"></span></button>')
            $(btn).click(function(){
                addToWishList(key)
    
            })
        }
        $(row).append(col)
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
            loadButtons()
            updateCount(wish_list.length)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
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
            updateCount(wish_list.length)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
}