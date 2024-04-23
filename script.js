function uploadImages() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size <= 5 * 1024 * 1024) { // Max 5 MB
            formData.append('images[]', file);
        } else {
            alert('File size exceeds 5MB limit: ' + file.name);
            return;
        }
    }

    fetch('upload.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = '';
        data.forEach(image => {
            const imageElement = document.createElement('img');
            imageElement.src = image;
            outputDiv.appendChild(imageElement);
        });
    })
    .catch(error => {
        alert('An error occurred: ' + error.message);
    });
}
