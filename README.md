# Markham Access AI

> **AI-powered community resource discovery for Markham and the Greater Toronto Area**

Markham Access 
AI is a web application that helps people find relevant community and social-support resources using **natural-language requests**.

Instead of requiring users to know the exact name or category of a program, they can describe what they need in everyday language. The application analyzes the request, identifies relevant needs and context, searches a Firestore-backed resource database, scores available resources, applies location-aware relevance filtering, and presents the strongest matches.

The project is designed around **accessibility, relevance, location accuracy, and simple resource discovery**.

---

## ✨ Features

### 🤖 Natural-Language AI Analysis

Users can describe their situation naturally, for example:

> "I live in Markham and need help finding food assistance."

The application uses **Google Gemini** to analyze the request and extract structured information such as:

- User type
- Location
- Location type
- Search area
- Transportation needs
- Urgency
- Requested services/needs
- Detected language
- Preferred languages

---

### 🎯 Intelligent Resource Matching

Resources are not simply returned based on keyword searches.

The matching engine considers multiple signals, including:

- Service / need relevance
- Location relevance
- Transportation compatibility
- Language compatibility
- User type
- Urgency
- Verification status

The resulting score is used to rank resources and explain why a resource matched the request.

---

### 📍 Location-Aware Matching

Location is treated as an important part of relevance.

The system can recognize:

- Exact city matches
- District matches
- Explicit service coverage
- Regional coverage
- GTA-wide resources

The matching logic deliberately avoids assuming that every resource in the same broad region serves every nearby city.

For example, a resource located in Vaughan is not automatically treated as a Markham resource unless the resource data explicitly indicates that it serves Markham.

This helps reduce misleading recommendations.

---

### 🍎 Community Resource Categories

The matching system supports needs such as:

- Food assistance
- Housing
- Financial assistance
- Employment
- Health services
- Childcare
- Language support
- Newcomer support
- Education
- Legal assistance
- Mental health
- Disability support
- Senior support
- Youth support
- Clothing
- Utilities
- Emergency assistance
- Transportation

---

### 🚍 Transportation-Aware Results

Transportation is treated separately from the primary service need.

The system can consider transportation-related information such as:

- Public transit
- Bus
- Subway
- Streetcar
- TTC
- GO Transit
- Accessible transportation
- Paratransit
- Mobility support

This allows transportation compatibility to improve ranking without incorrectly treating transportation alone as the user's primary service need.

---

### ✅ Verified Resources

Resources can be marked as verified.

Verified resources receive additional ranking weight and are visually identified in the interface.

The resource data includes information such as:

- Name
- Category
- Address
- Description
- Services
- Tags
- Languages
- Transportation
- Eligibility
- Phone
- Website
- Verification status

---

### 📊 Match Scores & Explanations

Each returned resource can include:

- Match score
- Match reasons
- Location relevance
- Service relevance
- Verification information

This makes the recommendation process more understandable instead of presenting an unexplained list of organizations.

---

### ♿ Accessibility-Focused Interface

The UI has been designed with accessibility in mind.

Implemented work includes:

- Keyboard/focus improvements
- Responsive layout
- Reduced-motion support
- Clear visual hierarchy
- Loading states
- Empty states
- Error states
- Accessible resource actions
- Responsive mobile presentation

The project also includes dedicated accessibility-focused UI work and reusable components.

---

## 🏗️ Architecture

The core application follows this flow:

```text
┌──────────────────────┐
│      User Request    │
│ Natural-language text│
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│    Gemini Analysis   │
│ Extract user context │
│ needs + location     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│      Firestore       │
│ Community Resources  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Matching Engine    │
│                      │
│ • Need               │
│ • Location           │
│ • Transportation     │
│ • Language           │
│ • User type          │
│ • Urgency            │
│ • Verification       │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Relevance Filtering  │
│ + Resource Ranking   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│      React UI        │
│ Resource cards       │
│ Scores + actions     │
└──────────────────────┘
```

The project status documentation describes the same core pipeline as:

**AI → analysis → Firestore → scoring → ranking → UI**.

---

## 🧠 Matching Pipeline

At a high level, the backend performs the following steps:

### 1. Analyze the request

The user's natural-language request is sent to the `/api/analyze` endpoint.

### 2. Extract structured intent

Gemini identifies information such as:

```text
userType
location
locationType
searchArea
transportation
transportationNeeds
urgency
needs
detectedLanguage
languages
```

### 3. Load resources

The application retrieves community resources from the Firestore `resources` collection.

### 4. Score resources

Each resource is evaluated against the analyzed request.

The scoring system considers:

```text
Location
+ Need
+ Transportation
+ Language
+ User Type
+ Urgency
+ Verification
= Match Score
```

### 5. Apply hard relevance filtering

A resource must actually satisfy at least one requested service need rather than merely receiving a high numerical score from unrelated attributes.

Location eligibility is also evaluated separately.

### 6. Rank results

Resources are sorted primarily by match score, with location proximity/coverage and verification used as additional ranking signals.

### 7. Return the best matches

The frontend displays the resulting resources as interactive resource cards.

---

## 🗂️ Project Structure

A simplified project structure is:

