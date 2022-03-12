import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if(!newTaskTitle) return; // Se a tarefa não tiver nome, não faz nada
    const id = Math.round(Math.random() * Number.MAX_SAFE_INTEGER); //Números aleatórios
    const newTask = { //Criando nova tarefa
      id: id,
      title: newTaskTitle,
      isComplete: false,
    };
    setTasks([...tasks,newTask]); //O spread operator serve para adicionar um novo array ao array original
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    const index = tasks.findIndex(tasks => tasks.id === id); //Pega o index da tarefa que foi clicada
    tasks[index].isComplete = !tasks[index].isComplete; //Troca o valor de isComplete
    setTasks([...tasks]); //Atualiza o array
  }

  function handleRemoveTask(id: number) {
    const index = tasks.findIndex(tasks => tasks.id === id); //Pega o index da tarefa que foi clicada
    tasks.splice(index,1); //Remove a tarefa do array
    setTasks([...tasks]); //Atualiza o array
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}