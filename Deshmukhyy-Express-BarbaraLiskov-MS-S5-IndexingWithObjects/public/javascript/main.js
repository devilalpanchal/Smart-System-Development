$(window).on('load', initialize);

function initialize() {

    $('.logout-icon').on('click', function (e) {
        e.preventDefault();
            $.ajax({
                url: '/api/auth/signout',
                method: 'post',
                cache: false,
                success: function () {
                    Swal.fire(
                        'Success!',
                        'Logout successfully',
                        'success'
                        ).then(() => {
                            location.pathname = '/'
                        });
                }
            })    
    });
}