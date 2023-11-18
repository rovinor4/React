
function UseToken() {

    if (!localStorage.getItem("login")) { return false }

    var data = JSON.parse(localStorage.getItem("login"))
    return data.login_tokens;
}

function UseDataLogin() {

    if (!localStorage.getItem("login")) { return false }
    else {
        var data = JSON.parse(localStorage.getItem("login"))
        return data;
    }
}

function UseLogin(navigate) {
    if (localStorage.getItem("login")) {
        navigate("/")
    }
}


function UseLogOut(navigate) {
    localStorage.clear();
    navigate("/login")
}


export { UseToken, UseDataLogin, UseLogin, UseLogOut }