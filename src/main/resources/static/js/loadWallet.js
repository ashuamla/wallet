const isProduction = true; // Set this to true in production, false in development

//let serverUrl;

if (isProduction) {
    // Heroku URL or your production server URL
    serverUrl = 'https://floating-sands-04180-8a16c12656a3.herokuapp.com';
} else {
    // Local development server URL
    serverUrl = 'http://localhost:8080';
}

function loadWallet() {
    const amountInput = document.getElementById('amount');
    const amount = amountInput.value;

    // Validate the amount (you can add more validation as needed)
    if (!amount || isNaN(amount)) {
        alert('Please enter a valid amount.');
        return;
    }

    // Retrieve the user object from sessionStorage
    const storedUser = sessionStorage.getItem('currentUser');

    if (storedUser) {
        // Parse the storedUser JSON string to get the user object
        const user = JSON.parse(storedUser);
        const upiId = user.upiId;
        const requestData = {
            upiId,
            amount
        };

        // Call the API to load the wallet
        fetch(`${serverUrl}/wallet/load`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
        .then(response => {
            if (response.ok) {
                console.log('Wallet loaded successfully');
                user.balance = +user.balance + +amount;

                // Save the updated user object back to sessionStorage
                sessionStorage.setItem('currentUser', JSON.stringify(user));

                // Call the method to record the transaction
                recordTransaction(user.upiId, upiId, amount, 'credit');

                alert('Wallet loaded and transaction recorded successfully.');
                // Optionally, you can redirect to another page or update user information
            } else {
                console.error('Failed to load wallet');
                alert('Failed to load wallet. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error during wallet loading. Please try again later.');
        });
    } else {
        // Handle the case where the user object is not found.
    }
}

// Function to record the transaction
function recordTransaction(upiId, account, amount, narration) {
    const recordTransactionData = {
        upiId,
        account,
        amount,
        narration
    };

    // Call the API to record the transaction
    fetch(`${serverUrl}/wallet/recordTransaction`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recordTransactionData),
    })
    .then(response => {
        if (!response.ok) {
            console.error('Failed to record transaction');
            alert('Failed to record transaction. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error during recording transaction:', error);
        alert('Error during recording transaction. Please try again later.');
    });
}

// Function to go back to the account page
function goBack() {
    window.location.href = 'account.html';
}
