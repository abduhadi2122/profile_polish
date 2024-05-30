document.getElementById('profileForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const fileInput = document.getElementById('fileInput');
  const bioInput = document.getElementById('bioInput').value;
  const submitButton = document.getElementById('submitButton');
  const spinner = document.getElementById('spinner');
  const progressBar = document.getElementById('progress');
  const progressText = document.getElementById('progressText');

  const formData = new FormData();

  for (let file of fileInput.files) {
      const base64 = await toBase64(file);
      formData.append('files', base64);
  }
  formData.append('bio', bioInput);

  // Show spinner, hide submit button, and start progress bar animation
  submitButton.style.display = 'none';
  spinner.style.display = 'flex';
  progressBar.style.width = '0'; // Reset progress bar
  progressText.innerText = '0%';
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += 1;
    progressBar.style.width = `${progress}%`;
    progressText.innerText = `${progress}%`;
    if (progress >= 100) {
      clearInterval(interval);
    }
  }, 150); // 150ms * 100 = 15s

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

    // Hide the form container
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('feedbackContainer').style.display = 'block';

    // Display the feedback
    document.getElementById('pictures').innerText = responseData.pictures;
    document.getElementById('bio').innerText = responseData.bio;

  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    // Hide spinner
    spinner.style.display = 'none';
  }
});

document.getElementById('backButton').addEventListener('click', function() {
  // Hide the feedback container
  document.getElementById('feedbackContainer').style.display = 'none';

  // Reset form values
  document.getElementById('profileForm').reset();

  // Show the form container
  document.getElementById('formContainer').style.display = 'block';
  document.getElementById('submitButton').style.display = 'block'; // Show the submit button again
});

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });
}

// Submit form when Enter key is pressed
document.getElementById('profileForm').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    document.getElementById('submitButton').click();
  }
});
