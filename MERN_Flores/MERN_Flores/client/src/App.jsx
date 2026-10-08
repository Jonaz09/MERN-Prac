import React, { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:5000/student")
      .then((res) => setStudents(res.data));
  }, []);
  const addStudent = async () => {
    const res = await axios.post("http://localhost:5000/student", { name, course, age });
    setStudents([...students, res.data]);
    resetForm();
    
  };
  const updateStudent = async () => {
    const res = await axios.put(`http://localhost:5000/student/${editingId}`, { name, course, age });
    setStudents(students.map((s) => (s._id === editingId ? res.data : s)));
    resetForm();
  }
  const editStudent = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
  };
  const resetForm = () => {
    setName(""); setCourse(""); setAge(""); setEditingId(null);
  };
  return (
    <div>
      <h1>Student Management System</h1>
      <h2>{editingId ? "Edit Student" : "Add Student"}</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={course} onChange={(e) => setCourse(e.target.value)} placeholder="Course" />
      <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" type="number" />
      {editingId ? (
        <button onClick={updateStudent}>Update Student</button>
      ) : (
        <button onClick={addStudent}>Add Student</button>
      )}
      {editingId && <button onClick={resetForm}>Cancel</button>}
      <h2>Students</h2>
      {students.map((s) => (
        <div key={s._id}>
          <p>{s.name} - {s.course} - {s.age}</p>
          <button onClick={() => editStudent(s)}>Edit</button>
          <button onClick={() => axios.delete(`http://localhost:5000/student/${s._id}`)
            .then(() => setStudents(students.filter((st) => st._id !== s._id)))}>Delete</button>
        </div>
      ))}
    </div>
  );
}
export default App;