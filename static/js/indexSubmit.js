$(".submit").on("click", () => {
    var inputVal = $('input#id').val() + ""
    if (inputVal != "" && inputval.replace(/^\s+|\s+$/g, "") != "") {
        location.href = `/chat?id=${$('input#id').val()}`;
    } else {
        $("#error").modal({
            escapeClose: true,
            clickClose: true,
            showClose: true
        });
    }
})

$(document).on('keydown', e => {
    if (e.key == "Enter") {
        var inputVal = $('input#id').val() + ""
        if (inputVal != "" && inputVal.replace(/^\s+|\s+$/g, "") != "") {
            location.href = `/chat?id=${$('input#id').val()}`;
        } else {
            $("#error").modal({
                escapeClose: true,
                clickClose: true,
                showClose: true
            });
        }
    }
})