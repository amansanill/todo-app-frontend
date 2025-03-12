// Frontend (React)
// App.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [deployMessage, setDeployMessage] = useState('');

  const backendUrl = 'http://13.126.86.158:5000';

  useEffect(() => {
    axios.get(`${backendUrl}/tasks`).then((response) => {
      setTasks(response.data);
    });
  }, []);

  const addTask = () => {
    const newTask = { id: Date.now().toString(), name: task };
    axios.post(`${backendUrl}/tasks`, newTask).then(() => {
      setTasks([...tasks, newTask]);
      setTask('');
    });
  };

  const deleteTask = (id) => {
    axios.delete(`${backendUrl}/tasks/${id}`).then(() => {
      setTasks(tasks.filter((t) => t.id !== id));
    });
  };

  const testDeployment = () => {
    axios.get(`${backendUrl}/test-deploy`).then((response) => {
      setDeployMessage(response.data);
    }).catch(() => {
      setDeployMessage('Failed to reach backend');
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Simple To-Do App</h1>
      <input 
        type="text" 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        placeholder="Add a new task" 
      />
      <button onClick={addTask}>ADD TASK</button>
      <button onClick={testDeployment} style={{ marginLeft: '10px' }}>
        TEST BACKEND DEPLOYMENT
      </button>
      {deployMessage && <p>{deployMessage}</p>}
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.name}
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
