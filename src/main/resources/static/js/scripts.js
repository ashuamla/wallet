function toggleForm() {
	var registrationForm = document.getElementById("registrationForm");
	var loginForm = document.getElementById("loginForm");

	if (registrationForm.style.display === "block") {
		registrationForm.style.display = "none";
		loginForm.style.display = "block";
	} else {
		registrationForm.style.display = "block";
		loginForm.style.display = "none";
	}

}

const isProduction = true; // Set this to true in production, false in development

//let serverUrl;

if (isProduction) {
    // Heroku URL or your production server URL
    serverUrl = 'https://floating-sands-04180-8a16c12656a3.herokuapp.com';
} else {
    // Local development server URL
    serverUrl = 'http://localhost:8080';
}


document.addEventListener('DOMContentLoaded', function () {
document.getElementById('registerButton').addEventListener('click', async function (event) {
	event.preventDefault(); // Prevent the default form submission
	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	const phoneNumber = document.getElementById('mobilenumber').value;
	const password = document.getElementById('password').value;
	const upiId = document.getElementById('upiId').value;

	const userData = {
		name,
		email,
		phoneNumber,
		password,
		upiId
	};

	try {
		const response = await fetch(`${serverUrl}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});
		if (response.ok) {
			console.log('User registered successfully');
		} else {
			console.error('Failed to register user');
		}
	} catch (error) {
		console.error('Error:', error);
	}
});

    document.getElementById('loginButton').addEventListener('click', async function (event) {
        event.preventDefault(); // Prevent the default form submission
        const emailOrMobileNumber = document.getElementById('loginIdentifier').value;
        const password = document.getElementById('loginPassword').value;

        const loginData = {
            "emailOrMobileNumber": emailOrMobileNumber,
            "password": password
        };

        try {
            const response = await fetch(`${serverUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                console.log('Login request sent successfully');

                // Check if the response has a valid JSON payload
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const userData = await response.json();
                    // now getting wallet data
                    const walletResponse = await fetch(`${serverUrl}/wallet/upiId`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ upiId: userData.upiId })  // Assuming userData.upiId is a string
                    });

                    if (walletResponse.ok) {
                        console.log('Got wallet data successfully');
                        const walletData = await walletResponse.json();
                        console.log(walletData); // Log the response
                        userData.balance = walletData.balance;
                        sessionStorage.setItem('currentUser', JSON.stringify(userData));
                        window.location.href = "account.html";
                    } else {
                        console.error('Failed to get wallet data');
                    }
                } else {
                    console.error('Invalid JSON response from server');
                    // Handle the error appropriately
                     alert('Incorrect username or password. Please try again.');
                }
            } else {
                console.error('Failed to send login request');

                // Check for specific login failure status code
                if (response.status === 401) {
                    // Unauthorized (login failed)
                    alert('Incorrect username or password. Please try again.');
                } else {
                    // Handle other errors or display a generic message
                    alert('Login failed. Please try again later.');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network errors or other exceptions
            alert('Error during login. Please try again later.');
        }
    });
});