# Deene Madaris Scouts

Deene Madaris Scouts is a web application designed to manage and scout madaris (Islamic schools). It provides features for madrasa registration, student management, authentication, and more. Built with **Next.js**, **MongoDB**, and **Tailwind CSS**, it ensures a seamless user experience.

---

## 🌐 Live Demo

Visit the live application: [Deene Madaris Scouts](https://deene-madaris-scouts.vercel.app)

---

## ✨ Features

- **Madrasa Registration**: Easily register madaris with detailed information.
- **Student Management**: Add, update, and delete student records efficiently.
- **Authentication**: Secure login using Google, GitHub, and custom credentials.
- **Role-based Access**:
  - Users can view their own registered madrasas.
  - Admins have access to all madrasas.
- **Notifications**: Real-time feedback with `react-hot-toast`.
- **Monthly Fee Tracking**: Monitor the payment status of students.
- **Invoice Printing**: Generate and print student fee invoices.

---

## 🛠️ Tech Stack

### Frontend:
- **React.js** with **TypeScript**
- **Next.js 13+** (App Router)
- **Tailwind CSS** for modern styling
- **Formik** for form handling
- **react-hot-toast** for notifications
- **react-icons** for icons

### Backend:
- **Next.js API Routes**
- **MongoDB** for data storage
- **bcryptjs** for secure password hashing

### Authentication:
- **NextAuth**


### Deployment:
- **Vercel** for hosting and CI/CD

---

## 📦 Installation

### Prerequisites

- Node.js >= 18
- MongoDB Database
- Google and GitHub credentials for authentication (optional)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/deene-madaris-scouts.git
   cd deene-madaris-scouts
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory and add the following:
   ```env
   NEXT_PUBLIC_SITE_URL=https://deene-madaris-scouts.vercel.app
   MONGODB_URI=<your-mongodb-connection-string>
   NEXTAUTH_SECRET=<your-nextauth-secret>
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   GITHUB_CLIENT_ID=<your-github-client-id>
   GITHUB_CLIENT_SECRET=<your-github-client-secret>
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:3000`.

---

## 🚀 Deployment

The project is pre-configured for deployment on **Vercel**:

1. Push the code to a GitHub repository.
2. Link the repository to your Vercel account.
3. Configure the environment variables in Vercel's settings.
4. Deploy!

---

## 📚 Folder Structure

```plaintext
src/
├── app/
│   ├── api/          # API Routes for backend functionality
│   ├── components/   # Reusable UI components
│   ├── pages/        # Page-level components
│   ├── styles/       # Global styles
├── public/           # Public assets
├── utils/            # Utility functions
```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature or fix description"
   ```
4. Push the branch:
   ```bash
   git push origin feature-branch-name
   ```
5. Open a pull request.

---

## 🧑‍💻 Author

Developed and maintained by **[Bilal-pasha](https://github.com/your-profile)**.

---

## 📝 Acknowledgments

- **Vercel** for hosting.
- **Next.js** and **MongoDB** communities for their fantastic resources.

