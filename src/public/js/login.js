const token = window.localStorage.getItem('token')
if(token) {
    window.location = '/'
}

formm.onsubmit = async event => {
    event.preventDefault()

    let obj = {
        username: usernameInput.value,
        password: passwordInput.value
    }

    let response = await request('/auth/login', 'POST', obj)
    console.log(response)

    if(response.token) {
        window.localStorage.setItem('token', response.token)
        window.location = '/'
    }

    usernameInput.value = null
    passwordInput.value = null
}