```text
markham-access-ai/
│
├── app/
│   ├── api/
│   │   ├── analyze/
│   │   │   └── route.ts
│   │   │
│   │   └── resources/
│   │       └── route.ts
│   │
│   ├── components/
│   │   ├── AccessAIHeader.tsx
│   │   ├── SearchPanel.tsx
│   │   ├── ResultsHeader.tsx
│   │   ├── ResourceCard.tsx
│   │   ├── ResourceActions.tsx
│   │   ├── LoadingState.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   └── BackgroundEffects.tsx
│   │
│   └── page.tsx
│
├── lib/
│   ├── firebase.ts
│   └── gemini.ts
│
├── scripts/
│   ├── seed-resources.ts
│   └── cleanup-duplicate-resources.ts
│
├── .env.local
├── package.json
└── README.md
```

The application contains separate API routes for resource retrieval and analysis, while Firebase and Gemini integrations are kept in `lib/`. 

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| **Next.js** | Full-stack React application |
| **React** | User interface |
| **TypeScript** | Type-safe application development |
| **Google Gemini** | Natural-language request analysis |
| **Firebase** | Application backend integration |
| **Cloud Firestore** | Community resource database |
| **Tailwind CSS** | UI styling |
| **Next.js API Routes** | Backend endpoints |

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root.

The application expects Firebase configuration through environment variables and a Gemini API key.

Example:

```env
GEMINI_API_KEY=your_gemini_api_key

NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

**Never commit API keys or Firebase service-account credentials to GitHub.**

The Firebase client reads its configuration from environment variables, while the Gemini integration supports `GEMINI_API_KEY` or `GOOGLE_GEMINI_API_KEY`. 

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Cgarg547/Markham-Access.git
cd Markham-Access
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create:

```text
.env.local
```

and add the required Gemini and Firebase configuration.

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Visit:

```text
http://localhost:3000
```

---

## 🔎 Example Searches

The application is designed for natural-language queries rather than requiring users to select a rigid category first.

Examples:

```text
I live in Markham and need help getting groceries.
```

```text
I need help finding a job in Markham.
```

```text
I'm a newcomer looking for English classes and settlement support.
```

```text
I need housing assistance in Markham.
```

```text
I need emergency financial assistance and I rely on public transit.
```

The application analyzes the request and uses the extracted intent to determine which resources are relevant.

---

## 🗃️ Resource Data

Resources are stored in Firestore and include structured fields such as:

```text
id
name
category
city
district
province
address
description
services
tags
languages
transportation
eligibility
phone
website
verified
```

The project also includes resource-seeding and duplicate-cleanup scripts.

Example resource records include community organizations such as food assistance and employment-support services.

---

## 🔐 Security

Sensitive configuration should remain outside the repository.

Do not commit:

```text
.env.local
firebase-service-account.json
```

The service-account credential is specifically excluded from Git tracking in the project configuration.

Before production deployment, additional hardening should include:

- Firebase security rules
- API failure handling
- Gemini failure handling
- Rate limiting
- Environment-variable validation
- Production build testing
- Log cleanup

These are part of the project's remaining production-hardening roadmap.

---

## 🧪 Development & Testing

During development, the project has been checked for:

- TypeScript compilation
- Next.js development-server startup
- API request handling
- Resource matching
- Location filtering
- Resource ranking
- Responsive UI behavior

The project status documentation records successful TypeScript compilation checks and a functioning Next.js development server.

---

## 🗺️ Roadmap

### Completed

- [x] Gemini request analysis
- [x] Firestore resource integration
- [x] Resource deduplication
- [x] Location-aware matching
- [x] Need/service scoring
- [x] Transportation scoring
- [x] Language scoring
- [x] User-type scoring
- [x] Urgency scoring
- [x] Verification scoring
- [x] Resource ranking
- [x] Resource API
- [x] Website / phone / directions actions
- [x] Responsive interface
- [x] Loading / empty / error states
- [x] Accessibility-focused UI improvements
- [x] Reduced-motion support

These capabilities are documented as substantially complete in the current project status.

---

## 🎯 Project Goals

Markham Access AI is intended to make community-resource discovery:

**More natural**  
Users can explain what they need in their own words.

**More relevant**  
Resources are matched against actual requested needs.

**More location-aware**  
The system avoids treating every nearby organization as automatically relevant.

**More transparent**  
Match scores and reasons help explain recommendations.

**More accessible**  
The interface is designed with keyboard access, responsive layouts, reduced motion, and clear interaction states in mind.

---

## 🤝 Contributing

Contributions and suggestions are welcome.

Potential areas for contribution include:

- Community resource data quality
- Accessibility improvements
- Matching accuracy
- Additional locations
- Additional service categories
- UI/UX improvements
- Testing
- Documentation

---

## ⚠️ Disclaimer

Markham Access AI is a community-resource discovery tool.

Resource information, eligibility requirements, availability, operating hours, and contact details can change. Users should confirm important information directly with the organization before relying on a recommendation.

AI-generated analysis should be treated as an aid to resource discovery, not as a guarantee of eligibility or service availability.

---

## 👨‍💻 Author

**Chirag Garg**

Built as an AI-powered community-accessibility project focused on improving how people discover local support services.

---

## 📄 License

This project is licensed under the **MIT License**.

You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, subject to the terms of the MIT License.

See the [LICENSE](LICENSE) file for the full license text.