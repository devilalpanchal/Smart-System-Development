$(window).on('load', initialize);

function initialize() {

    $(".signup").css("display", "none");

    $(".signbtn").click(function () {
        $("form").animate({ height: "toggle", opacity: "toggle" }, "slow");
    });

    $("#showhide").click(function () {
        var pass = $("#myinput");
        if (pass.attr("type") == "password") {
            pass.attr("type", "text");
        } else {
            pass.attr("type", "password");
        }
    })

    $('.signup').on('submit', function (e) {
        e.preventDefault();

        const formData = {};
        const data = $(this).serializeArray();

        data.forEach(({ name, value }) => {
            formData[name] = value;
        })

        $.ajax({
            url: '/api/auth/register',
            method: 'post',
            cache: false,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(formData),
            success: function () {
                Swal.fire(
                    'Success!',
                    'SignUp successfully',
                    'success'
                ).then(() => {
                    location.pathname = '/'
                });
            },
            error: function () {
                Swal.fire(
                    'Error!',
                    'Username already exist, change your username.',
                    'error'
                );
            }
        })
    });

    $('.signin').on('submit', function (e) {
        e.preventDefault();

        const formData = {};
        const data = $(this).serializeArray();
        const urlSearchPramas = new URLSearchParams(new URL(location.href).search);

        data.forEach(({ name, value }) => {
            formData[name] = value;
        })

        $.ajax({
            url: '/api/auth/signin',
            method: 'post',
            cache: false,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(formData),
            success: function () {
                Swal.fire(
                    'Success!',
                    'Logged in successfully',
                    'success'
                ).then(() => {
                    if (urlSearchPramas.get('redirect')){
                        location.href = urlSearchPramas.get('url')
                    }
                });
            },
            error: function () {
                Swal.fire(
                    'Error!',
                    'Please enter correct username or password',
                    'error'
                );
            }
        })
    });
}