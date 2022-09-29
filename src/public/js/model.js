const backendApi = 'https://telegrambackend.herokuapp.com/'

async function request (path, method, body) {
    let headers = {
        token: window.localStorage.getItem('token')
    }

    if(!(body instanceof FormData)) {
        headers['Content-type'] = 'application/json'
    }

	let response = await fetch(backendApi + path, {
		method,
		headers,
		body: (body instanceof FormData) ? body : JSON.stringify(body)
	})
	return await response.json()
}
