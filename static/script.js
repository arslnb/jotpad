var socket = io();
var Delta = Quill.import('delta');
var quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: 'Start typing here...'
});

$(document).ready(function() {
    var Id = document.getElementsByClassName("editor-holder")[0].attributes.id.value;
    var url = "/doc/" + Id;
    var jqxhr = $.get(url, function(response) {
        if(response['document'] != false){
            quill.setContents(response['document'], "silent")
        }
    })
})

socket.on('update', function(data){
    quill.updateContents(data.data, "silent")
});   

quill.on('text-change', function(delta) {
    var Id = document.getElementsByClassName("editor-holder")[0].attributes.id.value;
    socket.emit('modify', {
        "Id": Id,
        "delta": delta
    })
});