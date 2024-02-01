const isProduction = true; // Set this to true in production, false in development

//let serverUrl;

if (isProduction) {
    // Heroku URL or your production server URL
    serverUrl = 'https://floating-sands-04180-8a16c12656a3.herokuapp.com';
} else {
    // Local development server URL
    serverUrl = 'http://localhost:8080';
}
// Function to update user information on the account page
function updateUserInfo() {
    // Retrieve user information from the server
    const storedUser = sessionStorage.getItem('currentUser');

    if (storedUser) {
        const user = JSON.parse(storedUser);
        // Now 'user' contains the user object, and you can use it as needed.
         const name = user.name;
            const email = user.email;
            const upiId = user.upiId;
            const balance = user.balance;

            document.getElementById("accountName").innerText = name;
            document.getElementById("accountEmail").innerText = email;
            document.getElementById("accountUpiId").innerText = upiId;
            document.getElementById("accountBalance").innerText = balance;

    } else {
        console.error('User not found in session storage');
    }

}

function showTransactions() {
    // Redirect to the transactions page
    window.location.href = "transactions.html";
}

// Fetch user data and update the user information on the account page
updateUserInfo();
// account.js

// ... (other code)

document.addEventListener("DOMContentLoaded", function () {
    // ... (existing code)

    // Add the following code to style the buttons side by side
    const userActionsDiv = document.getElementById("userActions");
    userActionsDiv.style.display = "flex";
    userActionsDiv.style.gap = "10px"; // Adjust the gap according to your preference
    userActionsDiv.style.marginTop = "10px"; // Add some margin to separate from user details

    // ... (existing code)
});

//code for logout button
document.getElementById('logoutButton').addEventListener('click', function () {
    // Redirect to the login page (index.html)
    window.location.href = 'index.html';
});

function showTransactions() {
    // Redirect to the transactions page
    window.location.href = "transactions.html";
}

function sendMoney() {
    // Redirect to the transactions page
    window.location.href = "sendMoney.html";
}

function loadWalletPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const upiId = urlParams.get('upiId');

    // Redirect to the loadWallet page with upiId in the URL
    window.location.href = `loadWallet.html?upiId=${upiId}`;
}

// account.js

// ... (existing code)

// Function to show transactions
function showTransactions() {
    // Retrieve user data from sessionStorage
    const storedUser = sessionStorage.getItem('currentUser');

    if (storedUser) {
        const user = JSON.parse(storedUser);
        const upiId = user.upiId;

        // Call the API to get user transactions
        fetch(`${serverUrl}/wallet/showTransactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ upiId }),
        })
            .then(response => response.json())
            .then(transactions => {
                // Call a function to display transactions in a table
                displayTransactions(transactions);
            })
            .catch(error => {
                console.error('Error fetching transactions:', error);
                alert('Error fetching transactions. Please try again later.');
            });
    } else {
        // Handle the case where the user object is not found.
    }
}

// Function to display transactions in a table
function displayTransactions(transactions) {
    const transactionsTable = document.getElementById('transactionsTable');

    // Clear existing table content
    transactionsTable.innerHTML = '';

    // Create table headers
    const tableHeaderRow = transactionsTable.insertRow(0);
    const headers = ['UPI ID', 'Transaction Date', 'Narration', 'Amount', 'Transaction ID'];
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        tableHeaderRow.appendChild(header);
    });

    // Loop through transactions and populate the table
    transactions.forEach((transaction, index) => {
        const row = transactionsTable.insertRow(index + 1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);

        cell1.textContent = transaction.account;
        cell2.textContent = transaction.transactionDate;
        cell3.textContent = transaction.narration;
        cell4.textContent = transaction.amount;
        cell5.textContent = transaction.id;
    });
}

// Add the following code to style the table
const transactionsTableContainer = document.getElementById('transactionsTableContainer');
transactionsTableContainer.style.marginTop = '20px'; // Add margin for better appearance

// ... (existing code)



