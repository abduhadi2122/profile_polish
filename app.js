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

    const response = await fetch('https://949c-2604-3d09-aa7a-9880-29d4-90f5-37b7-f08d.ngrok-free.app/api/analyze', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();
    document.getElementById('feedback').textContent = result.feedback || 'Form submitted successfully!';
});
