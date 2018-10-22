let socket = io.connect('localhost:3000');

let commandLineLog = [];
let path = 'C:/Home>';


/* TERMINAL FUNCTIONALITY */

$('document').ready(function () {
    /* https://stackoverflow.com/questions/3758023/how-to-use-this-square-cursor-in-a-html-input-field */
    let cursor;
    setCursorInterval();

    $('#cmd').click(function (cursor) {
        setCursorInterval(cursor);
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
            await render(data);

            let displayPath = await replaceAll(path, '/', '\\');

            $('#command-line').removeAttr('id');
            $("</br><span></span>").html("" + displayPath + "").insertBefore("#cursor");
            $("<span id='command-line'></span>").insertBefore("#cursor");
            $('#the-input').val("");
            $('#command-line').text("");
            cmdScrollToBottom();

        } else {
            $('#command-line').text($(this).val());
        }
    });

    $('#the-input').blur(function () {
        clearCursorInterval();
    });

    function setCursorInterval() {

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
    }

    function clearCursorInterval() {
        clearInterval(cursor);
        $('#cursor').css({
            visibility: 'visible'
        });
    }

    /* UTILITY FUNCTIONS */
    async function render(data) {
        // CHECK FOR NULL IN DATA
        if(data !== null) {
            if('text' in data) {
                $("</br>").html("").insertBefore("#cursor");
                for(let index of data.text) {
                    $("</br><span></span>").html("" + index + "").insertBefore("#cursor");
                }
                $("</br>").html("").insertBefore("#cursor");
            }

            if('path' in data) {
                if(data.path !== null) {
                    path = data.path;
                }
            }
        } else {
            // Invalid Action
            $("</br>").html("").insertBefore("#cursor");
            $("</br><span></span>").html("Invalid command entered").insertBefore("#cursor");
            $("</br>").html("").insertBefore("#cursor");
        }
    }
});
/* end code snippet */

// https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function checkCommand() {
    return new Promise(async function (resolve) {
        let commandEntry;

        try {
            commandEntry = commandLineLog[commandLineLog.length - 1].split(' ');
        } catch(err) {
            console.log(err);
        }

        socket.emit('entryRequest', commandEntry, path);
        await socket.on('entryResponse', function (data) {
            // console.log(data);
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


/* SOCKET EVENTS */

socket.on('test', function(){
    console.log('test successful');
});