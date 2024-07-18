document.getElementById('sendButton').addEventListener('click', function() {
    const question = document.getElementById('questionInput').value;
    if (question.trim() !== "") {
        fetch('https://lance-flow.vercel.app/fitness', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: question })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response from server:', data);
            displayResponse(data.response || "Response received, but no answer found.");
        })
        .catch(error => {
            console.error('Error:', error);
            displayResponse("Sorry, there was an error processing your request. Please try again later.");
        });
    } else {
        alert("Please enter a question.");
    }
});

function displayResponse(response) {
    const responseContainer = document.getElementById('responseContainer');
    const responseElement = document.createElement('p');
    responseElement.textContent = response;
    responseElement.classList.add('response-message'); // Add a class for styling if needed
    responseContainer.appendChild(responseElement);
}

// Chatbox script
const chatbox = window.chatbox || document.getElementById("chatbox");

const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const openChatButton = document.getElementById("open-chat");
const closeChatButton = document.getElementById("close-chat");

// Check if isChatboxOpen is already declared
window.isChatboxOpen = window.isChatboxOpen || false;

// Function to toggle the chatbox visibility
function toggleChatbox() {
    chatContainer.classList.toggle("hidden");
    isChatboxOpen = !isChatboxOpen; // Toggle the state
}

// Add an event listener to the open chat button
openChatButton.addEventListener("click", toggleChatbox);

// Add an event listener to the close chat button
closeChatButton.addEventListener("click", toggleChatbox);

// Add an event listener to the send button
sendButton.addEventListener("click", function () {
    const userMessage = userInput.value;
    if (userMessage.trim() !== "") {
        addUserMessage(userMessage);
        respondToUser(userMessage);
        userInput.value = "";
    }
});

userInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        const userMessage = userInput.value;
        if (userMessage.trim() !== "") {
            addUserMessage(userMessage);
            respondToUser(userMessage);
            userInput.value = "";
        }
    }
});

function addUserMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("mb-2", "text-right");
    messageElement.innerHTML = `<p class="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">${message}</p>`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function addBotMessage(message) {
    let formattedMessage = message;

    // Remove trailing period if it exists
    if (formattedMessage.endsWith('.')) {
        formattedMessage = formattedMessage.slice(0, -1);
    }

    // Check if the message is a number
    if (!isNaN(formattedMessage) && typeof parseFloat(formattedMessage) === 'number') {
        // Format the number
        const formatter = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0, // minimum number of fraction digits to use
            maximumFractionDigits: 0, // maximum number of fraction digits to use
        });
        formattedMessage = formatter.format(formattedMessage);
    }

    const messageElement = document.createElement("div");
    messageElement.classList.add("mb-2");
    messageElement.innerHTML = `<p class="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">${formattedMessage}</p>`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function respondToUser(userMessage) {
    const chatbotApiUrl = 'https://lance-flow.vercel.app/fitness'; // Replace with your chatbot API URL

    fetch(chatbotApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
    })
    .then(response => response.json())
    .then(data => {
        addBotMessage(data.response); // Replace 'data.response' with the actual path to the response in the returned data
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

