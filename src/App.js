import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://ik1okqq652.execute-api.ap-south-1.amazonaws.com/dev/todos';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  // Fetch tasks
  useEffect(() => {
    axios.get(API_URL)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  // Add a new task
  const addTask = () => {
    if (!task.trim()) return;

    const newTask = { id: Date.now().toString(), name: task };
    axios.post(API_URL, newTask)
      .then(() => {
        setTasks([...tasks, newTask]);
        setTask('');
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });
  };

  // Delete a task
  const deleteTask = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setTasks(tasks.filter((t) => t.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
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
      <button onClick={addTask}>Add Task</button>
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
