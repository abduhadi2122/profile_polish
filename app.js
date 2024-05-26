document.getElementById('profileForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const bioInput = document.getElementById('bioInput').value;
    const nameInput = document.getElementById('nameInput').value;
    const emailInput = document.getElementById('emailInput').value;

    const formData = new FormData();
    Array.from(fileInput.files).forEach(file => formData.append('files', file));
    formData.append('bio', bioInput);
    formData.append('name', nameInput);
    formData.append('email', emailInput);

    try {
        const response = await fetch('https://ymstlg2yd9.execute-api.us-east-1.amazonaws.com/prod/analyze', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("Response Data:", data);

        // Display the evaluation and recommendations on the screen
        document.getElementById('evaluation').innerText = data.evaluation;
        document.getElementById('recommendations').innerText = data.recommendations;
    } catch (error) {
        console.error("Fetch error:", error);
    }
});
