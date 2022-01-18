// inputFile
// usernameInput
// passwordInput
// signbtn


const token = window.localStorage.getItem('token')
if(token) {
    window.location = '/'
}

formbtn.onsubmit = async event => {
    event.preventDefault()

    let formdata = new FormData()

    formdata.append('username', usernameInput.value)
    formdata.append('password', passwordInput.value)
    formdata.append('file', inputFile.files[0])

    let response = await request('/auth/register', 'POST', formdata)
    console.log(response)

    if(response.token) {
        window.localStorage.setItem('token', response.token)
        window.location = '/'
    }

    usernameInput.value = null
    passwordInput.value = null
}
