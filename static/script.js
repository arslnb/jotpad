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

quill.on('text-change', function(delta) {
    var xhr = new XMLHttpRequest();
    var Id = document.getElementsByClassName("editor-holder")[0].attributes.id.value;
    var url = "/jot/" + Id;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
        }
    };
    var data = JSON.stringify(delta);
    xhr.send(data);
});
