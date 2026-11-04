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
import DoctorProfile from './mycomponents/users/doctor/DoctorProfile';
import ProtectedRoute from './mycomponents/ProtectedRoute';



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

          <Route path='/admin/dashboard' element={
            <ProtectedRoute allowedRole="superadmin">
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path='/admin/addadmin' element={
            <ProtectedRoute allowedRole="superadmin">
              <AdminReg />
            </ProtectedRoute>
          } />

          <Route path='/admin/showadmin' element={
            <ProtectedRoute allowedRole="superadmin">
              <ShowAdmin />
            </ProtectedRoute>
          } />

          <Route path='/admin/superadminprofile' element={
            <ProtectedRoute allowedRole="superadmin">
              <SuperAdminProfile />
            </ProtectedRoute>
          } />

          <Route path='/admin/edit_admin/:eml' element={
            <ProtectedRoute allowedRole="superadmin">
              <EditAdmin />
            </ProtectedRoute>
          } />

          <Route path='/admin/edit_superadmin/:eml' element={
            <ProtectedRoute allowedRole="superadmin">
              <EditSuperAdmin />
            </ProtectedRoute>
          } />

          <Route path='/admin/adddoctor' element={
            <ProtectedRoute allowedRole="superadmin">
              <DoctorRegistration />
            </ProtectedRoute>
          } />

          <Route path='/admin/showdoctor' element={
            <ProtectedRoute allowedRole="superadmin">
              <ShowDoctors />
            </ProtectedRoute>
          } />

          <Route path='/admin/edit_doctor/:eml' element={
            <ProtectedRoute allowedRole="superadmin">
              <EditDoctor />
            </ProtectedRoute>
          } />

          <Route path='/admin/addpatient' element={
            <ProtectedRoute allowedRole="superadmin">
              <AddPatient />
            </ProtectedRoute>
          } />

          <Route path='/admin/showpatient' element={
            <ProtectedRoute allowedRole="superadmin">
              <ShowPatients />
            </ProtectedRoute>
          } />

          <Route path='/admin/view_patient/:ptId' element={
            <ProtectedRoute allowedRole="superadmin">
              <ViewPatientsFullDetails />
            </ProtectedRoute>
          } />

          <Route path='/admin/edit_patient/:ptId' element={
            <ProtectedRoute allowedRole="superadmin">
              <EditPatient />
            </ProtectedRoute>
          } />

          <Route path='/admin/receptionist_registration' element={
            <ProtectedRoute allowedRole="superadmin">
              <ReceptionistRegistrataion />
            </ProtectedRoute>
          } />

          <Route path='/admin/show_receptionist_details' element={
            <ProtectedRoute allowedRole="superadmin">
              <ShowReceptionist />
            </ProtectedRoute>
          } />

          <Route path='/admin/show_appointments' element={
            <ProtectedRoute allowedRole="superadmin">
              <ShowAppointments />
            </ProtectedRoute>
          } />

          <Route path='/admin/edit_receptionist/:email' element={
            <ProtectedRoute allowedRole="superadmin">
              <EditReceptionist />
            </ProtectedRoute>
          } />



          <Route
            path="/book-appointment"
            element={
              <ProtectedRoute allowedRole="patient">
                <BookAppointment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/patient/home"
            element={
              <ProtectedRoute allowedRole="patient">
                <PatientHome />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-appointment"
            element={
              <ProtectedRoute allowedRole="patient">
                <MyAppointment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/myprofile"
            element={
              <ProtectedRoute allowedRole="patient">
                <PatientProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit_patient_profile"
            element={
              <ProtectedRoute allowedRole="patient">
                <EditPatientProfile />
              </ProtectedRoute>
            }
          />





          <Route
            path="/receptionist"
            element={
              <ProtectedRoute allowedRole="receptionist">
                <ReceptionistHome />
              </ProtectedRoute>
            }
          />

          <Route
            path="/receptionist/appointments"
            element={
              <ProtectedRoute allowedRole="receptionist">
                <ReceptionistAppointments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/receptionist/patients"
            element={
              <ProtectedRoute allowedRole="receptionist">
                <ReceptionistPatients />
              </ProtectedRoute>
            }
          />

          <Route
            path="/receptionist/patients/view/:ptId"
            element={
              <ProtectedRoute allowedRole="receptionist">
                <ReceptionistViewPatient />
              </ProtectedRoute>
            }
          />

          <Route
            path="/receptionist/patients/edit/:ptId"
            element={
              <ProtectedRoute allowedRole="receptionist">
                <ReceptionistEditPatient />
              </ProtectedRoute>
            }
          />

          <Route
            path="/receptionist/patients/add"
            element={
              <ProtectedRoute allowedRole="receptionist">
                <ReceptionistAddPatient />
              </ProtectedRoute>
            }
          />



          <Route
            path="/doctor/home"
            element={
              <ProtectedRoute allowedRole="doctor">
                <DoctorHome />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor/appointments"
            element={
              <ProtectedRoute allowedRole="doctor">
                <DoctorAppointments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor/profile"
            element={
              <ProtectedRoute allowedRole="doctor">
                <DoctorProfile />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Router>
    </>
  )
}

export default App;
