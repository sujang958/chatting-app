var urlParams = new URLSearchParams(window.location.search);
var socket = io()
var id_scope = {}
var i = 0


socket.on('cnt', data => {
    id_scope.a = data
});

socket.on('send_msg', data => {
    if (i == 0) {
        $('ol.chat').children('.system_msg').remove()
    }
    if (data.room_id == urlParams.get('id')) {
        you2meAddMessage(data.msg, data.user_id)
    }
})


$(".back").click(() => {
    location.href = '/';
})

$(".room_name").html(urlParams.get('id'))

$(".textarea").on('keydown', e => {
    if (e.key == 'Enter' && $('.textarea').val() != '') {
        emitMessage()
    }
})

$(".send").on('click', () => {
    if ($('.textarea').val() != '') emitMessage()
})



function emitMessage() {
    socket.emit('send', {
        room_id: urlParams.get('id'),
        msg: $('.textarea').val(),
        user_id: id_scope.a
    })

    $('.textarea').val('')
}

function you2meAddMessage(message, user_id) {
    $('ol.chat').append(`<li class="other">
        <div class="msg">
            <p id="user_name"><b>${user_id}</b></p>
            <p>${message}</p>
        </div>
    </li>`)
}

// function addMessage() {
//     if ($('.textarea').val() != '') {
//         $('ol.chat').append(`<li class="self">
//         <div class="msg">
//             <p>${$('.textarea').val()}</p>
//         </div>
//     </li>`)
//     }
// }