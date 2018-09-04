function logIn(email, password) {
    $.ajax({
        url: 'http://localhost:3000/login',
        method: 'POST',
        data: {
            email: email,
            password: password
        },
    })
    .done(function() {
        window.location.href = 'http://localhost:3000/boards';
    })
    .fail(function(err) {
        console.log(err);
    })
}


$('#login-form-container').on('submit', function(e) {
    e.preventDefault();
    let fd = new FormData(e.target);
    let loginData = {
        email: fd.get('login-email'),
        password: fd.get('login-password')
    }
    console.log(loginData);
    logIn(loginData.email, loginData.password);
})

$('#register-form-container').on('submit', function(e) {
    e.preventDefault();
    let fd = new FormData(e.target);
    let registerData = {
        firstName : fd.get('register-first-name'),
        lastName : fd.get('register-last-name'),
        email: fd.get('register-email'),
        password: fd.get('register-password')
    }

    $.ajax({
        url: 'http://localhost:3000/login/signup',
        method: 'POST',
        data: {
            password: registerData.password,
            email: registerData.email,
            first: registerData.firstName,
            last: registerData.lastName
        }
        })
        .done(function() {
            logIn(registerData.email,registerData.password)
        })
        .fail(function(err) {
            console.log(err);
        })
});