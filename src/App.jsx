import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import ProjectTasks from "./pages/ProjectTasks";
import AddProject from "./pages/AddProject";
import AddTask from "./pages/AddTask";
import NotFound from "./pages/NotFound";

function App() {
  // --- MEMBER 3: DATA ENGINE ---
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://69442f687dd335f4c35f8d69.mockapi.io/api/ProjectsManagerv1";

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/Projects`),
      fetch(`${API_URL}/Tasks`)
    ])
      .then(([resProj, resTask]) => {
        if (!resProj.ok || !resTask.ok) throw new Error("API Fetch Failed");
        return Promise.all([resProj.json(), resTask.json()]);
      })
      .then(([projectsData, tasksData]) => {
        setProjects(projectsData);
        setTasks(tasksData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  // --- LOGIC FUNCTIONS ---
  const addNewProject = (newProject) => {
    const projectWithId = { ...newProject, id: Date.now().toString() };
    setProjects([...projects, projectWithId]);
  };

  const addNewTask = (newTask) => {
    const taskWithId = { ...newTask, id: Date.now().toString() };
    setTasks([...tasks, taskWithId]);
  };

  const deleteProject = (projectId) => {
    setProjects(projects.filter((p) => p.id !== projectId));
    setTasks(tasks.filter((t) => t.projectId !== projectId));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const moveTask = (taskId, newStatus) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2>Loading Mini Trello Data...</h2>
      </div>
    );
  }

  // --- MEMBER 1: ROUTING + MEMBER 3: DATA PROPS ---
  return (
    <div className="App"> 
      {/* We REMOVED <Router> from here because it is already in main.jsx */}
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={
            <Dashboard 
              projects={projects} 
              tasks={tasks} 
              onDeleteProject={deleteProject} 
            />
          } />
          
          <Route path="project/:id" element={
            <ProjectTasks 
              tasks={tasks} 
              onDelete={deleteTask} 
              onMove={moveTask} 
            />
          } />

          <Route path="add-project" element={
            <AddProject onAddProject={addNewProject} />
          } />

          <Route path="add-task" element={
            <AddTask projects={projects} onAddTask={addNewTask} />
          } />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;