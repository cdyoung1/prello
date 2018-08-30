$(function(e){
    let loginUsername 
})
$('#login-form-container').on('submit', function(e) {
    e.preventDefault();
    let fd = new FormData(e.target);
    let loginData = {
        email: fd.get('login-email'),
        password: fd.get('login-password')
    }
    console.log(loginData);

    $.ajax({
        url: 'localhost:3000/login',
        method: 'POST',
        data: {
            email: loginData.email,
            password: loginData.password
        }
    })
    .done(function() {
        window.location.href = 'localhost:3000'
    })
    .fail(function(err) {
        console.log(err);
    })

})