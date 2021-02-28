$('form[name="auth"]').submit(function (e) {
    e.preventDefault();

    const form = $(this);
    const url = form.attr('action');
    const submit = form.find('button[type="submit"]')
    const fieldPhone = form.find('input[name="phone"]')
    const fieldCode = form.find('input[name="code"]')
    const step = fieldCode.closest('.form-group').attr('hidden') ? 'phone' : 'code'

    submit.attr('disabled', true)

    $.ajax({
        type: "POST",
        url: url,
        data: {
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
                if (parseInt(response.time) > 1) {
                    secondsLeft = parseInt(response.time);
                }

                // Left time to resend the code
                const resendTimer = function (sec) {
                    $('.count-sec').text(--secondsLeft);
                    if (secondsLeft === 1) {
                        $('.step-code').html('არ მოგივიდათ SMS? <a href="#">ხელახლა გაგზავნა</a>.');
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
});
