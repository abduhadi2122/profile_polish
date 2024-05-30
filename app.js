document.getElementById('profileForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const fileInput = document.getElementById('fileInput');
  const bioInput = document.getElementById('bioInput').value;
  const spinner = document.getElementById('spinner');

  const formData = new FormData();

  for (let file of fileInput.files) {
      const base64 = await toBase64(file);
      formData.append('files', base64);
  }
  formData.append('bio', bioInput);

  spinner.style.display = 'block';

  try {
    const response = await fetch('https://ymstlg2yd9.execute-api.us-east-1.amazonaws.com/prod/analyze', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    console.log("Response Data:", responseData);

    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('pictures').innerText = responseData.pictures;
    document.getElementById('bio').innerText = responseData.bio;
    document.getElementById('feedbackContainer').style.display = 'block';
  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    spinner.style.display = 'none';
  }
});

document.getElementById('backButton').addEventListener('click', function() {
  document.getElementById('feedbackContainer').style.display = 'none';
  document.getElementById('formContainer').style.display = 'block';
});

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });
}
