import logo from './logo.svg';
import './App.css';

function StudentInfo(props) {
  return (
    <div>
      <img src={logo} className="App-logo" alt="React Logo" />

      <h1>Welcome to Fullstack Development - I</h1>
      <h2>React JS Programming Week09 Lab exercise</h2>
      <h3>{props.studentId}</h3>
      <h4>{props.name}</h4>
      <p>George Brown College, Toronto</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <StudentInfo
        studentId="101578443"
        name="Mukhtar Ali"
      />
    </div>
  );
}

export default App;