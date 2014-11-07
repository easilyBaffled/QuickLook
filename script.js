$('.generate').click(function(){
    var generated_template = $("<div />");
        var generated_template_name = $("<div />", {
            class: 'template_name',
            text: $('input').val()
        });
        generated_template.append(generated_template_name);

    var template_Y = $(".mobile_template").offset().top;
    var template_X = $(".mobile_template").offset().left;
    var id_list = []
    $("div[location='mobile_template']").each(function( index, element ) {
        var data_element = $(element);
        id_list.push('\"'+data_element.attr('id')+'\"');
        var relativeY = data_element.offset().top - template_Y;
        var relativeX = data_element.offset().left - template_X;
        var cloned_data = data_element.clone();
        cloned_data.css({
          'position': 'absolute',
          'top': (((relativeY - 2)/400)*100).toString() + '%',
          'left': (((relativeX - 2)/225)*100).toString() + '%'
        });
        generated_template.append(cloned_data)
    });
    $(".template_popup").css("visibility", "visible");
    $(".generated_html_container").text(generated_template.html())
    $(".generated_url_container").text(data_url)
    $(".generated_id_list_container").text(id_list)
});

function kimonoCallback(data) {
    var data_container = $(".data_container");
    var data_collections = data.results;
    $.each(data_collections, function(collection_name, collection_dataset){
        var collection_container = $('<div />', {
            class: 'collection_header',
            text: collection_name
        });
        for(var index = 0; index < collection_dataset.length; index++){
            $.each( collection_dataset[index], function( data_name, data_value ) {
              collection_container.append(
                "<div class='container "+data_name+"'>"+
                    "<div class='data' id="+data_name+" location='outside'>"+
                        "<h4>"+data_name+"</h4>"+
                        "<div>"+data_value+"</div>"+
                    "</div>"+
                "</div>"
                );
            });
            data_container.append(collection_container);
        }
    });
    $(".data").draggable({
                stop: function( event, ui ) {
                    if($(this).attr("location") == "outside"){
                       $(this).css({"top": "0", "left": "0"})
                    }
                }
            });
}


$('.mobile_template').droppable({
    over: function(ev, ui) {
        ui.draggable.attr("location", "mobile_template");
        $(ui.draggable).draggable({ grid: [20, 20] });
    },
    out: function(ev, ui) {
        ui.draggable.attr("location", "outside");
        $(ui.draggable).draggable({ grid: false });
    }
});


var data_url = ""
$('.api_button').click(function(){
    data_url = $('api_input').val() || "https://www.kimonolabs.com/api/dk0ihhf0?apikey=d753b0c5546495826e7aaa5422f59e30&callback=kimonoCallback";
    console.log(data_url);
    $.ajax({
    "url": data_url,
    "crossDomain":true,
    "dataType":"jsonp",
    });
});


