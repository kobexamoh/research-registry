import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [professors, setProfessors] = useState([]);

  // Fetch the list of professors from the backend
  useEffect(() => {
    fetch('http://localhost:3000/professors')
      .then(res => res.json())
      .then(data => setProfessors(data)) // update state of professors with the data from the backend
      .catch(err => console.error('Error fetching professors:', err));
  }, []); // empty dependency array AKA run fetch once on component mount)

  // map over the professors and display their names in a list
  return (
    <div>
      <h1>Research Registry</h1>
      <h2>Professors</h2>
      {professors.length === 0 ? (
        <p>Loading professors...</p>) : (
          <ul>
            {professors.map(prof => (
              <li key={prof.id}>
                <strong>{prof.name}</strong> - {prof.department}
                <br/>
                Research: {prof.research_area}
              </li>
            ))}
          </ul>
        )}
    </div>
  )
}

export default App
