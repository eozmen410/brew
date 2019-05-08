$(document).ready(function(){
    console.log('ready')
    console.log(data)
    loadButtons()
    updateCount(wish_list.length)
    // $("#"+ 1).show()
})
function updateCount(count) {
    $("#count").html(count)
}

function loadButtons() {
    $("#list").empty()
    $("#side").empty()
    var i = 0;
    Object.keys(data).forEach(function(key, value) {
        var name = key
        var row = $("<div id='r_"+i+"'>")
        $(row).addClass('row item')
        $(row).data('val', i)
        var img = $("<img class='image col-md-5' >")
        console.log(value)
        console.log(key)
        $(img).attr('src', data[key]['images'][data[key]['images'].length-1])
        $(row).append(img)
        var col = $("<div class='col-md-7'>")
        var name = $("<a href='outline/"+key+"' class='name'>")
        // console.log(name)
        $(name).html(key)
        $(col).append(name)
        
        $(col).append("<div class='lvl'>Skill Level: "+ data[key]['lvl']+"</div>")
        $(col).append("<div class='time'>Brew Time: "+ data[key]['time']+"</div>")

        var btn; 
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
        $(row).append(col)
        $(row).append(btn)
        //make the div that's gonna appear on hover
        var hov = $("<div class='outline' id='"+i+"'>")
        $(hov).append("<div class='row'>"+ name + "</div>")
        $(hov).html(data[key]['materials'])
        $("#side").append(hov)
        $("#"+ i).hide()
        // $("#"+ i).css('display','none')

        $("#list").append(row)
        $("#r_"+i).mouseover(function() {
            // console.log('hovering!')
            var x = $(this).data("val")
            $("#" + x).show()
        }).mouseout(function(){
            // console.log('hover out')
            var x = $(this).data("val")
            if($("#"+ x).is(":visible")){
                $( "#"+ x).hide();
           }
        })
        
        i++;
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