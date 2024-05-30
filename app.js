document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profileForm');
    const submitButton = document.getElementById('submitButton');
    const spinner = document.getElementById('spinner');
    const progressPercentage = document.getElementById('progressPercentage');
    const bioInput = document.getElementById('bioInput');

    profileForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const fileInput = document.getElementById('fileInput');
        const bioInputValue = bioInput.value;

        const formData = new FormData();

        for (let file of fileInput.files) {
            const base64 = await toBase64(file);
            formData.append('files', base64);
        }
        formData.append('bio', bioInputValue);

        // Show spinner, hide submit button, and start progress bar animation
        submitButton.style.display = 'none';
        spinner.style.display = 'flex';
        progressPercentage.innerText = '0%';

        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            progressPercentage.innerText = `${progress}%`;
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 100); // 100ms * 100 = 10s

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
    profileForm.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && document.activeElement === bioInput) {
            event.preventDefault();
            bioInput.blur(); // Remove cursor from bio box
        }
    });
});
