import { useEffect, useState } from "react"
import AdminNavbar from "./AdminNavbar"
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const ShowDoctors = () => {

    const [doctors, setDoctors] = useState([]);

    useEffect(
        () => {
            displayDoctors();
        },
        []
    );

    const displayDoctors = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/doctor/showdoctors");

            console.log(response.data);
            setDoctors(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteDoctor = async (email) => {
        try {
            const DeleteRecord = window.confirm("Are you sure you want to delete this doctor?");

            if (DeleteRecord === false) {
                return;
            }
            const response = await axios.delete("http://localhost:5000/api/doctor/deleteDoctorData", { data: { email } });

            let result = response.data;
            console.log(result);

            if (result.message === "Data deleted successfully") {
                toast.success("Doctor deleted successfully");
                displayDoctors();
            }

        } catch (error) {
            console.log(error);
            
            if (error.response?.status === 404) {
                toast.error("Doctor not found");
            } else {
                toast.error("Something went wrong");
            }
        }
    }
    return (
        <>
            <AdminNavbar />
            <div className="container-fluid">
                <h3 className="text-center my-3">Show Doctors</h3>

                <table className="table table-bordered table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>S.No.</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Department</th>
                            <th>Specialization</th>
                            <th>Qualification</th>
                            <th>Experience</th>
                            <th>ConsultFee</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody>
                        {doctors.map((item, index) => (
                            <tr key={item.email}>
                                <td>{index + 1}</td>
                                <td>{item.firstname}</td>
                                <td>{item.lastname}</td>
                                <td>{item.email}</td>
                                <td>{item.mobile}</td>
                                <td>{item.department}</td>
                                <td>{item.specialization}</td>
                                <td>{item.qualification}</td>
                                <td>{item.experience}</td>
                                <td>{item.consultation_fee}</td>
                                <td>{item.status}</td>
                                <td>
                                    <Link className="btn btn-success btn-sm mb-2" to={"/edit_doctor/" + item.email}>Edit</Link>

                                    <button onClick={() => handleDeleteDoctor(item.email)} className="btn btn-danger btn-sm ">Delete</button>
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