$(document).ready(function(){
    console.log('ready')
    console.log(data)
    loadButtons()
    
})

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
        // var form = $("<form>")
        // $(form).css('display', 'inline')
		// $(form).attr('action','/coffee/' + name)
		// $(form).attr('method', 'get')
        // $(form).attr('value', value)
        // var newConcept= $("<button class='btn btn-dark homeBtn'>")
        // $(newConcept).html(name)
        // $(form).append(newConcept)
        // $(row).append(form)




        ///////////////////////////////////////////////////////////////
        // var result_div = $("<div class='row result'>")
        // var img = $("<img class='image col-md-5'>")
        // $(img).attr('src', results[i]['image'])
        // $(result_div).append(img)
        // $(result_div).append("<br>")
        // //image name member origin
        // var col = $("<div class='col-md-7'>")
        // var name = $("<a href='../view_item/"+results[i]['id']+"' class='name'>")
        // $(name).html(results[i]['name'])
        // $(col).append(name)
        // // $(result_div).append("<br>")
        // var members =$("<div class='info'>")
        // $(members).append("<span class='label'>Members: </span>")
        // $(members).append(results[i]['members'].toString())
        // $(col).append(members)
        // // $(result_div).append("<br>")
        // var origin = $("<div class='origin'>")
        // $(origin).html(results[i]['origin'])
        // $(col).append(origin)
        // $(result_div).append(col)
        ////////////////////////////////////////////////////////////

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
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    })
}