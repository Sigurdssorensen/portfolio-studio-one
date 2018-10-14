let socket = io.connect('localhost:3000');


let commandLineLog = [];
let path = 'C:\\HOME\\>';

socket.on('test', function(){
   console.log('test successful');
});

/* https://stackoverflow.com/questions/3758023/how-to-use-this-square-cursor-in-a-html-input-field */
$('document').ready(function () {

    let cursor;
    $('#cmd').click(function () {
        $('#the-input').focus();
        cursor = window.setInterval(function () {
            if ($('#cursor').css('visibility') === 'visible') {
                $('#cursor').css({
                    visibility: 'hidden'
                });
            } else {
                $('#cursor').css({
                    visibility: 'visible'
                });
            }
        }, 500);
    });

    $('#the-input').keydown(function (e) {
        let code = e.keyCode || e.which;
        if (code === 37 || code === 38 || code === 39 || code === 40) {
            e.preventDefault()
        }
    });

    $('#the-input').keyup(async function (e) {
        let code = e.keyCode || e.which;

        if (code === 13) { //Enter keycode
            commandLineLog.push($('#command-line').text());
            // run checkCommand function
            let data = await checkCommand();
            $("</br></br><span></span></br>").html("" + data + "").insertBefore("#cursor");

            $('#command-line').removeAttr('id');
            $("</br><span></span>").html("" + path + "").insertBefore("#cursor");
            $("<span id='command-line'></span>").insertBefore("#cursor");
            $('#the-input').val("");
            $('#command-line').text("");
            cmdScrollToBottom();

        } else {
            $('#command-line').text($(this).val());
        }
    });

    $('#the-input').blur(function () {
        clearInterval(cursor);
        $('#cursor').css({
            visibility: 'visible'
        });
    });
});
/* end code snippet */

function checkCommand() {
    return new Promise(async function (resolve) {
        let commandEntry = commandLineLog[commandLineLog.length - 1];
        let output = '';
        socket.emit('entryRequest', commandEntry);
        await socket.on('entryResponse', function (data) {
            console.log(data);
            resolve(data);
            // print to cmd
        });
    });
}



function cmdScrollToBottom() {
    /* Scrolls the command window of player one down to the bottom.*/

    /* The code snippet (4. Scroll to bottom of div?) below has been altered from:
    https://stackoverflow.com/questions/270612/scroll-to-bottom-of-div
    The variables calling the scrollTop has been altered from the original example.
    */

    $('#cmd').scrollTop = $('#cmd').scrollHeight - $('#cmd').clientHeight;
}
