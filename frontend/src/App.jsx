import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [professors, setProfessors] = useState([]); // state variable to hold the list of professors; initialized as an empty array
  const [filter, setFilter] = useState(''); // state variable for filtering based on research area; initialized as an empty string

  // Fetch the list of professors from the backend
  useEffect(() => {
    fetch('http://localhost:3000/professors')
      .then(res => res.json())
      .then(data => setProfessors(data)) // update state of professors with the data from the backend
      .catch(err => console.error('Error fetching professors:', err));
  }, []); // empty dependency array AKA run fetch once on component mount)

  // Filter professors based on the research area if a filter is set

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
