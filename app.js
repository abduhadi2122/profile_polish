document.getElementById('profileForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const fileInput = document.getElementById('fileInput');
  const bioInput = document.getElementById('bioInput').value;

  const formData = new FormData();

  for (let file of fileInput.files) {
      const base64 = await toBase64(file);
      formData.append('files', base64);
  }
  formData.append('bio', bioInput);

  try {
    //const test = await fetch('https://ymstlg2yd9.execute-api.us-east-1.amazonaws.com/prod/test');
    //const testData = await test.json();
    //console.log(testData);

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

    // Display the feedback
    document.getElementById('pictures').innerText = responseData.pictures;
    document.getElementById('bio').innerText = responseData.bio;
    

    // Show the feedback container
    document.getElementById('feedbackContainer').style.display = 'block';

  } catch (error) {
    console.error("Fetch error:", error);
  }
});


function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });
}
