$(() => {
    Stripe.setPublishableKey('pk_test_CGdN4HbxI5zDRgNgipAKVuuz00YXE2HcQm')

    const stripeResponseHandler = (status, response) => {
        const $form = $("#payment-form");

        if (response.error) {
            console.log(`Stripe Error: ${ response.error.message }`);
            $("#payErrorDiv").css('display', 'block')
            // can $("#payErrorDiv").show()
            $form.find('.payment-errors').text(response.error.message)
            $('#paySubmit').prop("disabled", false)
        } else {
            const token = response.id
            $form.append($('<input type="hidden" name="stripeToken" />').val(token))

            $form.get(0).submit()
        }
    }
    
    $('#payment-form').submit(function(event) {

        event.preventDefault();

        $('#paySubmit').prop("disabled", true)

        const cardNumber = $('#card-number').val();
        const cvcCode = $('#card-cvc').val();
        const expMonth = $('#card-expiry-month-year').val().slice(0, 2);
        const expYear = $('#card-expiry-month-year').val().slice(2, 4);

        Stripe.card.createToken({
            number:     cardNumber,
            cvc:        cvcCode,
            exp_month:  expMonth,
            exp_year:   expYear
        }, stripeResponseHandler)
    })
})