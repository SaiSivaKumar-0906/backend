const form = document.getElementById('reg-form')
			form.addEventListener('submit', registerUser)
     
			async function registerUser(event) {
				event.preventDefault()
				const username = document.getElementById('username').value
				const password = document.getElementById('password').value

				const result = await fetch('/api/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						username,
						password
					})
				}).then((res) => console.log(res)) 
        console.log(result)
		}
