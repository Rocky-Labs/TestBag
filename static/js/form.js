$(document).ready(function() {
    //event.preventDefault();
    $('#fm').on('submit', function(event){

        $.ajax({
            data: {
                BoxLen: $('#BoxLen').val(),
                BoxWid: $('#BoxWid').val()

            },
            type: 'POST',
            url: '/formProcess'

        })
        .done(function(data){
            if(data.error){
                $('#errorAlert').text(data.error).show();
                $('#successAlert').hide();
            }
            else {
                $('#successAlert').text(data.BoxLen).show();
                $('#errorAlert').hide();

            }
        })
        event.preventDefault();
    })
});