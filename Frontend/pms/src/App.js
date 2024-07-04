import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import Student from './components/student/Student';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ProtectedLayout from './components/ProtectedLayout';
import EditStudent from './components/student/EditStudent';
import CourseComp from './components/course/CourseComp';
import AddCourse from './components/course/AddCourse';
import EditCourse from './components/course/EditCourse';
import AddStudent from './components/student/AddStudent';
import SingleStudent from './components/student/SingleStudent';
import AddProject from './components/project/AddProject';
import EditProject from './components/project/EditProject';
import Incomplete from './components/incomplete/Incomplete';
import SendEmail from './components/SendEmail';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes >
          <Route path="/" element={<ProtectedLayout />}>
            <Route path='/addStudent' element={<AddStudent />} />
            <Route path='/' element={<Student />} />
            <Route path='/singleStudent/:student_id' element={<SingleStudent/>} />
            <Route path='/editstudent/:edit_id' element={<EditStudent />} />
            <Route path='/course' element={<CourseComp/>} />
            <Route path='/addCourse' element={<AddCourse/>} />
            <Route path='/editCourse/:editcourse_id' element={<EditCourse/>}/>
            <Route path='/addProject/:std_id' element={<AddProject/>} />
            <Route path='/editProject/:project_id' element={<EditProject/>} />
            <Route path='/incomplete' element={<Incomplete/>} />
            <Route path='/email/:email' element={<SendEmail/>}/>

          </Route>

          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />

        </Routes>
      </Router>
      {/* <Dashboard/> */}
    </div>
  );
}

export default App;
