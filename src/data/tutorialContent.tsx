import React from "react";

export interface TutorialStep {
  num: number;
  title: string;
  text?: string;
  node?: React.ReactNode;
  code?: string;
  codeSnippet?: string;
}

export interface TutorialPart {
  title: string;
  description: string;
  steps: TutorialStep[];
}

export interface TutorialContent {
  headerTag: string;
  headerMeta: string;
  beforeYouBegin: React.ReactNode;
  overviewSteps: { num: string; label: string }[];
  parts: TutorialPart[];
  tipCallout?: {
    title: string;
    text: string;
  };
  interfaceNoteCallout?: {
    title: string;
    text: string;
  };
  verificationChecklist: string[];
  referenceTable: {
    headers: string[];
    rows: { col1: string; col2: string }[];
  };
  completionText: string;
  footerTag: string;
}

export const TUTORIAL_CONTENTS: Record<string, TutorialContent> = {
  "install-opencode-and-connect-nvidia-free-models": {
    headerTag: "OpenCode Setup Guide",
    headerMeta: "OpenCode + NVIDIA Free Models",
    beforeYouBegin: "You need a terminal, an internet connection, and an NVIDIA account. Never publish or share your API key.",
    overviewSteps: [
      { num: "01", label: "Install" },
      { num: "02", label: "Initialize" },
      { num: "03", label: "Add API Key" },
      { num: "04", label: "Select Model" },
    ],
    parts: [
      {
        title: "Part 1 - Install and Start OpenCode",
        description: "Follow these steps in your terminal to install OpenCode and view the available models.",
        steps: [
          {
            num: 1,
            title: "Open the OpenCode website",
            node: (
              <>
                Visit{" "}
                <a
                  href="https://opencode.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-700 transition"
                >
                  opencode.ai
                </a>{" "}
                and locate the installation command. You can also use the command shown below.
              </>
            ),
            code: "curl -fsSL https://opencode.ai/install | bash",
          },
          {
            num: 2,
            title: "Run the installation command",
            text: "Open Terminal, paste the command, and press Enter. The installer will download and configure OpenCode on your computer.",
          },
          {
            num: 3,
            title: "Initialize OpenCode",
            text: "After installation finishes, type the following command and press Enter. OpenCode will initialize in the terminal.",
            codeSnippet: "opencode",
          },
          {
            num: 4,
            title: "Open the model list",
            text: "Inside the OpenCode terminal chat, enter the slash command below. This displays the models and providers currently available.",
            codeSnippet: "/models",
          },
        ],
      },
      {
        title: "Part 2 - Create an NVIDIA API Key",
        description: "Use NVIDIA Build to access models that provide a free endpoint.",
        steps: [
          {
            num: 5,
            title: "Create or sign in to your NVIDIA account",
            node: (
              <>
                Go to{" "}
                <a
                  href="https://build.nvidia.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-700 transition"
                >
                  build.nvidia.com
                </a>{" "}
                and sign up or sign in with your NVIDIA account.
              </>
            ),
          },
          {
            num: 6,
            title: "Filter for free endpoints",
            text: "Open the Models section. In the filters on the left, select Free Endpoint, then apply the filter to display eligible models.",
          },
          {
            num: 7,
            title: "Open your profile",
            text: "Go to your profile menu and select Generate API Key.",
          },
          {
            num: 8,
            title: "Generate the key",
            text: "Enter a recognizable name for the key, such as OpenCode, and generate it.",
          },
          {
            num: 9,
            title: "Copy and store the API key securely",
            text: "Copy the generated API key immediately. Store it in a password manager or another secure location. Do not include it in screenshots, public repositories, or shared documents.",
          },
        ],
      },
      {
        title: "Part 3 - Connect NVIDIA to OpenCode",
        description: "Return to OpenCode and connect the NVIDIA provider using the API key you generated.",
        steps: [
          {
            num: 10,
            title: "Open the model menu again",
            text: "In the OpenCode terminal, type the model command.",
            codeSnippet: "/models",
          },
          {
            num: 11,
            title: "Open provider connections",
            text: "Use the provider connection shortcut shown in OpenCode. In the workflow described here, press Ctrl+A to open Connected Providers.",
          },
          {
            num: 12,
            title: "Find NVIDIA",
            text: "Search for NVIDIA in the provider list, then select NVIDIA.",
          },
          {
            num: 13,
            title: "Enter the API key",
            text: "When the API Key field appears, paste the NVIDIA API key and confirm.",
          },
          {
            num: 14,
            title: "Choose a free NVIDIA model",
            text: "Open /models again. The available NVIDIA models should now appear. Select the model you want to use.",
          },
          {
            num: 15,
            title: "Start using the model",
            text: "Begin a new prompt in OpenCode. Your selected NVIDIA model is now ready to use.",
          },
        ],
      },
    ],
    tipCallout: {
      title: "Tip",
      text: "If the opencode command is not recognized, close and reopen Terminal, then run the command again.",
    },
    interfaceNoteCallout: {
      title: "Interface note",
      text: "Keyboard shortcuts and menu labels may change between OpenCode versions. Follow the provider connection instructions displayed in your terminal if they differ from this guide.",
    },
    verificationChecklist: [
      "OpenCode launches when you run opencode.",
      "/models opens the model selection menu.",
      "NVIDIA appears as a connected provider.",
      "Your NVIDIA models are visible in the model list.",
      "A test prompt produces a response without an authentication error.",
    ],
    referenceTable: {
      headers: ["Command", "Purpose"],
      rows: [
        { col1: "curl -fsSL https://opencode.ai/install | bash", col2: "Install OpenCode" },
        { col1: "opencode", col2: "Start or initialize OpenCode" },
        { col1: "/models", col2: "Open the model and provider menu" },
      ],
    },
    completionText: "Setup complete - OpenCode is ready with NVIDIA free models.",
    footerTag: "OpenCode + NVIDIA Free Models | Quick Documentation",
  },
  "configure-agent-router-api-tokens-and-third-party-inference": {
    headerTag: "Agent Router Guide",
    headerMeta: "Agent Router API Tokens & Third-Party Inference",
    beforeYouBegin: "You will need an active Agent Router account, access to your development environment, and your target application running. Never publish or share your API tokens.",
    overviewSteps: [
      { num: "01", label: "Access Console" },
      { num: "02", label: "Create Token" },
      { num: "03", label: "Configure App" },
      { num: "04", label: "Restart & Run" },
    ],
    parts: [
      {
        title: "Part 1 - Access Agent Router & Locate Console",
        description: "Navigate to the Agent Router platform and open the token management console.",
        steps: [
          {
            num: 1,
            title: "Access and log into Agent Router",
            node: (
              <>
                Go to the{" "}
                <a
                  href="https://agentrouter.org/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-700 transition"
                >
                  Agent Router platform website
                </a>{" "}
                and log in using your preferred authentication method: Continue with GitHub, Continue with LinuxDO, or Sign in with Email or Username.
              </>
            ),
          },
          {
            num: 2,
            title: "Navigate to the API Token Console",
            text: "Once inside your dashboard, locate the left sidebar under CONSOLE and click on API Token to view your tokens list.",
          },
        ],
      },
      {
        title: "Part 2 - Create and Configure a New API Token",
        description: "Generate a new custom API token to authenticate your application's requests.",
        steps: [
          {
            num: 3,
            title: "Click Create Token",
            text: "Click the green Create token button located at the top of the page.",
          },
          {
            num: 4,
            title: "Configure token parameters",
            text: "In the configuration modal, set your parameters: Name (enter a clear identifier, e.g., claude), Expiration Time, and Quota (assign a custom starting balance or enable Unlimited quota). You can also set optional Model Restrictions.",
          },
          {
            num: 5,
            title: "Generate the token",
            text: "Click Submit to generate the token.",
          },
          {
            num: 6,
            title: "Copy the token to clipboard",
            text: "Locate your new token in the list and click the Copy button to save it securely.",
          },
        ],
      },
      {
        title: "Part 3 - Configure Third-Party Inference & Restart",
        description: "Update your application's gateway settings with the API token and restart to apply changes.",
        steps: [
          {
            num: 7,
            title: "Open developer configurations",
            text: "Open your development environment or application interface. Navigate to the top menu bar, click on Developer, and select Configure Third-Party Inference... from the dropdown options.",
          },
          {
            num: 8,
            title: "Update the Base URL",
            text: "Change the Base URL setting endpoint to point to Agent Router.",
            codeSnippet: "https://api.agentrouter.org/v1",
          },
          {
            num: 9,
            title: "Configure gateway authentication schema",
            text: "Locate the authentication schema setting and set it to x-api-key. For the key type dropdown, select Static API Key.",
            codeSnippet: "x-api-key",
          },
          {
            num: 10,
            title: "Paste the API token",
            text: "Paste your copied Agent Router API token into the designated key field.",
          },
          {
            num: 11,
            title: "Apply and save changes",
            text: "Click Apply and Save to commit your configuration changes.",
          },
          {
            num: 12,
            title: "Restart and deploy",
            text: "The application will automatically restart to apply the new settings. Once the restart completes, your third-party inference integration is fully ready for use!",
          },
        ],
      },
    ],
    tipCallout: {
      title: "Token Expiration",
      text: "For local development, choosing a longer expiration time prevents frequent reconfiguration, but shorter lifetimes are recommended for testing.",
    },
    interfaceNoteCallout: {
      title: "Authentication Header",
      text: "Make sure you set the custom header key exactly to x-api-key. Using a standard Authorization header instead might cause connection issues.",
    },
    verificationChecklist: [
      "Logged into Agent Router platform dashboard.",
      "Generated a new API token and saved it securely.",
      "Base URL updated in application's developer settings.",
      "Authentication schema set to x-api-key with Static API Key selected.",
      "Token pasted and settings saved.",
      "Application restarted successfully and connects without errors.",
    ],
    referenceTable: {
      headers: ["Setting / Field", "Expected Value / Format"],
      rows: [
        { col1: "Base URL", col2: "https://api.agentrouter.org/v1" },
        { col1: "Gateway Auth Schema", col2: "x-api-key" },
        { col1: "Key Type", col2: "Static API Key" },
        { col1: "API Token", col2: "Your copied Agent Router API token" },
      ],
    },
    completionText: "Setup complete - Your application is now configured with Agent Router for third-party inference.",
    footerTag: "Agent Router Integration | Quick Documentation",
  },
  "cinematic-ai-clone-professional-implementation-guide": {
    headerTag: "AI Video Guide",
    headerMeta: "Cinematic AI Clone Workflow",
    beforeYouBegin: (
      <>
        You need a video file of your subject, access to{" "}
        <a
          href="https://labs.google/fx/tools/flow"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-700 transition font-semibold"
        >
          Google Flow Labs
        </a>{" "}
        (which offers credits or Unlimited Free Nano Banana Pro for AI Pro plan holders), and basic video editing tools to cut raw video into chunks.
      </>
    ),
    overviewSteps: [
      { num: "01", label: "Frame Capture" },
      { num: "02", label: "Initial Image" },
      { num: "03", label: "Video Chunking" },
      { num: "04", label: "Batch Gen & Continuity" },
    ],
    parts: [
      {
        title: "Part 1 - Preparation & Setup",
        description: "Capture keyframes and access the creative studio.",
        steps: [
          {
            num: 1,
            title: "Capture the best frame from your video",
            text: "Select and export a high-quality, clear frame from your source video (referred to as Image 1). This frame represents the desired facial expression and alignment of your subject.",
          },
          {
            num: 2,
            title: "Go to Google Flow Labs",
            node: (
              <>
                Navigate to{" "}
                <a
                  href="https://labs.google/fx/tools/flow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-700 transition"
                >
                  labs.google/fx/tools/flow
                </a>
                . This platform offers Unlimited Free Nano Banana Pro and a generous amount of credits to generate video. If you have a Google AI Pro plan, you will get 1k-2k monthly credits, which is perfect for continuous video generation.
              </>
            ),
          },
        ],
      },
      {
        title: "Part 2 - Reference Portrait Generation",
        description: "Generate the base cinematic portrait in Flow Labs.",
        steps: [
          {
            num: 3,
            title: "Generate the base cinematic portrait using Nano Banana Pro",
            text: "Use Nano Banana Pro with the following prompt. Make sure to reference the captured frame (Image 1) and your target clothing source (Image 0).",
            code: "A high-resolution cinematic portrait of the man from [Image 1], maintaining his pose and facial features, but wearing the black hoodie from [Image 0]. The flat lighting is replaced by a professional three-point setup in a dark studio. On the viewer's left, a powerful, directional edge light of a [WARM GOLD HUE] is used as a rim light, outlining his shoulder and hair. In the background on the left, the LED light tube glows with this [GOLD LIGHT]. On the viewer's right, a contrasting background light of a [DEEP ROYAL PURPLE HUE] illuminates the wall and the potted plant. His face is primarily lit by a soft, directional front key light to maintain detail, while the purple and gold colors create subtle highlights on his skin. A shallow depth of field keeps the subject sharp against the atmospheric, colored background.",
          },
        ],
      },
      {
        title: "Part 3 - Video Processing & Continuity",
        description: "Chunk the source video and run the generator with continuity references.",
        steps: [
          {
            num: 4,
            title: "Cut the raw video into 10-second chunks",
            text: "Using a video editor of your choice, split your raw talking head video into 10-second chunks to ensure optimal processing and detail preservation in the generation phase.",
          },
          {
            num: 5,
            title: "Process the first chunk in Agent Mode",
            text: "Select Google Omni Flash. Upload the first 10-second video chunk and provide the newly generated cinematic portrait as the reference image. Apply the prompt below:",
            code: "Change the subject's clothing to a [solid black pullover hoodie]. Replace the background with a dark, professional studio setup. Implement high-definition cinematic lighting with a split color scheme: a strong, warm [orange] rim light on the subject's left side and a cool [teal/cyan] fill light on the right side. Add a soft key light perfectly illuminating the subject's face with deep, rich shadows. In the background, place a glowing vertical orange tube light on the left and a softly blurred, dark green potted plant on the right.",
          },
          {
            num: 6,
            title: "Process subsequent chunks with sequential reference",
            text: "Repeat this process for the other video chunks. From the second chunk onwards, provide the immediately preceding generated video chunk as a visual reference to maintain perfect continuity.",
          },
        ],
      },
    ],
    tipCallout: {
      title: "Look Combinations",
      text: "The key to a dynamic background is using complementary or contrasting colors. If you want to change the vibe, you can replace the [GOLD] and [PURPLE] (or [orange] and [teal]) with one of these combinations: Cyberpunk ([DEEP MAGENTA] & [ELECTRIC CYAN]), Earthly ([WARM AMBER] & [FOREST GREEN]), Classic Moody ([FIRE RED] & [DEEP BLUE]), or Soft Pastels ([SOFT PINK] & [MINT GREEN]).",
    },
    interfaceNoteCallout: {
      title: "Motion & Structure Constraints",
      text: "Preserve: Exact original facial expressions, lip-sync, eye contact, hand gestures, and head movements. Do not alter the subject's face, hair structure, or body positioning. Negative Prompt: Bright background, flat lighting, daylight, patterned clothing, striped shirt, altered motion, warping, flickering, changing identity, distorted hands.",
    },
    verificationChecklist: [
      "Extracted a high-quality frame (Image 1) from the raw video.",
      "Logged into Google Flow Labs and verified available credits.",
      "Generated base cinematic portrait using Nano Banana Pro.",
      "Cut raw video into 10-second segments.",
      "First segment styled in Agent Mode referencing the generated portrait.",
      "Subsequent segments generated referencing the prior output to maintain visual continuity.",
    ],
    referenceTable: {
      headers: ["Vibe / Style Option", "Complementary Colors"],
      rows: [
        { col1: "Cyberpunk", col2: "[DEEP MAGENTA] & [ELECTRIC CYAN]" },
        { col1: "Earthly", col2: "[WARM AMBER] & [FOREST GREEN]" },
        { col1: "Classic Moody", col2: "[FIRE RED] & [DEEP BLUE]" },
        { col1: "Soft Pastels", col2: "[SOFT PINK] & [MINT GREEN]" },
      ],
    },
    completionText: "Workflow complete! Your cinematic AI clone video is fully generated with perfect style and motion consistency.",
    footerTag: "Cinematic AI Clone Guide | Creative Lab Documentation",
  },
  "design-premium-portfolio-website-lovable-ai": {
    headerTag: "Lovable AI Design Workflow",
    headerMeta: "Lovable AI + Editorial Portfolio Prompt",
    beforeYouBegin: (
      <>
        Prepare your resume, biography, or professional document in PDF or text format. Lovable AI will use it as the single source of truth for all portfolio content. Do not fabricate experience or qualifications.
      </>
    ),
    overviewSteps: [
      { num: "01", label: "Prompt Setup" },
      { num: "02", label: "Visual Direction" },
      { num: "03", label: "Structure & Motion" },
      { num: "04", label: "Review & Deploy" },
    ],
    parts: [
      {
        title: "Part 1 - System Setup & Master Prompt Injection",
        description: "Attach your source document and feed the 20-point master prompt into Lovable AI to establish single source-of-truth rules.",
        steps: [
          {
            num: 1,
            title: "Prepare your reference document",
            text: "Gather your resume, biography, or professional profile. Upload this document directly to Lovable AI alongside your design request. Make sure the document includes accurate position titles, projects, tools, and social links.",
          },
          {
            num: 2,
            title: "Copy the Master Lovable AI Prompt",
            text: "Copy the full 20-point master prompt below and paste it into the Lovable AI prompt field after uploading your reference document:",
            code: `# Personal Portfolio Website — Design & Development Prompt

Create a premium, modern, highly polished personal website using the attached document as the primary source of truth for all website content. The uploaded document may be a resume, professional profile, company profile, biography, business document, portfolio brief, or any other document containing information intended for the website.

The website should feel like it was designed and developed by a professional designer/developer, NOT like a generic AI-generated portfolio template.

## 1. Main Goal
Build a personal or professional website that accurately reflects the person, business, brand, company, or organization described in the uploaded document. Determine the appropriate positioning, audience, tone, sections, and content structure from the document rather than assuming the subject is a designer, developer, entrepreneur, or job seeker.

The website should immediately communicate:
* Professionalism
* Creativity
* Technical ability
* Strong visual design skills
* Attention to detail
* Real-world experience

Do not invent experience, clients, companies, projects, awards, statistics, or qualifications. Use information from the attached resume.

---

## 2. Visual Direction
Use a minimal, premium, editorial-style UI with strong typography and generous whitespace.

Avoid:
* Generic portfolio templates
* Excessive gradients
* Overused glassmorphism
* Too many cards
* Excessive rounded corners
* Stock-looking illustrations
* Unnecessary icons
* Huge amounts of text
* Random decorative elements

The design should feel closer to a high-end creative studio portfolio than a typical developer portfolio.

Design characteristics:
* Clean grid system
* Strong typography
* Large visual hierarchy
* Excellent spacing
* Subtle borders
* Smooth transitions
* Minimal color palette
* Strong contrast
* Responsive layouts
* Sophisticated micro-interactions

Use a modern sans-serif typeface such as Inter, Space Grotesk, or a similar premium geometric font.

---

## 3. Homepage Structure

### Hero Section
Create a visually impressive hero section.

Include:
Small eyebrow text:
GRAPHIC DESIGNER · WEB DEVELOPER · PRESENTATION DESIGNER

Then display my name prominently.

Create an animated headline based on my actual professional positioning.
Example structure:
I DESIGN DIGITAL EXPERIENCES.
or
DESIGN. CODE. CREATE.

Use the resume to refine the wording.

Hero animations:
* Text reveal animation
* Character/word stagger animation
* Subtle image movement
* Smooth entrance animations
* Mouse-follow interaction where appropriate
* Subtle parallax
* Animated underline/accent
* Smooth hover interactions

Add a short professional introduction derived from the resume.
Add CTA buttons: "View My Work", "Let's Work Together". Include a subtle scroll indicator.

---

## 4. Text Effects
Use sophisticated text animations throughout the website.
Implement several effects where appropriate:
* Text Reveal (line-by-line when entering viewport)
* Word Stagger (sequential appearance)
* Character Reveal (for major headings)
* Text Mask Reveal (clipping/masking animation)
* Hover Text Animation (smooth text transitions on buttons/links)
* Scramble / Decode Effect (subtle character scramble for headings/labels)

---

## 5. About Section
Create a clean editorial-style About section.
Use information from the resume.
Possible layout:
LEFT: Large heading: ABOUT
RIGHT: Professional introduction and short biography.
Add selected facts: Years of experience, Core disciplines, Technologies, Design tools.

---

## 6. Experience Section
Create a premium timeline or editorial experience layout.
Each experience should contain: Company, Position, Date, Location, Short description, Key responsibilities, Technologies/tools.
Use a minimal timeline interaction on hover: highlight active item, slightly animate year/title, reveal additional information.

---

## 7. Selected Work / Projects
Create a visually strong portfolio section using projects from the resume.
Each project should feel like a case-study preview with large project blocks:
Project name, Category, Short description, Tools/technologies, Visual preview, View Project CTA.
On hover: Image scales slightly, cursor interaction, title moves subtly, arrow animates smoothly.

---

## 8. Skills & Tools
Group skills logically: Design, Development, Creative Tools, AI Workflow.
Experiment with typography lists, interactive marquee, or horizontal scrolling skill bands instead of standard cards.

---

## 9. Services
Create a concise services section based on professional capabilities (Graphic Design, Web Development, Presentation Design, UI/UX).

---

## 10. Contact Section
Create a visually strong final CTA.
Large headline: HAVE A PROJECT IN MIND?
Include Email, LinkedIn, GitHub, Portfolio links, and prominent CTA: Let's Talk →.

---

## 11. Navigation
Minimal sticky navigation.
Desktop: Logo/Name on left, links on right (About, Experience, Work, Skills, Contact) + CTA button.
Mobile: Clean animated drawer menu.

---

## 12. Scroll Animations & Motion
Use GSAP + ScrollTrigger or Framer Motion for fade-up reveals, text clipping, and image parallax. Respect prefers-reduced-motion.

---

## 13. Cursor Interactions
Subtle custom cursor: expands over clickables, magnetic CTAs, custom cursor label ('VIEW' over project images).

---

## 14. Responsive Design & UX Requirements
Fully responsive for Large desktop, Laptop, Tablet, Mobile. Clear visual hierarchy, strong contrast, accessible typography, keyboard navigation, visible focus states.

---

## 15. Technical Stack
React, TypeScript, Tailwind CSS, GSAP / Framer Motion, Semantic HTML, modular reusable component architecture.`,
          },
          {
            num: 3,
            title: "Set core prompt constraints",
            text: "Instruct Lovable AI to strictly enforce content boundaries: no fabricated client logos, fake metrics, dummy testimonials, or generic boilerplate cards.",
          },
        ],
      },
      {
        title: "Part 2 - Visual Aesthetics & Architectural Foundation",
        description: "Configure typography hierarchy, minimal color palette, grid system, and layout structure.",
        steps: [
          {
            num: 4,
            title: "Establish typography & font pairing",
            text: "Select a high-end geometric sans-serif font such as Inter, Space Grotesk, or Outfit. Define tight tracking for bold uppercase headings and spacious leading for editorial body text.",
          },
          {
            num: 5,
            title: "Implement minimal grid & color tokens",
            text: "Use high contrast monochromatic tones with subtle border accents (e.g. slate-900/white with 5-10% opacity borders). Avoid loud gradients or heavy shadows.",
          },
          {
            num: 6,
            title: "Build sticky navigation & drawer menu",
            text: "Create a lightweight, minimal sticky navbar. On scroll, apply subtle background blur and border transitions. Configure a clean responsive drawer menu for mobile viewports.",
          },
        ],
      },
      {
        title: "Part 3 - Hero, Editorial Sections & Motion Design",
        description: "Build section components with sophisticated GSAP / Framer Motion entrance reveals.",
        steps: [
          {
            num: 7,
            title: "Design the Hero section & headline reveal",
            text: "Add small uppercase eyebrow text indicating core disciplines. Add an animated staggered text reveal for the main positioning headline (e.g., 'I DESIGN DIGITAL EXPERIENCES').",
          },
          {
            num: 8,
            title: "Structure About & minimal Experience timeline",
            text: "Format the About section in a 2-column editorial layout (left: large heading; right: resume bio & metrics). Create an interactive timeline for work experience with subtle hover highlights.",
          },
          {
            num: 9,
            title: "Create Case-Study Project cards & interactive Skills",
            text: "Display projects as large asymmetric case-study previews with hover image scaling and custom magnetic cursor labels ('VIEW'). Organize skills into dynamic marquees or clean typography lists.",
          },
          {
            num: 10,
            title: "Add Contact CTA & subtle magnetic interactions",
            text: "Construct a high-impact final contact section with large headline ('HAVE A PROJECT IN MIND?'), social links, and magnetic interactive buttons.",
          },
        ],
      },
      {
        title: "Part 4 - Polish, Performance & Responsiveness",
        description: "Audit responsiveness, accessibility, reduced motion settings, and export clean code.",
        steps: [
          {
            num: 11,
            title: "Enforce prefers-reduced-motion accessibility",
            text: "Wrap all GSAP and Framer Motion animations in prefers-reduced-motion media query checks to ensure accessibility compliance.",
          },
          {
            num: 12,
            title: "Test responsive mobile layouts",
            text: "Verify mobile viewports (375px to 768px): prevent horizontal overflows, disable complex magnetic cursors, and ensure tap targets are at least 44px.",
          },
          {
            num: 13,
            title: "Export project to GitHub / Vercel",
            text: "Export the clean modular React/TypeScript codebase from Lovable AI to your GitHub repository and connect to Vercel/Netlify for automatic deployment.",
          },
        ],
      },
    ],
    tipCallout: {
      title: "Content Accuracy Rule",
      text: "Never let the AI generate dummy experience or filler skills. Lovable AI should strictly rely on your attached document as the sole source of truth.",
    },
    interfaceNoteCallout: {
      title: "Recommended Tech Stack in Lovable AI",
      text: "Ensure Lovable AI selects React + TypeScript + Tailwind CSS with GSAP or Framer Motion for optimal animation performance and maintainable code architecture.",
    },
    verificationChecklist: [
      "Attached resume/profile as the sole source of truth before prompt execution.",
      "Imported premium geometric typography (Inter / Space Grotesk / Outfit).",
      "Staggered text reveal and scroll-triggered animations active.",
      "Asymmetric case-study project cards created with custom hover interaction.",
      "Mobile navigation drawer tested without layout shift or horizontal scroll.",
      "Pre-flight UX & performance check completed before production deployment.",
    ],
    referenceTable: {
      headers: ["Prompt Component", "Design & Technical Standard"],
      rows: [
        { col1: "Hero Section", col2: "Eyebrow text + animated headline reveal + CTAs + parallax scroll" },
        { col1: "Experience Timeline", col2: "Minimal editorial layout, subtle active item highlight on hover" },
        { col1: "Selected Projects", col2: "Case-study preview block, slight image scale, magnetic cursor label" },
        { col1: "Skills & Tools", col2: "Categorized typography list or interactive marquee (no generic grids)" },
        { col1: "Motion & UX", col2: "GSAP / ScrollTrigger, fast & elegant, prefers-reduced-motion ready" },
      ],
    },
    completionText: "Master prompt setup complete! Your Lovable AI personal portfolio website is professionally designed, structured, and ready for deployment.",
    footerTag: "Lovable AI Web Design Guide | Portfolio Master Prompt",
  },
};
