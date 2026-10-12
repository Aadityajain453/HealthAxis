import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { toast } from "react-toastify";

export const EditReceptionist = () => {

    const { email } = useParams();

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [mobile, setMobile] = useState("");
    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        fetchReceptionistData();
    }, []);

    const fetchReceptionistData = async () => {

        try {

            const response = await axios.post(
                "http://localhost:5000/api/receptionist/fetcheditreceptionist",
                {
                    email: email
                }
            );

            console.log(response.data);

            if (response.data.success) {

                const data = response.data.data;

                setFirstName(data.firstname);
                setLastName(data.lastname);
                setEmailId(data.email);
                setMobile(data.mobile);
                setGender(data.gender);
                setStatus(data.status);
            }

        } catch (error) {

            console.log(error);

            if (error.response?.status === 404) {
                toast.error("Receptionist not found");
            } else {
                toast.error("Something went wrong");
            }
        }
    };

    return (
        <>
            <AdminNavbar />

            <div className="container mt-4">

                <h3 className="text-center mb-4">
                    Edit Receptionist
                </h3>

                <form>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                First Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={firstname}
                                onChange={(e) => setFirstName(e.target.value)}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Last Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={lastname}
                                onChange={(e) => setLastName(e.target.value)}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Email
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                value={emailId}
                                readOnly
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Mobile
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Gender
                            </label>

                            <select
                                className="form-select"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
                                Status
                            </label>

                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>

                        </div>

                    </div>

                    <div className="text-center mt-3">

                        <button
                            type="button"
                            className="btn btn-primary"
                        >
                            Update Receptionist
                        </button>

                    </div>

                </form>

            </div>
        </>
    );
};

export default EditReceptionist;