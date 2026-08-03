import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './mycomponents/HomeComponents/HomePage';
import 'bootstrap/dist/css/bootstrap.css';
import { Login } from './mycomponents/users/Login';
import { About } from './mycomponents/HomeComponents/About';
import { Service } from './mycomponents/HomeComponents/Services';
import { Features } from './mycomponents/HomeComponents/Features';
import { Doctor } from './mycomponents/HomeComponents/Doctors';
import { Contact } from './mycomponents/HomeComponents/Contact';
import { PatientRegistration } from './mycomponents/HomeComponents/PatientRegistration';
import { AdminDashboard } from './mycomponents/users/admin/AdminDashboard';
import { AdminReg } from './mycomponents/users/admin/AdminReg';
import { ShowAdmin } from './mycomponents/users/admin/ShowAdmin';
import SuperAdminProfile from './mycomponents/users/admin/ShowSuperAdminProfile';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditAdmin } from './mycomponents/users/admin/EditAdmin';
import { EditSuperAdmin } from './mycomponents/users/admin/EditSuperAdmin';


function App() {

  return (
    <>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={1500}   // 2 seconds
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
        <Routes>
          {/* <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/service' element={<Service/>}/>
          <Route path='/features' element={<Features/>}/>
          <Route path='/doctor' element={<Doctor/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/patientreg' element={<PatientRegistration/>}/> */}
          <Route path='/' element={<AdminDashboard />} />
          <Route path='/addadmin' element={<AdminReg />} />
          <Route path='/showadmin' element={<ShowAdmin />} />
          <Route path='/superadminprofile' element={<SuperAdminProfile />} />
          <Route path='/edit_admin/:eml' element={< EditAdmin/>} />
          <Route path='/edit_superadmin/:eml' element={< EditSuperAdmin/>} />

        </Routes>
      </Router>
    </>
  )
}

export default App
