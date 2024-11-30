const API_BASE_URL = 'http://localhost:3000'; // Change this to your server's URL when deployed

async function makeRequest(url, method, body = null, token = null) {
    const headers = {
        'Content-Type': 'application/json'
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const options = {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
    };

    const response = await fetch(`${API_BASE_URL}${url}`, options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

const api = {
    register: (username, password) => makeRequest('/register', 'POST', { username, password }),
    login: (username, password) => makeRequest('/login', 'POST', { username, password }),
    getTasks: (token) => makeRequest('/tasks', 'GET', null, token),
    createTask: (token, taskData) => makeRequest('/tasks', 'POST', taskData, token),
    updateTask: (token, taskId, taskData) => makeRequest(`/tasks/${taskId}`, 'PUT', taskData, token),
    deleteTask: (token, taskId) => makeRequest(`/tasks/${taskId}`, 'DELETE', null, token)
};

export default api;