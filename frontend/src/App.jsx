import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './mycomponents/HomeComponents/HomePage';
import 'bootstrap/dist/css/bootstrap.css';
import { Login } from './mycomponents/HomeComponents/Login';
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
import DoctorRegistration from './mycomponents/users/admin/DoctorRegistration';
import { ShowDoctors } from './mycomponents/users/admin/ShowDoctors';
import { EditDoctor } from './mycomponents/users/admin/EditDoctor';
import { AddPatient } from './mycomponents/users/admin/AddPatient';
import { ShowPatients } from './mycomponents/users/admin/ShowPatients';
import { ViewPatientsFullDetails } from './mycomponents/users/admin/ViewPatient';
import { EditPatient } from './mycomponents/users/admin/EditPatient';
import BookAppointment from './mycomponents/users/patient/BookAppointment';
import { PatientHome } from './mycomponents/users/patient/PatientHome';
import { MyAppointment } from './mycomponents/users/patient/MyAppointments';
import PatientProfile from './mycomponents/users/patient/PatientProfile';
import EditPatientProfile from './mycomponents/users/patient/EditPatientProfile';
import ReceptionistHome from './mycomponents/users/receptionist/ReceptionistHome';
import ReceptionistAppointments from './mycomponents/users/receptionist/ReceptionistAppointments';
import ReceptionistPatients from './mycomponents/users/receptionist/ReceptionistPatients';
import ReceptionistViewPatient from './mycomponents/users/receptionist/ReceptionistViewPatient';
import ReceptionistEditPatient from './mycomponents/users/receptionist/ReceptionistEditPatient';
import ReceptionistRegistrataion from './mycomponents/users/admin/ReceptionistRegistration';
import ShowReceptionist from './mycomponents/users/admin/ShowReceptionist';
import EditReceptionist from './mycomponents/users/admin/EditReceptionist';
import ShowAppointments from './mycomponents/users/admin/ShowAppointments';
import DoctorHome from './mycomponents/users/doctor/DoctorHome';
import ReceptionistAddPatient from './mycomponents/users/receptionist/ReceptionistAddPatient';
import DoctorAppointments from './mycomponents/users/doctor/DoctorAppointments';



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
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/service' element={<Service />} />
          <Route path='/features' element={<Features />} />
          <Route path='/doctor' element={<Doctor />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/patientreg' element={<PatientRegistration />} />

          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/addadmin' element={<AdminReg />} />
          <Route path='/showadmin' element={<ShowAdmin />} />
          <Route path='/superadminprofile' element={<SuperAdminProfile />} />
          <Route path='/edit_admin/:eml' element={< EditAdmin />} />
          <Route path='/edit_superadmin/:eml' element={< EditSuperAdmin />} />
          <Route path='/adddoctor' element={<DoctorRegistration />} />
          <Route path='/showdoctor' element={<ShowDoctors />} />
          <Route path='/edit_doctor/:eml' element={<EditDoctor />} />
          <Route path='/addpatient' element={<AddPatient />} />
          <Route path='/showpatient' element={<ShowPatients />} />
          <Route path='/view_patient/:ptId' element={<ViewPatientsFullDetails />} />
          <Route path='/edit_patient/:ptId' element={<EditPatient />} />
          <Route path='/receptionist_registration' element={<ReceptionistRegistrataion />} />
          <Route path='/show_receptionist_details' element={<ShowReceptionist />} />
          <Route path='/show_appointments' element={<ShowAppointments />} />

          <Route path='/book-appointment' element={<BookAppointment />} />
          <Route path='/patient/home' element={<PatientHome />} />
          <Route path='/my-appointment' element={<MyAppointment />} />
          <Route path='/myprofile' element={<PatientProfile />} />
          <Route path='/edit_patient_profile' element={<EditPatientProfile />} />


          <Route path='/receptionist' element={<ReceptionistHome />} />
          <Route path='/receptionist/appointments' element={<ReceptionistAppointments />} />
          <Route path='/receptionist/patients' element={<ReceptionistPatients />} />
          <Route path='/receptionist/patients/view/:ptId' element={<ReceptionistViewPatient />} />
          <Route path='/receptionist/patients/edit/:ptId' element={<ReceptionistEditPatient />} />
          <Route path='/edit_receptionist/:email' element={<EditReceptionist />} />
          <Route path="/receptionist/patients/add" element={<ReceptionistAddPatient />} />

          <Route path="/doctor/home" element={<DoctorHome />} />
          <Route path="/doctor/appointments" element={<DoctorAppointments />} />

        </Routes>
      </Router>
    </>
  )
}

export default App;
