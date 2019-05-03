$(document).ready(function(){
    console.log(brew)
    console.log(data)
    loadPage()
    $("#method").html(brew['name'])
    $("#lvl").html("Skill Level: " + brew['lvl'])
    $("#time").html("Brew time: " + brew['time'])
})

function loadPage() {
    $("#method").html(brew['name']);
    $("#step_img").attr('src', brew['images'][brew['images'].length-1])
    $("#bck").append(brew['background'])
    for(var i=0; i< brew['materials'].length; i++){
        var m = brew['materials'][i]
        $("#mtr").append("<div> - " + m + "</div>")
    }
    

}