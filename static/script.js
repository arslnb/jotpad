var socket = io();
socket.emit('join', document.getElementsByClassName("editor-holder")[0].attributes.id.value);
var otClient = new ot.Client(0);

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

otClient.applyDelta = function(delta) {
    console.log('here')
    quill.updateContents(delta, 'silent');
}

otClient.sendDelta = function(version, delta) {
    var Id = document.getElementsByClassName("editor-holder")[0].attributes.id.value;
    socket.emit('modify', {
        "Id": Id,
        "delta": delta
    })
}

socket.on('update', function(delta){
    if(delta.author == socket.id){
        otClient.serverAck()
    }
    otClient.applyFromServer(delta.data);
});   

quill.on('text-change', function(delta, oldDelta, source) {
    console.log('done')
    if (source === 'user') {
        otClient.applyFromClient(delta);
    } 
});