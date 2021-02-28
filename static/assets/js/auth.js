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
            } else if (response.sms_sent) {
                $('small.step-phone').attr('hidden', true)
                $('small.step-code').attr('hidden', false)

                fieldPhone.closest('.form-group').attr('hidden', true)
                fieldCode.closest('.form-group').attr('hidden', false)
                fieldCode.attr('required', true)
                submit.text('შემოწმება')
            }

            submit.attr('disabled', false)
        },
        error: function (response) {
            console.log(response)
            submit.attr('disabled', false)
        }
    });
});
