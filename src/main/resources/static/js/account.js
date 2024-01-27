// account.js

// Retrieve user information from the server
// account.js

// Function to update user information on the account page
function updateUserInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const email = urlParams.get('email');
    const upiId = urlParams.get('upiId');
    const balance = urlParams.get('balance');

    document.getElementById("accountName").innerText = name;
    document.getElementById("accountEmail").innerText = email;
    document.getElementById("accountUpiId").innerText = upiId;
    document.getElementById("accountBalance").innerText = balance;

    // Update other user details as needed
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


