document.getElementById('profileForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const bioInput = document.getElementById('bioInput').value;
    const nameInput = document.getElementById('nameInput').value;
    const emailInput = document.getElementById('emailInput').value;

    console.log(bioInput);
    console.log(nameInput);

    const formData = new FormData();
    Array.from(fileInput.files).forEach(file => formData.append('file', file));
    formData.append('bio', bioInput);
    formData.append('name', nameInput);
    formData.append('email', emailInput);

    // Fetch the test endpoint
    const response = await fetch('https://ymstlg2yd9.execute-api.us-east-1.amazonaws.com/prod/test');
    const data = await response.json();
    console.log("Response Data:", data);

});
