document.getElementById('convertButton').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;

    if (files.length === 0) {
        alert('Please select at least one JPG image.');
        return;
    }

    let promises = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.type === 'image/jpeg') {
            const reader = new FileReader();

            promises.push(new Promise((resolve) => {
                reader.onload = function(event) {
                    const imgData = event.target.result;
                    const imgWidth = 210; // A4 width in mm
                    const imgHeight = (file.size / 1024) * 0.75; // Adjust height based on file size

                    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
                    pdf.addPage(); // Add a new page for the next image
                    resolve();
                };

                reader.readAsDataURL(file);
            }));
        }
    }

    Promise.all(promises).then(() => {
        pdf.save('images.pdf');
    });
});