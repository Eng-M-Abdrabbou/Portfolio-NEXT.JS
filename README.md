# Mahmoud's Portfolio

## Introduction

This project is a personal portfolio engineered with Next.js, TypeScript, and Tailwind CSS. It's more than just a list of projects—it’s an experience. Crafted with a cosmic theme, it serves as an interactive showcase of my projects and skills, featuring 3D animations, a Gemini-powered chatbot, and a pixel-perfect responsive design. Crafted with bleeding-edge technologies and a passion for innovative design, it serves as a testament to what’s possible when code meets creativity. Explore, interact, and see the future of web development in action. 🚀

<img src="/public/img/Portfolio/6.png" alt="Portfolio Showcase" width="800"/>

## Live Demo 

* **Explore the Live Site:** [**portfolio.dev**](https://portfolio-next-js-eng-m-abdrabbous-projects.vercel.app/)

## Key Features

* **Interactive 3D Laptop ⌨️:** Engage with a custom Spline 3D Laptop where you can spin it and move it however you like and it reacts to hovering on it.
* **AI-Powered Chatbot 🤖:** Interact with an integrated chatbot powered by the Gemini SDK for instant answers and engagement.
* **Dynamic Animation Suite ✨:** Utilizes GSAP and Framer Motion for fluid, captivating animations on scroll, hover, and page load.
* **Full Multimedia Experience 🎶:** Features a built-in music player, auto-playing carousels, and an integrated blog to enrich the user experience.
* **Immersive Cosmic Theme 🌌:** Explore projects in a stunning space-themed UI with animated particles for an unforgettable digital journey.
* **Cutting-Edge UI/UX 🎨:** Built with a modern tech stack including Aceternity UI and Shadcn for a clean, intuitive, and innovative user experience.

* **Seamless Navigation Tools 🧭:** Offers effortless Browse with features like auto-scroll, a light/dark mode, and dynamic project showcases.
* **Pixel-Perfect Responsive Design 📱:** Delivers a flawless and optimized experience across all devices, from widescreen monitors to mobile phones.

## Technology Stack

**Frontend**

* **Framework:** Next.js
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Core Libraries:**
    * React
    * Framer Motion (Animations)
    * GSAP (Animations)
    * Spline (3D Scenes)
* **UI Components:**
    * Aceternity UI
    * Shadcn/ui

**Backend**

* **Runtime:** Node.js
* **AI Integration:** Gemini SDK

## Screenshots

Here are a few glimpses of the portfolio in action.

<img src="/public/img/Portfolio/2.png" alt="Project Section" width="400" /> <img src="/public/img/Portfolio/3.png" alt="Experience Section" width="400" />
<img src="/public/img/Portfolio/4.png" alt="Footer Section" width="400" /> <img src="/public/img/Portfolio/5.png" alt="Hero Section Detail" width="400" />

## 📂 Folder Structure

The project is structured using the Next.js App Router paradigm. Key directories are organized to maintain a clean and scalable codebase.

```
Portfolio-NEXT.JS/
├── public/                 # Static assets (images, fonts, music, etc.)
│   ├── img/
│   └── music/
├── src/
│   ├── app/                # Main application folder (App Router)
│   │   ├── api/            # API routes (e.g., chatbot)
│   │   ├── blog/           # Blog pages and posts data
│   │   ├── components/     # Page-level components and sections
│   │   │   └── sections/
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Main entry page
│   ├── components/         # Reusable UI components (shadcn/ui, custom)
│   │   ├── ui/
│   │   └── magicui/
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utility functions and shared logic
├── .env.local              # Local environment variables (API keys)
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── package.json            # Project dependencies and scripts
```

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have the following installed on your machine:
* **Node.js** (v18.x or later recommended)
* **npm**, **yarn**, or **pnpm** package manager

### Installation

1.  **Clone the Repository**
    ```sh
    git clone [https://github.com/Eng-M-Abdrabbou/Portfolio-NEXT.JS.git](https://github.com/Eng-M-Abdrabbou/Portfolio-NEXT.JS.git)
    ```

2.  **Navigate to the Project Directory**
    ```sh
    cd Portfolio-NEXT.JS
    ```

3.  **Install Dependencies**
    Choose your preferred package manager:
    ```sh
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

4.  **Set Up Environment Variables**
    Create a `.env.local` file in the root of the project and add your Google Gemini API key. This is required for the AI chatbot to function.
    ```
    GEMINI_API_KEY='YOUR_GEMINI_API_KEY_HERE'
    ```

5.  **Run the Development Server**
    ```sh
    npm run dev
    ```

6.  **See the Magic!**
    Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## ☁️ Deployment

This site is optimized for and deployed on **Vercel**. For your own deployment, follow these recommended steps:

1.  **Push to a Git Repository:** Push your finalized code to a GitHub, GitLab, or Bitbucket repository.
2.  **Import to Vercel:** Connect your Git repository to your Vercel account. Vercel will automatically detect that it's a Next.js project.
3.  **Configure Environment Variables:** In your Vercel project settings, navigate to the "Environment Variables" section and add the `GEMINI_API_KEY` with its value.
4.  **Deploy:** Vercel will build and deploy your project. Any subsequent pushes to the main branch will trigger automatic redeployments.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
