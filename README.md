# Digital Alibi Verifier

A forensic web application that verifies or invalidates a person's alibi claim by reconstructing a digital activity timeline from user-consented logs.

## 🚨 Ethical Disclaimer

**This system does NOT spy on phones or devices.** All data is uploaded voluntarily or simulated. We only analyze user-consented digital activity logs (app usage, location, network) to verify alibi claims. No illegal phone access or data collection occurs.

## 📋 Problem Statement

Traditional alibi verification relies on witness testimony and physical evidence. Digital Alibi Verifier introduces forensic digital evidence by analyzing consented device activity logs to either support or contradict alibi claims.

### Use Case Example
- **Claim**: "I was sleeping from 10 PM to 6 AM"
- **Evidence**: Device shows app usage, location changes, or network activity during claimed sleep period
- **Verdict**: TRUE (no activity) or FALSE (activity detected)

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React + Vite, Tailwind CSS, Framer Motion, Three.js
- **Backend**: Node.js + Express, MongoDB + Mongoose, Apache Kafka
- **Auth**: JWT + bcrypt
- **Email**: Resend API
- **Deployment**: Vercel (frontend), Railway (backend), MongoDB Atlas

### System Components

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │   Express API   │    │   MongoDB       │
│                 │    │                 │    │   Atlas         │
│ • Auth Pages    │◄──►│ • JWT Auth      │◄──►│ • Users         │
│ • Dashboard     │    │ • Case Mgmt     │    │ • Cases         │
│ • Case Details  │    │ • File Upload   │    │ • Events        │
│ • Timeline View │    │ • Email Reports │    │ • Verdicts      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Apache Kafka  │    │   Rule Engine   │    │   Resend API    │
│                 │    │                 │    │                 │
│ • Event Stream  │    │ • Alibi Logic   │    │ • Email Reports │
│ • Async Processing│  │ • TRUE/FALSE    │    │ • HTML Templates│
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Data Flow
1. User uploads consented logs (JSON files)
2. Kafka producer processes logs into events
3. Events stored in MongoDB with timestamps
4. Rule engine analyzes activity during claim period
5. Verdict generated and stored
6. Email report sent with timeline and verdict

## 🔐 Authentication & Security

- JWT-based authentication with refresh tokens
- Password hashing using bcrypt
- Protected API routes
- Secure file upload handling
- No sensitive data storage

## 📊 How Data is Collected

### User-Consented Logs
Users voluntarily upload JSON files containing:
- **App Usage**: Foreground app activity (no content)
- **Location**: GPS coordinates and timestamps
- **Network**: WiFi connections and data usage

### Sample Data Structure
```json
// app_usage.json
[
  {
    "app": "WhatsApp",
    "timestamp": "2024-01-15T22:30:00Z",
    "duration": 300
  }
]

// location.json
[
  {
    "latitude": 40.7128,
    "longitude": -74.0060,
    "timestamp": "2024-01-15T22:30:00Z",
    "accuracy": 10
  }
]
```

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Resend API key
- Docker (for Kafka)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with API URL
npm run dev
```

### Kafka Setup (Optional)
```bash
cd kafka
docker-compose up -d
```

### Environment Variables

#### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
RESEND_API_KEY=your-resend-key
KAFKA_BROKER=localhost:9092
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🎯 Usage

### 1. User Registration
- Create account with name, email, password
- JWT token issued for authentication

### 2. Create Alibi Case
- Enter alibi claim (e.g., "I was sleeping")
- Set time range for claim
- Upload activity logs or use sample data

### 3. Timeline Reconstruction
- System processes uploaded logs
- Events ordered chronologically
- Timeline visualized with timestamps

### 4. Verdict Generation
- Rule engine analyzes activity during claim period
- **TRUE**: No activity detected
- **FALSE**: Activity found contradicting claim

### 5. Email Report
- Professional HTML report sent to user
- Includes claim, timeline, verdict, and reasoning

## 🧠 Rule Engine Logic

```javascript
function evaluateAlibi(claimStart, claimEnd, events) {
  const conflictingEvents = events.filter(event =>
    event.timestamp >= claimStart && event.timestamp <= claimEnd
  );

  if (conflictingEvents.length > 0) {
    return {
      result: "FALSE",
      reason: `${conflictingEvents.length} activities detected during claim period`
    };
  }

  return {
    result: "TRUE",
    reason: "No activity detected during claim period"
  };
}
```

## 📧 Email Report Example

Subject: Digital Alibi Verification Report - Case #12345

**Claim:** I was sleeping from 10 PM to 6 AM
**Time Range:** Jan 15, 2024 10:00 PM - Jan 16, 2024 6:00 AM
**Verdict:** TRUE

**Timeline Summary:**
- 9:45 PM: Last app usage (Instagram)
- 10:00 PM - 6:00 AM: No activity detected
- 6:15 AM: First activity (Alarm app)

**Reasoning:** No digital activity found during the claimed sleep period, supporting the alibi.

## 🎨 UI/UX Features

- **Dark Cyber-Forensics Theme**: Professional investigative aesthetic
- **Fixed Left Panel**: Project branding with animated Three.js scene
- **Responsive Design**: Works on desktop and mobile
- **Smooth Animations**: Framer Motion page transitions
- **Loading States**: Professional loading indicators
- **Error Handling**: User-friendly error messages

## 🔍 Interview Talking Points

### Technical Depth
- **Event-Driven Architecture**: Kafka for async processing
- **Scalable Database Design**: MongoDB with proper indexing
- **Security-First Approach**: JWT, bcrypt, input validation
- **Real-time Processing**: Stream processing with Kafka
- **Professional UI/UX**: Modern React with animations

### Business Value
- **Forensic Technology**: Digital evidence for legal proceedings
- **Privacy-Conscious**: Ethical data handling
- **User Consent**: Transparent data usage
- **Professional Reports**: Court-ready documentation

### Technical Challenges Solved
- **Timeline Reconstruction**: Accurate chronological ordering
- **Rule-Based Logic**: Deterministic verdict generation
- **File Processing**: Secure JSON upload and parsing
- **Email Integration**: Professional HTML templates
- **State Management**: Complex auth and data flow

## 📈 Future Enhancements

- **Advanced Analytics**: Activity pattern recognition
- **Multi-Device Support**: Cross-device timeline merging
- **Legal Integration**: Court-admissible report formats
- **AI-Powered Analysis**: Machine learning for anomaly detection
- **Blockchain Verification**: Immutable evidence storage

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - see LICENSE file for details.

## ⚖️ Legal Notice

This application is for educational and demonstration purposes. It should not be used as sole evidence in legal proceedings without proper forensic validation and expert testimony.

---

**Built with ❤️ for ethical digital forensics**
