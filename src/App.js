// Frontend (React)
// App.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    axios.get('http://13.126.86.158:5000/tasks').then((response) => {
      setTasks(response.data);
    });
  }, []);

  const addTask = () => {
    const newTask = { id: Date.now().toString(), name: task };
    axios.post('http://13.126.86.158:5000/tasks', newTask).then(() => {
      setTasks([...tasks, newTask]);
      setTask('');
    });
  };

  const deleteTask = (id) => {
    axios.delete(`http://13.126.86.158:5000/tasks/${id}`).then(() => {
      setTasks(tasks.filter((t) => t.id !== id));
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
      <button onClick={addTask}>Add TASK</button>
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
