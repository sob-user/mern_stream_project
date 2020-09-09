window.onload = function(){ 
    function getAndSaveToken() {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "", true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = this.getResponseHeader('user'); 
                localStorage.setItem('reset', response)

            }
        };
        xhttp.send();
    }

    getAndSaveToken();
}

const inputFields = {
    password: '',
    passwordConfirm: ''
}

function onChangePassword(event) {
    const password = event.target.value;
    inputFields['password'] = password;
}

function onChangeConfirmPassword(event) {
    const confirmPassword = event.target.value;
    inputFields['passwordConfirm'] = confirmPassword;
}

function postNewPassword(event) {
    event.preventDefault()

    const token = localStorage.getItem('reset');
    const password = inputFields.password
    const confirmPassword = inputFields.passwordConfirm
    const body = `newPassword=${password}`
    const message = document.getElementById('message')

    if(password.length !== 0 && confirmPassword.length !== 0) {
        if(password === confirmPassword) {
            var xhttp = new XMLHttpRequest();
            xhttp.open("PUT", `/api/reset/${token}`, true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    message.innerHTML = 'password has changed with success';
                    setTimeout(function(){location.href='https://older-stream.com'} , 3000)
                }
            };
            xhttp.send(body)
        }
        else {
            message.innerHTML = 'fields have not same values';
        }
    }
    else if(password.length === 0 && confirmPassword.length === 0) {
        message.innerHTML = 'fill all fields';
    }
}