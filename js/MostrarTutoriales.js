$(document).ready(function(){
    var templateEntrada = Handlebars.compile($("#template-entrada").html());

    $.getJSON("/tuts.json", function(json){
        for (var i = 0; i < json.tuts.length; i++) {
            element = $(templateEntrada(json.tuts[i]));
            // do: element.
            $("#tutoriales").append(element);
        }
    });
});
