var socket = io();
socket.emit('join', document.getElementsByClassName("editor-holder")[0].attributes.id.value);
var otClient = new ot.Client(0);

var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    ['clean'],                                     // remove formatting button,
    ['formula']
  ];

var Delta = Quill.import('delta');
var quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: 'Start typing here...',
    modules: {
        formula: true,          // Include formula module
        toolbar: toolbarOptions  // Include button in toolbar
    }
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
    } else {
        otClient.applyFromServer(delta.data);
    }
});   

quill.on('text-change', function(delta, oldDelta, source) {
    if (source === 'user') {
        otClient.applyFromClient(delta);
    } 
});