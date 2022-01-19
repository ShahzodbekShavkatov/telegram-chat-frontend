const tokenn = window.localStorage.getItem('token')
const id = window.localStorage.getItem('id')
if(tokenn && id) {
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
        window.localStorage.setItem('id', response.id)
        window.location = '/'
    }

    usernameInput.value = null
    passwordInput.value = null
}