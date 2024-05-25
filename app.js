document.getElementById('profileForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const bioInput = document.getElementById('bioInput').value;
    const nameInput = document.getElementById('nameInput').value;
    const emailInput = document.getElementById('emailInput').value;

    const formData = new FormData();
    Array.from(fileInput.files).forEach(file => formData.append('file', file));
    formData.append('bio', bioInput);
    formData.append('name', nameInput);
    formData.append('email', emailInput);

    const test = await fetch('https://d5a7-2604-3d09-aa7a-9880-3060-2612-47aa-9033.ngrok-free.app/api/test', {
        method: 'POST',
        body: formData
    });

    console.log(test)
    
    const response = await fetch('https://d5a7-2604-3d09-aa7a-9880-3060-2612-47aa-9033.ngrok-free.app/api/analyze', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();
    document.getElementById('feedback').textContent = result.feedback || 'Form submitted successfully!';
});
