function loadUserData() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userEmail').textContent = user.email;
    } else {
        window.location.href = 'login.html'; // Redirect to login if not logged in
    }
}

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
        localStorage.removeItem('user'); //Added to clear user data on logout
        // Redirect to home page
        window.location.href = '/index.html';
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

    // Dark mode toggle
    darkModeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode', this.checked);
    });

    // Load user data (replace with actual API call)
    //function loadUserData() { //This function is now defined outside the event listener
    //    // Simulating API call
    //    setTimeout(() => {
    //        document.getElementById('userName').textContent = 'Jane Doe';
    //        document.getElementById('userEmail').textContent = 'jane@example.com';
    //        document.getElementById('createdTasks').textContent = '15';
    //        document.getElementById('archivedTasks').textContent = '7';
    //        document.getElementById('dateJoined').querySelector('span').textContent = 'May 15, 2023';
    //    }, 1000);
    //}

    // Load tasks (replace with actual API call)
    function loadTasks() {
        getActiveTasks();
        getArchivedTasks();
    }

    function getActiveTasks() {
        // This function should fetch active tasks from your backend or local storage
        // For now, we'll just clear the list
        const activeTaskList = document.getElementById('activeTaskList');
        activeTaskList.innerHTML = '';
    }

    function getArchivedTasks() {
        // This function should fetch archived tasks from your backend or local storage
        // For now, we'll just clear the list
        const archivedTaskList = document.getElementById('archivedTaskList');
        archivedTaskList.innerHTML = '';
    }

    function displayTasks(tasks, listElement) {
        listElement.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.textContent = `${task.title} - ${task.status}`;
            listElement.appendChild(li);
        });
    }


    // Initial load
    loadUserData();
    loadTasks();
});