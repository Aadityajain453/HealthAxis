import { useEffect, useState } from "react";
import axios from "axios";
import ReceptionistNavbar from "./ReceptionistNavbar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ReceptionistPatients = () => {

    const [patient, setPatient] = useState([]);
    const [search, setSearch] = useState("");




    const handleDeletePatient = async (patientID) => {
        try {
            const DeleteRecord = window.confirm(
                "Are you sure you want to delete this patient?"
            );

            if (!DeleteRecord) {
                return;
            }

            const response = await axios.delete(
                "http://localhost:5000/api/patient/deletePatient",
                {
                    data: { patientID }
                }
            );

            const result = response.data;

            if (result.success) {
                toast.success(result.message);
                fetchPatients();
            }

        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        }
    };



    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {

            const response = await axios.post(
                "http://localhost:5000/api/patient/fetchpatients"
            );

            setPatient(response.data);
            console.log(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = async (event) => {

        try {

            const searchValue = event.target.value;

            setSearch(searchValue);

            if (searchValue.trim() === "") {
                fetchPatients();
                return;
            }

            const response = await axios.post(
                "http://localhost:5000/api/patient/searchpatients",
                {
                    search: searchValue
                }
            );

            setPatient(response.data.data);
            console.log(response.data.data);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <ReceptionistNavbar />

            <div className="container-fluid">

                <h2 className="text-center mt-3">
                    Show Patients
                </h2>

                <div className="text-end mb-3">
                    <Link
                        to="/receptionist/patients/add"
                        className="btn btn-success"
                    >
                        Add Patient
                    </Link>
                </div>

                <div className="row mb-3">

                    <div className="col-md-6 mx-auto">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Patient"
                            value={search}
                            onChange={handleSearch}
                        />

                    </div>

                </div>

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

                        {patient.map((items) => (

                            <tr key={items.patientID}>

                                <td>{items.patientID}</td>

                                <td>
                                    {items.firstname} {items.lastname}
                                </td>

                                <td>{items.email}</td>

                                <td>{items.mobile}</td>

                                <td>{items.gender}</td>

                                <td>{items.bloodgroup}</td>

                                <td>{items.city}</td>
                                <td>
                                    <Link
                                        to={"/receptionist/patients/view/" + items.patientID}
                                        className="btn btn-primary btn-sm"
                                    >
                                        View
                                    </Link>

                                    <Link
                                        to={"/receptionist/patients/edit/" + items.patientID}
                                        className="btn btn-warning btn-sm ms-2"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => handleDeletePatient(items.patientID)}
                                        className="btn btn-danger btn-sm ms-2"
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
        </>
    );
};

export default ReceptionistPatients;

