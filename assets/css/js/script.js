/**
 * Trisha.AI - Main JavaScript
 * Handles UI interactions and chat functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const inputField = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.send-button');
    const chatMessages = document.querySelector('.chat-messages');
    const chatContainer = document.querySelector('.chat-container');
    
    // Focus input on page load
    setTimeout(() => {
        inputField.focus();
    }, 500);
    
    // Sample responses for demo
    const sampleResponses = [
        "I've analyzed your studio data and found that evening classes have 32% higher attendance than morning classes this month.",
        "Your current member retention rate is 87%, which is 5% above the average for Orangetheory studios in your region.",
        "Based on recent survey data, members are most satisfied with your coaches' energy levels and least satisfied with the locker room facilities.",
        "Looking at your financial trends, retail sales have increased by 18% this quarter compared to last quarter.",
        "I've identified 34 members who haven't visited in the last 30 days. Would you like me to create a re-engagement campaign for them?"
    ];
    
    // Send message function
    function sendMessage() {
        const message = inputField.value.trim();
        if (message === '') return;
        
        // Add user message
        const userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add('user-message');
        userMessageDiv.innerHTML = `<p>${escapeHTML(message)}</p>`;
        chatMessages.appendChild(userMessageDiv);
        
        // Clear input
        inputField.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate AI thinking with a small delay
        setTimeout(() => {
            // Show typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.classList.add('assistant-message', 'typing-indicator');
            typingIndicator.innerHTML = `
                <div class="avatar">T</div>
                <div class="message-content">
                    <p>Thinking<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></p>
                </div>
            `;
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // After a delay, replace with actual response
            setTimeout(() => {
                // Remove typing indicator
                chatMessages.removeChild(typingIndicator);
                
                // Get random response for demo
                const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
                
                // Add AI response
                const assistantMessageDiv = document.createElement('div');
                assistantMessageDiv.classList.add('assistant-message');
                assistantMessageDiv.innerHTML = `
                    <div class="avatar">T</div>
                    <div class="message-content">
                        <p>${randomResponse}</p>
                    </div>
                `;
                chatMessages.appendChild(assistantMessageDiv);
                
                // Scroll to bottom again
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Add pulse effect to container
                chatContainer.classList.add('pulse');
                setTimeout(() => {
                    chatContainer.classList.remove('pulse');
                }, 1000);
            }, 1500);
        }, 500);
    }
    
    // Helper function to escape HTML in user input
    function escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Animate the dots in the typing indicator
    function animateTypingDots() {
        const dots = document.querySelectorAll('.typing-indicator .dot');
        if (!dots || dots.length === 0) return;
        
        dots.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.opacity = 1;
                setTimeout(() => {
                    dot.style.opacity = 0.3;
                }, 300);
            }, index * 300);
        });
    }
    
    // Start animating dots if there's a typing indicator
    setInterval(animateTypingDots, 1000);
    
    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    
    inputField.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add hover effects for various elements
    const addHoverEffect = (selector, property, normalValue, hoverValue) => {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style[property] = hoverValue;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style[property] = normalValue;
            });
        });
    };
    
    // Apply hover effects
    addHoverEffect('nav ul li a', 'color', 'var(--text-light)', 'var(--primary-color)');
    addHoverEffect('.agent', 'transform', 'scale(1)', 'scale(1.05)');
    
    // Make agents clickable for future functionality
    document.querySelectorAll('.agent').forEach(agent => {
        agent.style.cursor = 'pointer';
        agent.addEventListener('click', function() {
            const agentType = this.className.split(' ')[1];
            inputField.value = `Tell me about ${agentType} trends`;
            inputField.focus();
        });
    });
    
    // Add CSS animation for the chat container glow effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.2); opacity: 0.2; }
            100% { transform: scale(1); opacity: 0.4; }
        }
        
        .chat-container.pulse {
            box-shadow: 0 0 30px var(--primary-color) !important;
            transition: box-shadow 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);
});
