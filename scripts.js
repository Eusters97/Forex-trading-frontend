$(document).ready(function() {
    // Fetch signals
    $.get('https://your-render-backend.com/api/signals', function(data) {
        let signalsHtml = '';
        data.forEach(signal => {
            signalsHtml += `
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h3>${signal.pair}</h3>
                            <p>Price: ${signal.price}</p>
                            <p>Direction: ${signal.direction}</p>
                            <p>Win Probability: ${signal.probability}</p>
                        </div>
                    </div>
                </div>`;
        });
        $('#signals').html(signalsHtml);
    });

    // Fetch payouts every 3 seconds
    setInterval(function() {
        $.get('https://your-render-backend.com/api/payouts', function(data) {
            let payoutsHtml = '';
            data.forEach(payout => {
                payoutsHtml += `<div class="list-group-item">
                    ${payout.name} received $${payout.amount} at ${payout.time}
                </div>`;
            });
            $('#payouts').html(payoutsHtml);
        });
    }, 3000);
});

function sendMessage() {
    let message = $('#chat-input').val();
    $('#chat').append('<p>You: ' + message + '</p>');
    $.post('https://your-render-backend.com/api/chat', { message: message }, function(response) {
        $('#chat').append('<p>Assistant: ' + response.message + '</p>');
    });
    $('#chat-input').val('');
}