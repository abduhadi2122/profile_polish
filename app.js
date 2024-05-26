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
    const test = await fetch('https://ymstlg2yd9.execute-api.us-east-1.amazonaws.com/prod/test');
    const testData = await test.json();
    console.log(testData);

    const response = await fetch('https://ymstlg2yd9.execute-api.us-east-1.amazonaws.com/prod/analyze', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    console.log("Response Data:", responseData);

    // Hide the form container
    document.getElementById('formContainer').style.display = 'none';

    // Display the evaluation and recommendations
    document.getElementById('evaluation').innerText = responseData.evaluation;
    document.getElementById('recommendations').innerText = responseData.recommendations;

    // Show the feedback container
    document.getElementById('feedbackContainer').style.display = 'block';

  } catch (error) {
    console.error("Fetch error:", error);
  }
});
