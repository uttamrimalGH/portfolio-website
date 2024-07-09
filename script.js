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
//Whatsapp Script
document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.getElementById('whatsapp-chat-button');
    const chatWidget = document.getElementById('whatsapp-chat-widget');
    const closeChat = document.getElementById('close-chat');
    const whatsappForm = document.getElementById('whatsapp-form');
    const chatMessages = document.getElementById('chat-messages');
    const quickResponses = document.getElementById('quick-responses');

    // Replace with your WhatsApp number
    const whatsappNumber = '+9779840692118';

    // Quick response options
    const quickResponseOptions = {
        'greeting': ['Hello!', 'Hi there!', 'Greetings!'],
        'inquiry': ['What services do you offer?', 'Can you tell me about your pricing?', 'Do you have any availability?'],
        'thanks': ['Thank you!', 'Thanks for your help!', 'Appreciate it!']
    };

    chatButton.addEventListener('click', function() {
        chatWidget.style.display = 'flex';
        chatButton.style.display = 'none';
        addBotMessage("Hello! How can I assist you today?");
        showQuickResponses('greeting');
    });

    closeChat.addEventListener('click', function() {
        chatWidget.style.display = 'none';
        chatButton.style.display = 'flex';
    });

    whatsappForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = document.getElementById('whatsapp-message').value;
        if (message.trim() !== '') {
            addUserMessage(message);
            document.getElementById('whatsapp-message').value = '';
            processUserMessage(message);
        }
    });

    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'user-message');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'bot-message');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showQuickResponses(category) {
        quickResponses.innerHTML = '';
        quickResponseOptions[category].forEach(response => {
            const button = document.createElement('button');
            button.classList.add('quick-response-btn');
            button.textContent = response;
            button.addEventListener('click', () => {
                addUserMessage(response);
                processUserMessage(response);
            });
            quickResponses.appendChild(button);
        });
    }

    function processUserMessage(message) {
        // Simple bot logic
        if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
            addBotMessage("Hello! How can I help you today?");
            showQuickResponses('inquiry');
        } else if (message.toLowerCase().includes('services') || message.toLowerCase().includes('offer')) {
            addBotMessage("I offer professional video editing services. Would you like to know more about pricing or availability?");
            showQuickResponses('inquiry');
        } else if (message.toLowerCase().includes('price') || message.toLowerCase().includes('cost')) {
            addBotMessage("Our pricing varies depending on the project. Can you tell me more about what you need?");
            showQuickResponses('inquiry');
        } else if (message.toLowerCase().includes('availability') || message.toLowerCase().includes('schedule')) {
            addBotMessage("I currently have availability for new projects. When would you like to start?");
            showQuickResponses('thanks');
        } else if (message.toLowerCase().includes('thank')) {
            addBotMessage("You're welcome! Is there anything else I can help you with?");
            showQuickResponses('inquiry');
        } else {
            addBotMessage("I'm sorry, I didn't quite understand that. Could you please rephrase or choose from the quick responses?");
            showQuickResponses('inquiry');
        }
    }

    // Show/hide chat button based on scroll position
    function toggleChatButtonVisibility() {
        if (window.pageYOffset > 300) {
            chatButton.style.display = 'flex';
        } else {
            chatButton.style.display = 'none';
        }
    }

    // Initial check
    toggleChatButtonVisibility();

    // Listen for scroll events
    window.addEventListener('scroll', toggleChatButtonVisibility);
});
