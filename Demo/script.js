document.addEventListener('DOMContentLoaded', () => {
    const inputContainer = document.getElementById('inputContainer');
    const loginForm = document.getElementById('loginForm');

    // Define the input fields dynamically
    const inputFields = [
        { label: 'Email or Phone:', type: 'text', id: 'emailPhone', name: 'emailPhone', required: true },
        { label: 'Password:', type: 'password', id: 'password', name: 'password', required: true }
    ];

    inputFields.forEach(field => {
        const label = document.createElement('label');
        label.textContent = field.label;
        const input = document.createElement('input');
        input.type = field.type;
        input.id = field.id;
        input.name = field.name;
        if (field.required) input.required = true;

        inputContainer.appendChild(label);
        inputContainer.appendChild(input);
    });

    function submitForm() {
        const emailPhone = document.getElementById('emailPhone').value;
        const password = document.getElementById('password').value;
        const action = document.getElementById('action').value;

        // Send user data to the backend server
        fetch(action === 'login' ? 'http://localhost:3000/login' : 'http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ emailPhone, password }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Handle the response as needed
            if (data.success) {
                // Redirect to the next page after registration or login
                window.location.href = 'product.html';
            } else {
                // Handle registration or login failure
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle network or server errors
            alert('An error occurred. Please try again later.');
        });
    }
});
