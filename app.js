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
    const testResponse = await fetch('https://d5a7-2604-3d09-aa7a-9880-3060-2612-47aa-9033.ngrok-free.app/api/test');
    const testResult = await testResponse.json();
    console.log(testResult); // Log the actual JSON data from the test endpoint
   
});
