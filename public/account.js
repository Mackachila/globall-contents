
     window.onload = function () {
  console.log('Fetching username from server...');
  // Fetch the username from the session
  fetch('/get-username')
    .then(response => response.json())
    .then(data => {
      console.log('Fetched username from server:', data.username, data.accountType, data.currentAccount, data.accountBallance );
      const username = data.username;
      const accountType = data.accountType;
      const currentAccount = data.currentAccount;
      const accountBallance = data.accountBallance;

      if (username) {
        // Display the username on the account page
        document.getElementById('username-display').textContent = ` ${username}`;
        document.getElementById('account-type').textContent = ` ${accountType}`;
        document.getElementById('current_account').textContent = ` ${currentAccount}`;
        document.getElementById('account_ballance').textContent = ` ${accountBallance} $`;
        if (accountType == "verified")  {
        document.getElementById("account-type").style.color = "green";
        }else{
          document.getElementById("account-type").style.color = "red";
          document.getElementById("verifyaccount").style.display = "block";
        }
        if(currentAccount == "Free"){
        document.getElementById('tasks').textContent = ` 1`;
        document.getElementById('earnings').textContent = ` 0.50 $`;

        }else{
        document.getElementById('tasks').textContent = ` 2`;
        document.getElementById('earnings').textContent = ` 1 $`;
        }
      } else {
        // Redirect to the login page if the username is not available and not already on the login page
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    })
    .catch(error => {
      console.error('Error fetching username:', error);
      // Handle the error and maybe redirect to the login page
    });
};

// Add this code to your account.js file
document.addEventListener('DOMContentLoaded', () => {
  const getUsernameBtn = document.getElementById('get-username-btn');
  const usernameDisplay = document.getElementById('username-display2');

  // Event listener for the button click
  getUsernameBtn.addEventListener('click', async () => {
    try {
      // Fetch the username by ID from the server
      const response = await fetch('/get-username-by-id');
      const data = await response.json();

      // Display the result on the frontend
      if (data.username) {
        usernameDisplay.textContent = `Username: ${data.username}`;
      } else {
        usernameDisplay.textContent = 'User not found.';
      }
    } catch (error) {
      console.error('Error fetching username by ID:', error);
      // Handle the error and maybe display an error message on the frontend
    }
  });
});

// Add this code to your account.js file
document.addEventListener('DOMContentLoaded', () => {
  const verifyAccountBtn = document.getElementById('verify-account-btn');

  // Event listener for the button click
  verifyAccountBtn.addEventListener('click', async () => {
    try {
      // Fetch the account status from the server
      const response = await fetch('/verify-account');
      const data = await response.json();

      // Display the result or handle the redirection on the frontend
      if (data.error) {
        console.error('Error verifying account:', data.error);
        // Display an error message to the user (you can customize this based on your UI)
        alert('Error verifying account: ' + data.error);
      } else {
        // If there is no error, the server has already redirected to the success_verification page
      }
    } catch (error) {
      console.error('Error verifying account:', error);
      // Handle the error and maybe display an error message on the frontend
    }
  });
});



    