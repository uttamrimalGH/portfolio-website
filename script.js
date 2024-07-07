document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.menu-button');
    const nav = document.querySelector('nav ul');
    const scrollIndicator = document.querySelector('.scroll-indicator');
// Blog functionality
if (document.querySelector('.blog-section')) {
    const blogPosts = document.querySelectorAll('.blog-post');
    blogPosts.forEach(post => {
        post.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        post.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}
    // Toggle menu
    menuButton.addEventListener('click', function() {
        nav.classList.toggle('show');
        this.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('show') ? 'hidden' : '';
    });

    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('show');
            menuButton.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Scroll to top functionality
    scrollIndicator.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide scroll indicator
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollIndicator.classList.add('visible');
        } else {
            scrollIndicator.classList.remove('visible');
        }
    });

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.video-item, .testimonial-item');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 50) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check on page load

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const heroSection = document.querySelector('.hero-section');
        const scrollPosition = window.pageYOffset;
        heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });

    // Typewriter effect for hero section subtitle
    const heroSubtitle = document.querySelector('.hero-section p');
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    setTimeout(typeWriter, 1000); // Start after 1 second

    // Add hover effect to navigation items
    const navItems = document.querySelectorAll('nav ul li a');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.transition = 'transform 0.3s ease';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatIcon = document.getElementById('chatIcon');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendMessage = document.getElementById('sendMessage');

    chatIcon.addEventListener('click', () => {
        chatWindow.style.display = 'flex';
        chatIcon.style.display = 'none';
    });

    closeChat.addEventListener('click', () => {
        chatWindow.style.display = 'none';
        chatIcon.style.display = 'flex';
    });

    sendMessage.addEventListener('click', sendUserMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });

    function sendUserMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage('user', message);
            userInput.value = '';
            setTimeout(() => botResponse(message), 500);
        }
    }

    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function botResponse(userMessage) {
        let botReply = "I'm sorry, I didn't understand that. How else can I help you?";
        const lowerUserMessage = userMessage.toLowerCase();

        if (lowerUserMessage.includes('hello') || lowerUserMessage.includes('hi')) {
            botReply = "Hello! How can I assist you today?";
        } else if (lowerUserMessage.includes('services') || lowerUserMessage.includes('what do you do')) {
            botReply = "I offer professional video editing services. Would you like to know more about my work?";
        } else if (lowerUserMessage.includes('portfolio') || lowerUserMessage.includes('examples')) {
            botReply = "You can find examples of my work in the Featured Work section of my website. Would you like me to guide you there?";
        } else if (lowerUserMessage.includes('contact') || lowerUserMessage.includes('get in touch')) {
            botReply = "You can reach out to me through the contact form on my website. Would you like me to show you where it is?";
        } else if (lowerUserMessage.includes('price') || lowerUserMessage.includes('cost')) {
            botReply = "Pricing depends on the specific requirements of your project. Would you like to discuss your needs in detail?";
        }

        addMessage('bot', botReply);
        addQuickReplies();
    }

    function addQuickReplies() {
        const quickReplies = [
            "Tell me about your services",
            "Show me your portfolio",
            "How can I contact you?",
            "What are your prices?"
        ];

        const quickRepliesContainer = document.createElement('div');
        quickRepliesContainer.classList.add('quick-replies');

        quickReplies.forEach(reply => {
            const button = document.createElement('button');
            button.classList.add('quick-reply');
            button.textContent = reply;
            button.addEventListener('click', () => {
                addMessage('user', reply);
                setTimeout(() => botResponse(reply), 500);
            });
            quickRepliesContainer.appendChild(button);
        });

        chatMessages.appendChild(quickRepliesContainer);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Initial bot message
    setTimeout(() => {
        addMessage('bot', "Hello! How can I help you today?");
        addQuickReplies();
    }, 1000);
});


