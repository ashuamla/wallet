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

document.getElementById('registerButton').addEventListener('click', async function(event) {
    event.preventDefault(); // Prevent the default form submission
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('mobilenumber').value;
    const password = document.getElementById('password').value;

    const userData = {
        name,
        email,
        phoneNumber,
        password
    };

    try {
        const response = await fetch('http://localhost:8080/register', {
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

document.getElementById('loginButton').addEventListener('click', async function(event) {
    event.preventDefault(); // Prevent the default form submission
    const emailOrMobileNumber = document.getElementById('loginIdentifier').value;
    const password = document.getElementById('loginPassword').value;

    const loginData = {
        "emailOrMobileNumber":emailOrMobileNumber,
        "password":password
    };

    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
             body: JSON.stringify(loginData),
        });
        if (response.ok) {
            console.log('login request sent successfully');
            // Handle successful login, e.g., redirect to a new page
        } else {
            console.error('Failed to sent request');
            // Handle failed login, e.g., display an error message
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle network errors or other exceptions
    }
});