import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2>Mini Trello</h2>

      <div style={styles.links}>
        <NavLink to="/" style={styles.link}>Dashboard</NavLink>
        <NavLink to="/add-project" style={styles.link}>Add Project</NavLink>
        <NavLink to="/add-task" style={styles.link}>Add Task</NavLink>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#1976d2",
    color: "white"
  },
  links: {
    display: "flex",
    gap: "20px"
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold"
  }
};

export default Navbar;
