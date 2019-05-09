$(document).ready(function(){
    console.log(brew)
    console.log(data)
    loadPage()
    $("#method").html(brew['name'])
    $("#lvl").html("Skill Level: " + brew['lvl'])
    $("#time").html("Brew time: " + brew['time'])
})

function loadPage() {
    $("#method").empty()
    $("#bck").empty()
    $("#mtr").empty()
    $("#trns").empty()
    $("#trns").html(" <form action=\"/coffee/"+ brew['name']+"\" method=\"get\" id=\"form1\"><button class= 'btn btn-info'> View Instructions <span class='glyphicon glyphicon-list-alt'></span> </button></form>")
    // $("#bck").append("<h2>Background:</h2>")
    // $("#")
    var key = brew['name']
    $("#method").html(brew['name']);
    $("#step_img").attr('src', brew['images'][brew['images'].length-1])
    $("#bck").append(brew['background'])
    for(var i=0; i< brew['materials'].length; i++){
        var m = brew['materials'][i]
        $("#mtr").append("<div> - " + m + "</div>")
    }
    if (wish_list.includes(key)) {
        btn = $('<button class=\"btn btn-danger\"> <span class=\" glyphicon glyphicon-minus\"></span></button>')
        $(btn).click(function(){
            removeWish(key)
        })
    } else {
        btn = $('<button class=\"btn btn-success\"> <span class=\" glyphicon glyphicon-plus\"></span></button>')
        $(btn).click(function(){
            addToWishList(key)
        })
    }
    $("#trns").append(btn)
    

}

function addToWishList(brew_m) {
    $.ajax({
        type: 'POST',
        url: '../add_wish',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(brew_m),
        success: function(result){
            wish_list= result['wish_list']
            console.log(wish_list)
        //    location.reload()
            loadPage()
            // updateCount(wish_list.length)
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
        url: '../remove_wish',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(brew_m),
        success: function(result){
            wish_list= result['wish_list']
            console.log(wish_list)
            // location.reload()
            loadPage()
            // updateCount(wish_list.length)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
}