# FixMyIoT – AI-Powered IoT Troubleshooter

FixMyIoT is an intelligent web application that helps IoT developers, hobbyists, students, and makers solve problems in their IoT projects.  
It’s like having an AI expert that can look at your hardware setup, understand your problem, and give you step-by-step solutions.

---

## 🚀 Key Features

### 🔐 Smart Authentication
- Secure login via **Replit Auth**
- Landing page for visitors  
- Protected dashboard & results page (login required)  
- User-specific data – your queries are private  

### 🏠 Multi-Page Application
- **Landing Page:** Introduction & platform overview  
- **Dashboard:** Main troubleshooting form  
- **Results Page:** AI analysis & solutions  
- **Past Queries:** Troubleshooting history with search & filter  

### 🤖 AI-Powered Troubleshooting
- Upload images of your IoT setup  
- Describe your problem in detail  
- Select your microcontroller (ESP32, Arduino, Raspberry Pi, etc.)  
- Choose project type & components  
- Receive **diagnosis + step-by-step fixes** powered by **OpenAI GPT-4o**  

### 📱 Modern User Experience
- Fully responsive design (mobile, tablet, desktop)  
- Easy-to-use forms with validation  
- Clean UI with **custom color scheme**  
- Searchable query history  

---

## 🛠 Technical Architecture

### **Frontend** – React + TypeScript
- **Routing:** Multi-page navigation with protected routes  
- **State Management:** TanStack Query  
- **UI Components:** Radix UI + Tailwind CSS  
- **Forms:** React Hook Form with validation  

### **Backend** – Node.js + Express
- **Authentication:** Replit Auth + session management  
- **File Upload:** Image handling for IoT setup photos  
- **AI Integration:** OpenAI GPT-4o for text & image analysis  
- **Data Storage:** In-memory storage (chosen over DB for dev/testing)  

---

## 🤖 AI Integration
- **Model:** OpenAI GPT-4o (latest & most capable)  
- **Image Analysis:** Can interpret hardware photos  
- **Structured Output:** JSON-formatted diagnosis & solutions  
- **Smart Prompts:** Specifically trained for IoT troubleshooting  

---

## 📍 How It Works
1. **Visit the site** → See an intro landing page  
2. **Login** via Replit Auth to access features  
3. **Submit problem**:
   - Microcontroller type  
   - Project description  
   - Components used  
   - Detailed problem description  
   - Optional setup images  
4. **AI Analysis** → OpenAI processes data & images  
5. **Get Solutions** → Receive step-by-step fixes  
6. **View History** → Search & review past queries  

---

## ✅ Current Status
- **Fully functional** – Server running on port `5000`
- **All features implemented**
- **Secure** – Auth & protected routes  
- **AI connected** – GPT-4o working with image analysis  
- **Responsive UI** – Works across devices  

---

## 💡 Technical Decisions
- **Memory storage** instead of PostgreSQL (due to DB connection issues during dev)  
- **Session-based authentication** for secure, persistent logins  
- **JSON AI responses** for consistent parsing  
- **Structured prompts** for reliable IoT troubleshooting  

---

## ✨ Why FixMyIoT is Special
- **User-Focused** – Built around real developer needs  
- **Intelligent** – AI that truly understands IoT hardware & software issues  
- **Secure** – Your data stays private  
- **Professional** – Production-ready architecture & design  
- **Complete** – End-to-end solution from problem to fix  

---

## 🖥 Installation & Setup

### Prerequisites
- Node.js 18+  
- npm or yarn  
- OpenAI API key  
- Replit Auth credentials (if self-hosting)  

### Steps
```bash
# Clone repository
git clone https://github.com/Neeraj0704/IOT-Troublehshooter.git
cd IOT-Troublehshooter

# Install dependencies
npm install

# Set environment variables
OPENAI_API_KEY=your_openai_key
REPLIT_AUTH_KEY=your_replit_auth_key

# Run development server
npm run dev
