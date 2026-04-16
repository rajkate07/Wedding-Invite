# 💍 Wedding Invitation

A premium, interactive, and responsive wedding invitation website designed with modern aesthetics and traditional Indian touches. 

## ✨ Live Demo
[View the Invitation](https://wedding-invite-rajkate.vercel.app/) *(Placeholder link - replace with yours)*

## 🏰 The Opening Experience
The website features a **Royal Door Entry** animation. Guests land on a closed, carved wooden door with golden mandala engravings. 
- **Action:** Tap the "Open Invitation" button.
- **Effect:** The doors split open from the center, accompanied by falling marigold petals, revealing the grand celebration behind.

## 🌟 Key Features
- **Royal Entry Animation:** Immersive split-door opening effect.
- **Countdown Timer:** Real-time countdown to the big day (May 1, 2026).
- **Interactive RSVP:** Integrated with **Formspree** to receive guest responses directly in your email.
- **Event Timeline:** Beautifully designed cards for Haldi and the Wedding Ceremony.
- **Venue & Map:** Integrated venue details with a direct link to Google Maps.
- **Responsiveness:** Fully optimized for mobile, tablet, and desktop viewing.
- **Premium Aesthetics:** Warm gold and deep maroon color palette, elegant typography, and subtle micro-animations.

## 🛠️ Built With
- **Vite** - For lightning-fast development and build.
- **React.js** - For modular components and state management.
- **Vanilla CSS** - For custom, high-performance animations and glassmorphism effects.
- **Formspree** - For reliable email-based RSVP handling.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/rajkate07/Wedding-Invite.git
   ```
2. Navigate to the project directory:
   ```bash
   cd wedding-invite
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📦 Deployment
The project is optimized for deployment on **Vercel** or **Netlify**.
1. Run the build command:
   ```bash
   npm run build
   ```
2. Upload the `dist/` folder to your preferred hosting platform.

## 💌 Connect RSVP
To receive emails from the RSVP form:
1. Create a free account at [formspree.io](https://formspree.io).
2. Create a new form and get your **Form ID**.
3. Replace the ID in `src/App.jsx`:
   ```javascript
   const formspreeUrl = "https://formspree.io/f/YOUR_FORM_ID";
   ```

---
**Crafted with ❤️ by Raj Kate**  
*Wishing Shridhar & Gouri a lifetime of happiness!*
