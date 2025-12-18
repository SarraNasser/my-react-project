import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard({ projects, onDeleteProject }) {
  return (
    <div>
      <h1>Projects</h1>
      <hr />
      
      {projects.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Project Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td><strong>{project.title}</strong></td>
                <td>{project.description}</td>
                <td>
                  <Link to={`/project/${project.id}`}>View Tasks</Link>
                  {" | "}
                  <button onClick={() => onDeleteProject(project.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;