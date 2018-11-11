let socket = io.connect('localhost:3000');

// not yet in use
socket.commandLineLog = [];
socket.path = 'C:/Home>';
socket.cssIdOPaths = ['portfolio', 'minerminer', 'about'];
socket.firstHelp = true;
socket.firstDir = true;
socket.firstCd = true;
// not yet in use

// Refactor from this to socket above
let commandLineLog = [];
let path = 'C:/Home>';
let cssIdOPaths = ['portfolio', 'minerminer', 'about'];
let firstHelp = true;
let firstDir = true;
let firstCd = true;
let firstStart = true;


/* TERMINAL FUNCTIONALITY */

$('document').ready(function () {
    /* The code snippet (1. How to use this square cursor in a HTML input field?) below has been adapted from:
   https://stackoverflow.com/questions/3758023/how-to-use-this-square-cursor-in-a-html-input-field
   The code has been altered to fit the specific needs of this website.
   */
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
            $("<br><span></span>").html("" + displayPath + "").insertBefore("#cursor");
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

    /*
    * End code snippet (1.How to use this square cursor in a HTML input field?)
    */

    /* UTILITY FUNCTIONS */
    async function render(data) {
        // CHECK FOR NULL IN DATA
        if(data !== null) {
            if('text' in data) {
                $("<br>").html("").insertBefore("#cursor");
                for(let index of data.text) {
                    $("<br><span></span>").html("" + index + "").insertBefore("#cursor");
                }
                $("<br>").html("").insertBefore("#cursor");
            }

            if('help' in data) {
                if(firstHelp) {
                    $("<br>").html("").insertBefore("#cursor");
                    $("<span></span><br>").html("Try the 'dir' command").insertBefore("#cursor");
                    firstHelp = false;
                }
            }

            if('dir' in data) {
                if(firstDir) {
                    $("<br><span></span><br>").html("Try typing 'cd' + 'dir name' command").insertBefore("#cursor");
                    firstDir = false;
                }
            }

            if('cd' in data) {
                if(firstCd) {
                    $("<br><br><span></span><br>").html("Use 'dir' to see all files").insertBefore("#cursor");
                    $("<span></span><br>").html("followed by 'start' + 'file name'").insertBefore("#cursor");
                    firstCd = false;
                }
            }

            if('path' in data) {
                if(data.path !== null) {
                    path = data.path;
                }
            }
            if('cssId' in data) {
                // set all other to not hidden
                await setHidden();
                $('#' + data.cssId).css({
                    display: 'block'
                });
                if(firstStart) {
                    $("<br><br><span></span><br>").html("To exit use 'taskkill'").insertBefore("#cursor");
                    $("<span></span><br>").html("To go back use 'cd' + '..'").insertBefore("#cursor");
                    firstStart = false;
                }
            }
        } else {
            // Invalid Action
            $("<br><br>").html("").insertBefore("#cursor");
            $("</br><span></span>").html("Invalid command entered").insertBefore("#cursor");
            $("<br>").html("").insertBefore("#cursor");
        }
    }

    async function setHidden(){
        for(let i of cssIdOPaths) {
            $('#' + i).css({
               display: 'none'
            });
        }
    }
});
/* end code snippet */
/*
* The code snippet (1. How to replace all occurrences of a string in JavaScript?) below have been sourced from:
* https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript.
* The code appears in its original form.
* */
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

/*
* End code snippet (1. How to replace all occurrences of a string in JavaScript?)
* */

function checkCommand() {
    return new Promise(async function (resolve) {
        let commandEntry = [];

        try {
            let com = commandLineLog[commandLineLog.length - 1].split(' ');
            commandEntry.push(com[0]);
            com = com.slice(1);
            if(com.length > 0) {
                com = com.join(' ');
                commandEntry.push(com);
            }
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

    /* The code snippet (4. Scroll to bottom of div?) below have been altered from:
    https://stackoverflow.com/questions/270612/scroll-to-bottom-of-div
    The variables calling the scrollTop has been altered from the original example.
    */

    $('#cmd').scrollTop = $('#cmd').scrollHeight - $('#cmd').clientHeight;
}

/*
* End code snippet (4. Scroll to bottom of div?).
* */


/* SOCKET EVENTS */

socket.on('test', function(){
    console.log('test successful');
});