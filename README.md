</> Markdown
# Online Mock Test Application

##  Overview
The Online Mock Test Application is a full-stack web application that allows users to log in, select a test, attempt quiz questions, and view their results after submission.

The application is built using **Angular for the frontend** and **ASP.NET Web API for the backend**, providing a smooth and interactive quiz experience.

---

##  Features

- User Login
- Test selection from available quizzes
- Questions displayed one by one
- Option to select an answer
- Option to skip questions
- Submit test functionality
- Result page displaying:
  - Total score
  - Correct answers
  - Wrong answers
  - Non-attempted questions

---

##  Tech Stack

### Frontend
- Angular
- TypeScript
- HTML
- CSS
- Bootstrap

### Backend
- ASP.NET Web API
- C#

### Tools & Platforms
- Visual Studio Code
- Visual Studio
- Git
- GitHub

---

##  Application Workflow

1. User opens the application.
2. User logs in using their credentials.
3. After successful login, the **Home Page** appears.
4. User selects a test from the available list.
5. User clicks **Start Test**.
6. Questions are displayed one by one.

User can:
- Select an answer
- Skip the question

7. After completing the quiz, the user clicks **Submit**.
8. The application processes the responses.
9. The **Result Page** displays:
   - Total Score
   - Correct Answers
   - Wrong Answers
   - Non-Attempted Questions

---

##  Frontend–Backend Interaction

- Angular sends API requests to the **ASP.NET Web API**.
- The Web API processes the request and returns quiz data.
- Angular displays questions and submits answers.
- The backend evaluates the answers and returns the result.

---

##  Installation & Setup

### 1️. Clone the Repository
git clone https://github.com/your-username/quiz-application.git


### 2️. Run Backend (ASP.NET Web API)

1. Open the backend project in **Visual Studio**
2. Build and run the Web API

---

### 3️. Run Frontend (Angular)

Install dependencies

Run the Angular application

Open in browser
http://localhost:4200


---

##  Screenshots

## 📷 Screenshots

### Login Page
![Login Page](screenshots/login.png)

### Home Page
![Home Page](screenshots/home.png)

### Quiz Page
![Quiz Page](screenshots/quiz.png)

### Result Page
![Result Page](screenshots/result.png)

You can include screenshots for:
- Login Page
- Home Page
- Quiz Page
- Result Page

---

## 💡 Future Improvements

- Add quiz timer
- Store results in database
- Admin panel for managing quizzes
- Detailed performance analytics

---

## 👩‍💻 Author

**Prachi Sonkusare**  
Angular & .NET Developer


