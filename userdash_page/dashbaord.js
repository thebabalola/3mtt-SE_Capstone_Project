document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    const editProfilePicBtn = document.getElementById('editProfilePic');
    const profilePicInput = document.getElementById('profilePicInput');
    const profilePic = document.getElementById('profilePic');
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsPanel = document.getElementById('settingsPanel');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Logout functionality
    logoutBtn.addEventListener('click', function() {
        // Clear user session/token
        localStorage.removeItem('token');
        // Redirect to home page
        window.location.href = 'index.html';
    });

    // Edit profile picture
    editProfilePicBtn.addEventListener('click', function() {
        profilePicInput.click();
    });

    profilePicInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePic.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Toggle settings panel
    settingsBtn.addEventListener('click', function() {
        settingsPanel.classList.toggle('open');
    });

    // Dark mode togglen
    darkModeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode', this.checked);
    });

    // Load user data (replace with actual API call)
    function loadUserData() {
        // Simulating API call
        setTimeout(() => {
            document.getElementById('userName').textContent = 'Jane Doe';
            document.getElementById('userEmail').textContent = 'jane@example.com';
            document.getElementById('createdTasks').textContent = '15';
            document.getElementById('archivedTasks').textContent = '7';
            document.getElementById('dateJoined').querySelector('span').textContent = 'May 15, 2023';
        }, 1000);
    }

    // Load tasks (replace with actual API call)
    function loadTasks() {
        // Simulating API call
        setTimeout(() => {
            const activeTasks = [
                { id: 1, title: 'Complete project proposal', status: 'In Progress' },
                { id: 2, title: 'Review team performance', status: 'Pending' },
                { id: 3, title: 'Update client presentation', status: 'In Progress' }
            ];
            const archivedTasks = [
                { id: 4, title: 'Quarterly report submission', status: 'Completed' },
                { id: 5, title: 'Team building event planning', status: 'Completed' }
            ];
            
            const activeTaskList = document.getElementById('activeTaskList');
            const archivedTaskList = document.getElementById('archivedTaskList');
            
            activeTaskList.innerHTML = '';
            archivedTaskList.innerHTML = '';
            
            activeTasks.forEach(task => {
                const li = document.createElement('li');
                li.className = 'task-item';
                li.textContent = `${task.title} - ${task.status}`;
                activeTaskList.appendChild(li);
            });
            
            archivedTasks.forEach(task => {
                const li = document.createElement('li');
                li.className = 'task-item';
                li.textContent = `${task.title} - ${task.status}`;
                archivedTaskList.appendChild(li);
            });
        }, 1500);
    }

    // Initial load
    loadUserData();
    loadTasks();
});