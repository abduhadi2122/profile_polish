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
    const testResponse = await fetch('https://59bc-2604-3d09-aa7a-9880-3060-2612-47aa-9033.ngrok-free.app/api/test');
    const testText = await testResponse.text(); // Get response as text
    console.log('Response Text:', testText); // Log the raw response text

    try {
        const testResult = JSON.parse(testText); // Parse response as JSON
        console.log('Response JSON:', testResult); // Log the JSON data
    } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);

});
