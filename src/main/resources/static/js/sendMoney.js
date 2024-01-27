// sendMoney.js

function sendMoney() {
    const amountInput = document.getElementById('amount');
    const accountInput = document.getElementById('account');
    const amount = amountInput.value;
    const account = accountInput.value;

    // Validate the amount (you can add more validation as needed)
    if (!amount || isNaN(amount) || +amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    // Retrieve the user object from sessionStorage
    const storedUser = sessionStorage.getItem('currentUser');

    if (storedUser) {
        // Parse the storedUser JSON string to get the user object
        const user = JSON.parse(storedUser);

        // Validate that the amount is not greater than the available balance
        if (+amount > +user.balance) {
            alert('Insufficient balance. Please enter a smaller amount.');
            return;
        }

        // Directly call the method to record the transaction
        recordTransaction(user.upiId, account, amount, 'debit'); // Use the 'account' parameter

        // Update the user's balance locally
        user.balance = +user.balance - +amount;

        // Save the updated user object back to sessionStorage
        sessionStorage.setItem('currentUser', JSON.stringify(user));

        alert('Money sent successfully.');
        // Optionally, you can redirect to another page or update user information
    } else {
        // Handle the case where the user object is not found.
    }
}

// Function to go back to the account page
function goBack() {
    window.location.href = 'account.html';
}

// Function to record the transaction
function recordTransaction(upiId, account, amount, narration) {
    const recordTransactionData = {
        upiId,
        account,
        amount,
        narration
    };

//     Call the API to record the transaction (if needed)
     fetch('http://localhost:8080/wallet/recordTransaction', {
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
