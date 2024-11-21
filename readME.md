# TaskMaster

TaskMaster is a comprehensive task management web application that allows users to create, manage, and track their tasks efficiently. This project includes user authentication, a personalized dashboard, and task management features.


## Features

- User registration and login
- Secure authentication system
- Personalized user dashboard
- Task creation, editing, and deletion
- Task filtering and sorting
- Archived tasks view
- Dark mode toggle
- Mobile-responsive design


## File Structure




## Setup Instructions

1. Clone the repository:
https://github.com/thebabalola/3mtt-SE_Capstone_Project.git


2. Open the project in your preferred code editor.

3. If you're using a local development server, start it in the project root directory. 

4. Open your browser and navigate to `http://localhost:8000` (or whatever port your local server is using).


## Usage

1. Landing Page:
- Open `index.html` in your browser to view the landing page.
- Click on "Login" or "Register" to navigate to the respective pages.

2. Registration:
- Fill out the registration form with your details.
- Click "Register" to create a new account.

3. Login:
- Enter your email and password.
- Click "Login" to access your dashboard.

4. Dashboard:
- View your profile information, including your join date.
- See statistics about your created and archived tasks.
- Manage your active tasks.
- View your archived tasks.
- Toggle dark mode using the settings panel.

5. Logout:
- Click the "Logout" button in the navigation bar to log out and return to the landing page.


## Customization

- To change the color scheme, modify the CSS variables in the `:root` selector in both `styles.css` and `dashboard.css`.
- To add or modify features, edit the respective HTML, CSS, and JavaScript files.


## Backend Integration

This project currently uses mock data and simulated API calls. To integrate with a real backend:

1. Replace the simulated API calls in `auth.js` and `dashboard.js` with actual AJAX requests to your backend server.
2. Implement proper error handling for API responses.
3. Ensure your backend provides endpoints for user authentication, task management, and user profile operations.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## License

This project is licensed under the 3mtt S.E training License.