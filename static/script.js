document.getElementById('chatForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();

    if (message === '') return;

    // Display the user's message in the chat window
    appendMessage('user-message', message);
    userInput.value = '';

    // Fetch the chatbot's response from the backend
    fetch('/chatbot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userMessage=${encodeURIComponent(message)}`,
    })
    .then(response => response.json())
    .then(data => {
        // Display the chatbot's response in the chat window
        appendMessage('bot-message', data.response);
    })
    .catch(error => {
        console.error('Error:', error);
        appendMessage('bot-message', 'Something went wrong. Please try again.');
    });
});

function appendMessage(className, text) {
    const chatWindow = document.getElementById('chatWindow');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.textContent = text;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the bottom
}
