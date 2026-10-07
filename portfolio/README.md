# Aishwarya B. - Personal Portfolio Website

A modern, futuristic, and responsive personal portfolio website for **Aishwarya B.**, Computer Science Engineering Graduate. Built with vanilla semantic HTML5, modern CSS3 (glassmorphism & glowing gradients), and interactive JavaScript.

---

## 🌟 Features & Highlights

- **Hero Section**: Welcoming header with dynamic role badge, tagline (*“Learning. Building. Experimenting. Becoming.”*), and genuine profile photograph.
- **Left Vertical Sidebar Navigation**: Desktop sidebar with glowing active states, scrollspy navigation, quick social links, and an accessible mobile drawer.
- **Night / Light Mode Toggle**: Automatically detects the system theme via CSS media queries (`prefers-color-scheme`) with manual toggle and `localStorage` persistence.
- **About Me & Highlights**: Professional bio, profile card, and 3 core pillar badges (*Graduate*, *Computer Science Engineering*, *Curiosity to Learn*).
- **Education Section**: Dedicated academic background showcase:
  - **B.E. in Computer Science & Engineering**
  - **PUC (Class XII) in PCMC** — *S. Nijalingappa PU College, Hosadurga*
  - **SSLC (Class X)** — *Smt. Indira Gandhi Residential School, Madadakere*
- **Technical Skills**: Visual cards covering C, Python, Java, Data Structures, Problem Solving, and Web Development.
- **Career Milestones Timeline**: 6-stage interactive chronological roadmap.
- **Featured Projects & Modals**: Clickable infographic thumbnails with interactive modal detail popups:
  - *IoT Enabled Fire Alarm System*
  - *Water Turbidity Measuring System*
  - *More Projects Coming Soon*
- **Self-Introduction Video Section**: Responsive 16:9 player container styled with ambient glow effects.
- **Academic Testimonials**: Peer and faculty endorsement cards.
- **Interactive AI Assistant**: Terminal simulation answering visitor queries on education, skills, projects, and contact info (with API integration hooks).
- **Contact Form & Social Media**: Interactive form with feedback notification, plus direct links to LinkedIn, GitHub, and Email.

---

## 📁 Project Structure

```text
portfolio/
├── index.html              # Semantic HTML5 single-page structure
├── style.css               # Futuristic glassmorphism & responsive CSS
├── script.js               # Theme toggle, AI chatbot, modal & scroll logic
├── README.md               # Documentation & deployment guide
└── assets/                 # High-resolution media assets
    ├── aishwarya_profile.jpg   # Profile photograph
    ├── fire_alarm.jpg          # IoT Fire Alarm infographic
    └── water_turbidity.jpg     # Water Turbidity infographic
```

---

## 🚀 Deployment Guide

### Option 1: Deploy to GitHub Pages (Recommended)

1. **Initialize Git Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Aishwarya B. Portfolio Website"
   ```

2. **Create a GitHub Repository**:
   - Go to [GitHub](https://github.com/new) and create a repository (e.g., `portfolio` or `aishwarya-portfolio`).

3. **Push Code to GitHub**:
   ```bash
   git remote add origin https://github.com/aishunaik02/portfolio.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - In your GitHub repository, navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select `main` branch and `/ (root)` directory, then click **Save**.
   - Your website will be live in minutes at: `https://aishunaik02.github.io/portfolio/`

---

### Option 2: Deploy to Vercel

1. Install Vercel CLI (or connect via [Vercel Dashboard](https://vercel.com)):
   ```bash
   npx vercel
   ```
2. Follow the interactive prompts (select current directory `./` as root).
3. Vercel will build and deploy the static site with instant global CDN distribution.

---

### Option 3: Deploy to Netlify

1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop the `portfolio` folder directly into the browser window.
3. Your site will instantly be deployed with a custom live URL and free SSL certificate.

---

## 📬 Contact & Profiles

- **Email**: [aishunaik733@gmail.com](mailto:aishunaik733@gmail.com)
- **LinkedIn**: [linkedin.com/in/aishwarya-b-1446b1438](https://www.linkedin.com/in/aishwarya-b-1446b1438)
- **GitHub**: [github.com/aishunaik02](https://github.com/aishunaik02)

---

&copy; 2026 Aishwarya B. All rights reserved.
