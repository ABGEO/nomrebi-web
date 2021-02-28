$('form[name="search"]').submit(function (e) {
    e.preventDefault();

    const form = $(this);
    searching(true, form)

    $.ajax({
        type: "POST",
        url: form.attr('action'),
        data: form.serializeArray(),
        success: function (response) {
            searching(false, form)
            printProfile(response)
        },
        error: function (response) {
            searching(false, form)
        }
    });
});

$('body').on('click', 'a.print-profile', function (e) {
    const elementToPrint = $('div.card-profile')
    const elementToPrintBackup = elementToPrint.html()

    elementToPrint.find('div.profile-picture-wrapper').remove()
    elementToPrint.find('div.card-profile-actions').remove()
    elementToPrint.find('div.card-profile-stats').remove()

    html2canvas(elementToPrint[0], {
        width: 500,
        height: 600,
    }).then(function (canvas) {
        elementToPrint.empty().html(elementToPrintBackup)

        const a = document.createElement('a')
        a.href = canvas.toDataURL('image/png')
        a.download = $('span.phone').text() + '.png'
        a.click()
    });
});

function searching(status, form) {
    toastr.clear()

    $('div.status').attr('hidden', !status)
    form.find('button[type="submit"]').attr('disabled', status)
    form.find('input[name="phone"]').attr('readonly', status)

    if (status) {
        $('div.card-profile').attr('hidden', true)
    }
}

function printProfile(values) {
    const data = values.data
    if ( $.isEmptyObject(data)) {
        toastr.info('სამწუხაროდ ინფორმაცია ამ ნომრის მფლობელის შესახებ ვერ მოიძებნა.')
        return
    }

    const card = $('div.card-profile')
    const additionalNamesWrapper = card.find('div.additional-names-wrapper')
    card.attr('hidden', false)
    card.find('img.profile-picture').attr('src', data.info.image === '' ? '/static/assets/img/avatar.jpg' : data.info.image)
    card.find('h3.name').text(data.info.name)
    card.find('span.phone').text(data.info.number)
    card.find('span.additional-names-count').text(data.names.length)

    if (data.names.length === 0) {
        additionalNamesWrapper.attr('hidden', true)
    } else {
        const additionalNames = additionalNamesWrapper.find('div.additional-names')
        const badges = [
            'badge-primary',
            'badge-info',
            'badge-success',
            'badge-danger',
            'badge-warning',
            'badge-default',
        ]
        additionalNamesWrapper.attr('hidden', false)
        additionalNames.html('')
        for (let name of data.names) {
            let badgeKey = Math.floor(Math.random() * badges.length);
            additionalNames.append(`<span class="badge ${badges[badgeKey]}">${name}</span>\n`)

        }
    }
}
