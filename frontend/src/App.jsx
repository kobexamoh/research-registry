import { useState, useEffect } from 'react';
import './App.css';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'; // get the API URL from environment variable or default to localhost

function App() {
  const [professors, setProfessors] = useState([]); // state variable to hold the list of professors; initialized as an empty array
  const [filter, setFilter] = useState(''); // state variable for filtering based on research area; initialized as an empty string
  // TODO: include state for error handling
  const [formData, setFormData] = useState({
    student_name: '',
    student_email: '',
    student_program: '',
    message: '',
    professor_id: ''
  }); // state variable to hold form data for students to contact professors; initialized with empty fields;
  const [submitStatus, setSubmitStatus] = useState(null); // state variable to track status of form submission; initialized as null

  // Fetch the list of professors from the backend
  useEffect(() => {
    fetch(`${API_URL}/professors`) // make GET request to the backend to fetch professors
      .then(res => res.json())
      .then(data => setProfessors(data)) // update state of professors with the data from the backend
      .catch(err => console.error('Error fetching professors:', err));
  }, []); // empty dependency array AKA run fetch once on component mount)

  // get unique research areas for the filter dropdown
  const researchAreas = [...new Set(professors.map(p => p.research_area))]; 

  // Filter professors based on the research area if a filter is set
  const filteredProfessors = filter 
    ? professors.filter(p => p.research_area === filter)
    : professors; // if filter is set, filter professors by research area; otherwise, show all professors

    // form sumbission handlers for students to contact professors
    const handleChange = (e) => {
      setFormData({ ... formData, [e.target.name]: e.target.value }); // update form data state when input fields change
    }

    const handleSubmit = async (e) => {
      e.preventDefault(); // prevent default form submission behaviour
      setSubmitStatus(null); // reset submit status before submission

      // try/catch block for handling form submission and potential errors
      try {
        const res = await fetch(`${API_URL}/interest`, {
          method: 'POST', // make POST request to the backend for submitting the form data
          headers: { 'Content-Type': 'application/json' }, // set content type to JSON for the request
          body: JSON.stringify(formData) // convert form data to JSON string for the request body
        });

        if (res.ok) {
          setSubmitStatus('success');
          setFormData({ student_name: '', student_email: '', student_program: '', message: '', professor_id: ''
          });
        } else {
          const data = await res.json();
          setSubmitStatus(data.error || 'Submission failed. Please try again.'); // set submit status to error message from backend, or a generic error message if there isn't one.
        }
      } catch (err) {
        console.error('Error submitting form:', err);
        setSubmitStatus('Network error. Please try again later.'); // set submit status to an error message if there is a network error
      }
    }
  // map over the professors and display their names in a list
  return (
    <div>
      <h1>Research Registry</h1>
      <h2>Professors</h2>
      <label>
        Filter by research area: {' '}
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">All</option>
          {researchAreas.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
      </label>
      {professors.length === 0 ? (
        <p>Loading professors...</p>) : (
          <ul>
            {filteredProfessors.map(prof => (
              <li key={prof.id}>
                <strong>{prof.name}</strong> - {prof.department}
                <br/>
                Research: {prof.research_area}
              </li>
            ))}
          </ul>
        )}
        <h2>Want to work with a professor?</h2>
        <form onSubmit={handleSubmit}>
        <div>
          <label>Name: <input name="student_name" value={formData.student_name} onChange={handleChange} required /></label>
        </div>
        <div>
          <label>Email: <input name="student_email" type="email" value={formData.student_email} onChange={handleChange} required /></label>
        </div>
        <div>
          <label>Program: <input name="student_program" value={formData.student_program} onChange={handleChange} /></label>
        </div>
        <div>
          <label>Professor: 
            <select name="professor_id" value={formData.professor_id} onChange={handleChange} required>
              <option value="">Select a professor</option>
              {professors.map(prof => (
                <option key={prof.id} value={prof.id}>{prof.name}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>Message:<br/>
            <textarea name="message" value={formData.message} onChange={handleChange} rows="7" />
          </label>
        </div>
        <button type="Submit">Submit Interest</button>
        </form>
        {submitStatus === 'success' && <p style={{color: 'green'}}>Interest submitted!</p>}
        {submitStatus && submitStatus !== 'success' && <p style={{color: 'red'}}>{submitStatus}</p>}
    </div>
  )
}

export default App
