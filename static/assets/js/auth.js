$('form[name="auth"]').submit(function (e) {
    e.preventDefault();
    sendSMS()
});

$('small.step-code').on('click', 'a.resend-sms', function (e) {
    e.preventDefault();
    sendSMS(true)
});

/**
 * Send and verify the SMS code.
 *
 * @param resend Resend the SMS code or not.
 */
function sendSMS(resend = false) {
    const form = $('form[name="auth"]')
    const submit = form.find('button[type="submit"]')
    const fieldPhone = form.find('input[name="phone"]')
    const fieldCode = form.find('input[name="code"]')
    const step = fieldCode.closest('.form-group').attr('hidden') || resend ? 'phone' : 'code'

    submit.attr('disabled', true)

    if (resend) {
        $('.step-code').html('SMS კოდი გამოგზავნილია მითითებულ ნომერზე. ' +
            'განმეორებით გაგზავნას შეძლებთ <span style="font-weight: bold;" class="count-sec">60</span> წამში.')
    }

    $.ajax({
        type: "POST",
        url: form.attr('action'),
        data: {
            resend: resend,
            step: step,
            phone: fieldPhone.val(),
            code: fieldCode.val(),
        },
        success: function (response) {
            if (response.authenticated) {
                window.location = response.destination
            } else if (response.time) {
                $('small.step-phone').attr('hidden', true)
                $('small.step-code').attr('hidden', false)

                fieldPhone.closest('.form-group').attr('hidden', true)
                fieldCode.closest('.form-group').attr('hidden', false)
                fieldCode.attr('required', true)
                submit.text('შემოწმება')

                let secondsLeft = 60;
                if (parseInt(response.time) > 0) {
                    secondsLeft = parseInt(response.time);
                }

                // Left time to resend the code
                const resendTimer = function (sec) {
                    $('.count-sec').text(--secondsLeft);
                    if (secondsLeft === 0) {
                        $('.step-code').html('არ მოგივიდათ SMS? <a href="#" class="resend-sms">ხელახლა გაგზავნა</a>.');
                    } else {
                        setTimeout(function () {
                            resendTimer();
                        }, 1000);
                    }
                };

                resendTimer();
            }

            submit.attr('disabled', false)
        },
        error: function (response) {
            toastr.error(response.responseJSON.error, 'შეცდომა!')
            submit.attr('disabled', false)
        }
    });
}
