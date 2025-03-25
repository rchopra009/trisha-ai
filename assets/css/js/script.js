document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.send-button');
    const chatMessages = document.querySelector('.chat-messages');
    
    // Send message function
    function sendMessage() {
        const message = inputField.value.trim();
        if (message === '') return;
        
        // Add user message
        const userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add('user-message');
        userMessageDiv.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(userMessageDiv);
        
        // Clear input
        inputField.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // In a real app, you would send the message to your backend here
        // For demo purposes, just show a simple reply after a delay
        setTimeout(() => {
            const assistantMessageDiv = document.createElement('div');
            assistantMessageDiv.classList.add('assistant-message');
            assistantMessageDiv.innerHTML = `
                <div class="avatar">T</div>
                <div class="message-content">
                    <p>I'm Trisha, your AI assistant. This is a demo response. In the actual application, 
                    I would provide meaningful insights about your Orangetheory studio.</p>
                </div>
            `;
            chatMessages.appendChild(assistantMessageDiv);
            
            // Scroll to bottom again
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
    
    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    
    inputField.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Focus input field on load
    inputField.focus();
    
    // Add hover effects for nav items
    const navItems = document.querySelectorAll('nav ul li a');
    navItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            this.style.color = 'var(--primary-color)';
        });
        item.addEventListener('mouseout', function() {
            this.style.color = 'var(--text-light)';
        });
    });
});
