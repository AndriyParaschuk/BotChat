(function () {
    var start = true;
    var Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function () {
            return function () {
                var message = CloleHtmlElemement();
                var date = CurrentData();
                message.addClass(this.message_side).find('.text').html(this.text);
                message.addClass(this.message_side).find('.data').html(date);
                $('.messages').append(message);
                message.addClass('appeared');

                this.message_side = "left";
                message = CloleHtmlElemement();
                message.addClass(this.message_side).find(".text").html(FindTheAnswer(this.text));

                setTimeout(function () {
                    message.addClass(this.message_side).find('.data').html(date);
                    $('.messages').append(message);
                    message.addClass('appeared');
                }, 200);
            };
        }(this);
    };

    function CloleHtmlElemement() {
        return $($('.message_template').clone().html());
    }
    
    function FindTheAnswer(text) {
        var AnswerText;
        var regex = /[0-9]{4}.(0[1-9]|1[012]).(0[1-9]|1[0-9]|2[0-9]|3[01])/;
        switch(true)
        {
            case (text.toLowerCase().indexOf("buy a car") != -1 ):
                AnswerText = "We do not provide these services";
                break;
            case (text.toLowerCase().indexOf("borrow a car") != -1):
                AnswerText = "Please select a date";
                break;
            case (regex.test(text)):
                AnswerText = "Please select a car";
                break;
            case (text == "Audi"):
                AnswerText = "Please select model";
                break;
            case (text == "A6"):
                AnswerText = "Ok";
                break;
            default:
                if(start) {
                    AnswerText = "Can I help you?";
                    start = !start;
                }
                else {
                    AnswerText = "Please enter other question";
                }
                break;
        }
        return AnswerText;
    }

    $(function () {
        var getMessageText = function () {
            var message_input = $('.message_input');
            return message_input.val();
        };
        var sendMessage = function (text) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message = new Message({
                text: text,
                message_side: message_side
            });
            message.draw();
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };

        $('.send_message').click(function (e) {
            return sendMessage(getMessageText());
        });

        $('.message_input').keyup(function (e) {
             if (e.which === 13) {
                return sendMessage(getMessageText());
             }
        });

        var message_side = "left";
        sendMessage("Hello");
        message_side = "right";
    });


    function CurrentData() {
        var date = new Date()
        var hours = date.getHours();
        var minutes = (date.getMinutes() > "10") ? date.getMinutes() : "0" + date.getMinutes();
        var strTime = hours + ':' + minutes;
        return strTime;
    }

    var flagFormBig = true;
    $('.minimize_maximize').click(function () {
            if(flagFormBig) {
                document.getElementById("chat_window").style.maxWidth = "600px";
                document.getElementById("chat_window").style.height = "400px";
                document.getElementById("bottom_wrapper clearfix").style.display = "inline";
            }
            else{
                document.getElementById("chat_window").style.maxWidth = "800px";
                document.getElementById("chat_window").style.height = "500px";
                document.getElementById("bottom_wrapper clearfix").style.display = "inline";
            }
            flagFormBig = !flagFormBig;
        }
    )

    $('.collapse').click(function () {
            document.getElementById("bottom_wrapper clearfix").style.display = "none";
            document.getElementById("chat_window").style.maxWidth = "300px";
            document.getElementById("chat_window").style.height = "55px";
        }
    )

    $('.close').click(function () {
            document.getElementById("chat_window").style.display = "none";
        }
    )
}.call(this));

