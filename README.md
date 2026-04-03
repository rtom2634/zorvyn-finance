📊 FINTRACK: Professional Finance Analytics Dashboard
Zorvyn Frontend Developer Intern Assignment
FinVue is a comprehensive financial tracking interface designed to bridge the gap between complex data and user-centric design. This project focuses on delivering a "production-ready" feel through interactive visualizations, robust state management, and localized user experiences.

🚀 Key Features
Interactive Analytics: Dynamic data visualization using Recharts, allowing users to track balance trends and categorical spending patterns at a glance.

Simulated RBAC (Role-Based Access Control): A built-in role switcher that live-updates the UI.

Viewer Mode: Read-only access to insights.

Admin Mode: Unlocks management features like adding, editing, and deleting transactions.

Global Localization: A centralized currency provider that instantly formats all financial data across the app (USD, EUR, GBP).

Advanced Data Management: * Real-time search and multi-category filtering.

Dynamic sorting by date, amount, and transaction type.

Responsive & Polished UI: Built with a mobile-first approach using Tailwind CSS, featuring glassmorphism elements, smooth transitions, and custom-designed status badges.

🛠️ Technical Stack
Core: React.js (Vite)

State Management: Context API / Zustand (Efficiently handling global roles and currency state)

Styling: Tailwind CSS (Custom color palette, responsive grid layouts)

Charts: Recharts (Area & Pie charts)

Icons: Lucide-React

🧠 Architectural Decisions
Modular Component Design: Every UI element (Table, StatCards, Charts) is isolated to ensure reusability and easier testing.

Logic Separation: Financial calculations (highest spending, monthly comparisons) are decoupled from the UI components into dedicated utility functions.

Graceful States: Integrated handling for "Empty Data" and "Loading" states to ensure the user is never left with a broken UI.