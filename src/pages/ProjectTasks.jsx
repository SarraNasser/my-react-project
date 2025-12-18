import { useParams } from "react-router-dom";

function ProjectTasks() {
  const { id } = useParams();

  return (
    <div>
      <h1>Project Tasks</h1>
      <p>Project ID: {id}</p>
      <p>Tasks columns (To Do / In Progress / Done) will be here.</p>
    </div>
  );
}

export default ProjectTasks;
