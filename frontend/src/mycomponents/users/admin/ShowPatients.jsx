import { useEffect, useState } from "react"
import AdminNavbar from "./AdminNavbar"
import axios from "axios";
import { Link } from "react-router-dom";

export const ShowPatients = () =>{

    const [patient, setPatient] = useState([]);

    useEffect(
        ()=>{
            fetchPatients();
        },
        []
    );

    const fetchPatients = async () =>{
        try{
            const response = await axios.post("http://localhost:5000/api/patient/fetchpatients");

            setPatient(response.data);
            console.log(response.data);

        }catch(error){  
            console.log(error);
        }
    }

    return(
        <>
        <AdminNavbar/>
            <div className="container-fluid">
                <h2 className="text-center mt-3">Show Patients</h2>

                <table className="table table-bordered table-striped table-hover">
                    <thead className="table-success">
                        <tr>
                            <th>Patient ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Gender</th>
                            <th>BloodGroup</th>
                            <th>City</th>
                            <th>Actions</th>

                        </tr>
                    </thead>

                    <tbody>
                        {patient.map((items) =>(
                            <tr key={items.patientID}>
                                <td>{items.patientID}</td>
                                <td>{items.firstname} {items.lastname}</td>
                                <td>{items.email}</td>
                                <td>{items.mobile}</td>
                                <td>{items.gender}</td>
                                <td>{items.bloodgroup}</td>
                                <td>{items.city}</td>
                                <td className="px-4">
                                    <Link to={'/view_patient/'+ items.patientID} className="btn btn-primary btn-sm" >View</Link>

                                    <Link to={'/edit_patient/' + items.patientID} className="btn btn-warning btn-sm ms-3">Edit</Link>

                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>

                    <tfoot>

                    </tfoot>
                </table>
            </div>
        </>
    )
}