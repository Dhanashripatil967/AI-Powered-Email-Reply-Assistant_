const form = document.getElementById('emailForm');
const generatedReply = document.getElementById('generatedReply');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const emailContent = document.getElementById('emailContent').value;
    const tone = document.getElementById('tone').value;

    // Clear previous reply
    generatedReply.textContent = 'Generating...';

    try {
        const response = await fetch('http://localhost:8080/api/email/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                emailcontent: emailContent,
                tone: tone
            })
        });

        if (!response.ok) throw new Error('Error generating reply');

        const reply = await response.text();
        generatedReply.textContent = reply;

    } catch (error) {
        generatedReply.textContent = 'Error: ' + error.message;
    }
});
