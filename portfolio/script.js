/* ==========================================================================
   AISHWARYA B. - PORTFOLIO INTERACTIVE LOGIC
   Features:
   - Media-Query / Manual Night Mode Switch
   - Vertical Navbar ScrollSpy & Mobile Drawer
   - Project Thumbnail Modals
   - AI Chat Simulation (with API integration hooks)
   - Contact Form (with Resend / Email API hook)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------------------------------
    // 1. NIGHT MODE & THEME CONTROLLER
    // Detects default browser preference via media query and supports manual toggle
    // --------------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const htmlDoc = document.documentElement;

    // Check system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Retrieve stored preference, else adhere to browser default
    const currentStoredTheme = localStorage.getItem('portfolio-theme');

    if (currentStoredTheme) {
        htmlDoc.setAttribute('data-theme', currentStoredTheme);
    } else {
        // If no explicit local storage setting, use system preference
        htmlDoc.setAttribute('data-theme', prefersDarkScheme.matches ? 'dark' : 'light');
    }

    function toggleTheme() {
        const activeTheme = htmlDoc.getAttribute('data-theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
        const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
        
        htmlDoc.setAttribute('data-theme', nextTheme);
        localStorage.setItem('portfolio-theme', nextTheme);
    }

    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

    // Listen for OS system theme changes if user hasn't explicitly overridden
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('portfolio-theme')) {
            htmlDoc.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });

    // --------------------------------------------------------------------------
    // 2. VERTICAL NAVBAR & MOBILE DRAWER NAVIGATION
    // --------------------------------------------------------------------------
    const verticalNavbar = document.getElementById('verticalNavbar');
    const mobileMenuTrigger = document.getElementById('mobileMenuTrigger');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    if (mobileMenuTrigger && verticalNavbar) {
        mobileMenuTrigger.addEventListener('click', () => {
            const isOpen = verticalNavbar.classList.toggle('open');
            mobileMenuTrigger.setAttribute('aria-expanded', isOpen);
        });

        // Auto close drawer when link is clicked on mobile
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                verticalNavbar.classList.remove('open');
                mobileMenuTrigger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ScrollSpy: Update active navigation link on scroll
    function handleScrollSpy() {
        const scrollPosition = window.pageYOffset + 140;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', handleScrollSpy);

    // --------------------------------------------------------------------------
    // 7. PROJECT DETAILS MODAL HANDLER
    // Explaining how each thumbnail is connected to its project detail:
    // Each article.project-thumbnail has a `data-project` key that maps to this data object.
    // --------------------------------------------------------------------------
    const projectDetailsData = {
        "fire-alarm": {
            title: "IoT Enabled Fire Alarm System",
            category: "IoT, Safety, Hardware & Problem Solving",
            image: "assets/fire_alarm.jpg",
            description: "A hardware-software embedded system designed for rapid smoke detection, thermal threshold monitoring, and automated emergency alerts.",
            keyFeatures: [
                "Integration of optical smoke sensors and temperature sensors.",
                "Automated buzzer alarm and real-time status broadcasting via Wi-Fi/GSM module.",
                "Fail-safe power design and threshold tuning to prevent false positives."
            ],
            technologies: ["IoT Sensors", "Microcontroller", "Embedded C / Arduino", "Hardware Circuitry", "Problem Solving"]
        },
        "water-turbidity": {
            title: "Water Turbidity Measuring System",
            category: "Water Quality, Sensors, Measurement & Technology",
            image: "assets/water_turbidity.jpg",
            description: "An optical measurement device engineered to determine the clarity and suspended particle count in water samples for quality assessment.",
            keyFeatures: [
                "Optical infrared turbidity sensor measuring light transmission & scatter.",
                "Microcontroller data calibration translating raw voltage readings to Nephelometric Turbidity Units (NTU).",
                "Instant digital readout on LCD display with threshold quality classification (Clean / Moderate / Turbid)."
            ],
            technologies: ["Turbidity Sensors", "Microcontroller", "C / C++", "ADC Calibration", "Water Measurement Tech"]
        },
        "coming-soon": {
            title: "More Projects In Development",
            category: "Full-Stack Web & AI Engineering",
            image: null,
            description: "New projects spanning modern web applications, algorithmic utilities, and machine learning models are currently in active development.",
            keyFeatures: [
                "Full-stack web application with responsive UI and backend APIs.",
                "Interactive AI/ML data tools and automated problem-solving scripts.",
                "Open-source releases on GitHub."
            ],
            technologies: ["Python", "JavaScript / React", "Data Structures", "APIs"]
        }
    };

    const projectThumbnails = document.querySelectorAll('.project-thumbnail');
    const projectModal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    function openProjectModal(projectId) {
        const project = projectDetailsData[projectId];
        if (!project || !projectModal || !modalBody) return;

        modalBody.innerHTML = `
            ${project.image ? `<div style="border-radius: 12px; overflow: hidden; margin-bottom: 1.2rem; border: 1px solid var(--border-glass-glow);"><img src="${project.image}" alt="${project.title}" style="width: 100%; max-height: 260px; object-fit: cover; display: block;"></div>` : ''}
            <div style="margin-bottom: 1rem;">
                <span class="sub-label" style="font-size: 0.75rem;">${project.category}</span>
                <h2 id="modalTitle" style="font-family: var(--font-heading); font-size: 1.5rem; margin: 0.3rem 0 0.8rem;">${project.title}</h2>
            </div>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.2rem;">${project.description}</p>
            <h4 style="font-size: 0.95rem; margin-bottom: 0.6rem; color: var(--accent-cyan);"><i class="fa-solid fa-list-check"></i> Key Highlights:</h4>
            <ul style="margin-bottom: 1.4rem; padding-left: 1.2rem; color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
                ${project.keyFeatures.map(item => `<li style="margin-bottom: 0.3rem; list-style: disc;">${item}</li>`).join('')}
            </ul>
            <h4 style="font-size: 0.95rem; margin-bottom: 0.6rem; color: var(--accent-purple);"><i class="fa-solid fa-code"></i> Tech Stack:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem;">
                ${project.technologies.map(t => `<span class="tag" style="background: rgba(168,85,247,0.15); color: var(--accent-cyan); border-color: rgba(168,85,247,0.3);">${t}</span>`).join('')}
            </div>
            <div style="text-align: right;">
                <a href="#contact" class="btn btn-primary-glow" onclick="document.getElementById('projectModal').classList.remove('active')">
                    <span>Discuss This Project</span>
                    <i class="fa-solid fa-arrow-right"></i>
                </a>
            </div>
        `;

        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
    }

    projectThumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const projectId = thumb.getAttribute('data-project');
            openProjectModal(projectId);
        });

        thumb.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const projectId = thumb.getAttribute('data-project');
                openProjectModal(projectId);
            }
        });
    });

    if (modalCloseBtn && projectModal) {
        modalCloseBtn.addEventListener('click', () => {
            projectModal.classList.remove('active');
            projectModal.setAttribute('aria-hidden', 'true');
        });

        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove('active');
                projectModal.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // --------------------------------------------------------------------------
    // 8. SELF-INTRODUCTION VIDEO PLAYER HANDLER
    // --------------------------------------------------------------------------
    const customPlayTrigger = document.getElementById('customPlayTrigger');
    const videoBox = document.getElementById('videoBox');
    const selfIntroVideo = document.getElementById('selfIntroVideo');

    function handleVideoPlay() {
        if (!selfIntroVideo) return;

        if (selfIntroVideo.paused) {
            selfIntroVideo.play().then(() => {
                if (videoBox) videoBox.classList.add('is-playing');
            }).catch(err => {
                console.log('Video play interrupted:', err);
            });
        } else {
            selfIntroVideo.pause();
            if (videoBox) videoBox.classList.remove('is-playing');
        }
    }

    if (customPlayTrigger) {
        customPlayTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            handleVideoPlay();
        });
    }

    if (selfIntroVideo && videoBox) {
        selfIntroVideo.addEventListener('play', () => {
            videoBox.classList.add('is-playing');
        });
        selfIntroVideo.addEventListener('pause', () => {
            videoBox.classList.remove('is-playing');
        });
        selfIntroVideo.addEventListener('ended', () => {
            videoBox.classList.remove('is-playing');
        });
    }

    // --------------------------------------------------------------------------
    // 10. AI CHAT INTERFACE SIMULATION
    // Answers questions about education, skills, projects, learning journey, etc.
    // NOTE: For live AI backend integration, replace 'simulateAiResponse' with an API fetch call (e.g. Gemini API / OpenAI API endpoint).
    // --------------------------------------------------------------------------
    const chatAgentForm = document.getElementById('chatAgentForm');
    const chatQueryInput = document.getElementById('chatQueryInput');
    const chatMessagesScreen = document.getElementById('chatMessagesScreen');
    const promptChips = document.querySelectorAll('.prompt-chip');

    const aishwaryaBioKnowledge = {
        education: "Aishwarya B.'s educational background: 1) B.E. in Computer Science & Engineering (focused on Core Systems, Data Structures, & Algorithms), 2) PUC (Class XII) in PCMC (Physics, Chemistry, Mathematics, Computer Science) from S. Nijalingappa PU College, Hosadurga, and 3) SSLC (Class X) from Smt. Indira Gandhi Residential School, Madadakere.",
        skills: "Aishwarya's core technical skills include C, Python, Java, Data Structures, Problem Solving, and Web Development (HTML5, CSS3, JavaScript, APIs).",
        projects: "Aishwarya has engineered notable projects including: 1) IoT Enabled Fire Alarm System (IoT sensors, microcontroller, automated safety alerts), and 2) Water Turbidity Measuring System (optical sensors, calibration, water quality measurement).",
        journey: "Her learning timeline features milestones from 'Engineering Begins' -> 'C Programming' -> 'Python' -> 'Mini Projects' -> 'Problem Solving' -> to 'Currently Growing' as a software engineer.",
        contact: "You can reach Aishwarya directly via email at aishunaik733@gmail.com, view her GitHub at https://github.com/aishunaik02, or connect on LinkedIn at https://www.linkedin.com/in/aishwarya-b-1446b1438 !",
        general: "Hello! I am Aishwarya B.'s portfolio AI assistant. Feel free to ask about her Computer Science degree, coding skills in C/Python/Java, projects, or how to get in touch!"
    };

    function appendChatMessage(sender, messageText) {
        const entryDiv = document.createElement('div');
        entryDiv.className = `chat-entry ${sender === 'user' ? 'user-entry' : 'bot-entry'}`;

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'bot-avatar';
        avatarDiv.innerHTML = sender === 'user' 
            ? '<i class="fa-solid fa-user"></i>' 
            : '<i class="fa-solid fa-wand-magic-sparkles"></i>';

        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'entry-bubble';
        bubbleDiv.innerHTML = messageText;

        entryDiv.appendChild(avatarDiv);
        entryDiv.appendChild(bubbleDiv);
        chatMessagesScreen.appendChild(entryDiv);

        // Auto-scroll screen
        chatMessagesScreen.scrollTop = chatMessagesScreen.scrollHeight;
    }

    function generateBotReply(userPrompt) {
        const query = userPrompt.toLowerCase();
        let reply = aishwaryaBioKnowledge.general;

        if (query.includes('skill') || query.includes('language') || query.includes('c') || query.includes('python') || query.includes('java')) {
            reply = aishwaryaBioKnowledge.skills;
        } else if (query.includes('project') || query.includes('fire alarm') || query.includes('turbidity') || query.includes('iot')) {
            reply = aishwaryaBioKnowledge.projects;
        } else if (query.includes('education') || query.includes('degree') || query.includes('graduate') || query.includes('college')) {
            reply = aishwaryaBioKnowledge.education;
        } else if (query.includes('journey') || query.includes('timeline') || query.includes('milestone')) {
            reply = aishwaryaBioKnowledge.journey;
        } else if (query.includes('contact') || query.includes('email') || query.includes('github') || query.includes('linkedin') || query.includes('reach')) {
            reply = aishwaryaBioKnowledge.contact;
        }

        /* -------------------------------------------------------------
           AI API INTEGRATION HOOK (e.g., Google Gemini API / Custom Backend):
           
           fetch('/api/chat', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ prompt: userPrompt })
           })
           .then(res => res.json())
           .then(data => appendChatMessage('bot', data.reply))
           .catch(err => appendChatMessage('bot', 'Sorry, could not connect to AI service.'));
           ------------------------------------------------------------- */

        // Simulate typing response delay
        setTimeout(() => {
            appendChatMessage('bot', reply);
        }, 450);
    }

    if (chatAgentForm && chatQueryInput) {
        chatAgentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatQueryInput.value.trim();
            if (!text) return;

            appendChatMessage('user', text);
            chatQueryInput.value = '';
            generateBotReply(text);
        });
    }

    promptChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const query = chip.getAttribute('data-query');
            appendChatMessage('user', query);
            generateBotReply(query);
        });
    });

    // --------------------------------------------------------------------------
    // 11. CONTACT FORM WITH EMAIL API INTEGRATION HOOK
    // --------------------------------------------------------------------------
    const contactMessageForm = document.getElementById('contactMessageForm');
    const formAlertFeedback = document.getElementById('formAlertFeedback');

    if (contactMessageForm && formAlertFeedback) {
        contactMessageForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;

            /* -------------------------------------------------------------
               EMAIL API SERVICE INTEGRATION HOOK (e.g., Resend / SendGrid / NodeMailer):
               
               Example with Resend API:
               fetch('https://api.resend.com/emails', {
                   method: 'POST',
                   headers: {
                       'Authorization': 'Bearer YOUR_RESEND_API_KEY',
                       'Content-Type': 'application/json'
                   },
                   body: JSON.stringify({
                       from: 'portfolio@yourdomain.com',
                       to: 'aishunaik733@gmail.com',
                       subject: `New Portfolio Message from ${name}`,
                       html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`
                   })
               });
               ------------------------------------------------------------- */

            // Show confirmation message upon successful submission
            formAlertFeedback.style.display = 'block';
            formAlertFeedback.innerHTML = `✨ Thank you <strong>${name}</strong>! Your message has been sent successfully to Aishwarya B. (aishunaik733@gmail.com).`;
            contactMessageForm.reset();

            setTimeout(() => {
                formAlertFeedback.style.display = 'none';
            }, 6000);
        });
    }
});
