import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { toast } from "react-toastify";

export const EditReceptionist = () => {

    const { email } = useParams();
    const navigate = useNavigate();

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [mobile, setMobile] = useState("");
    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("");

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [originalData, setOriginalData] = useState(null);

    useEffect(() => {
        fetchReceptionistData();
    }, [email]);

    const fetchReceptionistData = async () => {

        try {

            setFetching(true);

            const response = await axios.post(
                "http://localhost:5000/api/receptionist/fetcheditreceptionist",
                {
                    email: email
                }
            );

            if (response.data.success) {

                const data = response.data.data;

                setOriginalData({
                    firstname: data.firstname.trim(),
                    lastname: data.lastname.trim(),
                    email: data.email,
                    mobile: data.mobile,
                    gender: data.gender,
                    status: data.status
                });

                setFirstName(data.firstname.trim());
                setLastName(data.lastname.trim());
                setEmailId(data.email);
                setMobile(data.mobile);
                setGender(data.gender);
                setStatus(data.status);
            }

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch receptionist data"
            );

        } finally {
            setFetching(false);
        }
    };

    const handleUpdateReceptionist = async (e) => {

        e.preventDefault();

        if (loading) {
            return;
        }

        const firstNameRegex = /^[A-Za-z ]+$/;
        const lastNameRegex = /^[A-Za-z ]+$/;
        const mobileRegex = /^[6-9][0-9]{9}$/;

        if (!firstname.trim()) {
            toast.error("Please enter first name");
            return;
        }

        if (!firstNameRegex.test(firstname.trim())) {
            toast.error("First name can contain only letters and spaces");
            return;
        }

        if (!lastname.trim()) {
            toast.error("Please enter last name");
            return;
        }

        if (!lastNameRegex.test(lastname.trim())) {
            toast.error("Last name can contain only letters and spaces");
            return;
        }

        if (!mobileRegex.test(mobile.trim())) {
            toast.error("Enter a valid 10-digit mobile number");
            return;
        }

        if (!gender) {
            toast.error("Please select gender");
            return;
        }

        if (!status) {
            toast.error("Please select status");
            return;
        }

        if (
            originalData &&
            firstname.trim() === originalData.firstname &&
            lastname.trim() === originalData.lastname &&
            emailId === originalData.email &&
            mobile.trim() === originalData.mobile &&
            gender === originalData.gender &&
            status === originalData.status
        ) {
            toast.info("Nothing has changed");
            return;
        }

        try {

            setLoading(true);

            const response = await axios.put(
                "http://localhost:5000/api/receptionist/updatereceptionist",
                {
                    email: emailId,
                    firstname: firstname.trim(),
                    lastname: lastname.trim(),
                    mobile: mobile.trim(),
                    gender,
                    status
                }
            );

            if (response.data.success) {

                toast.success("Receptionist updated successfully");

                navigate("/show_receptionist_details");
            }

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AdminNavbar />

            <div className="container mt-4">

                <h3 className="text-center mb-4">
                    Edit Receptionist
                </h3>

                {fetching ? (

                    <p className="text-center">
                        Loading receptionist data...
                    </p>

                ) : (

                    <form onSubmit={handleUpdateReceptionist}>

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
                                    required
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
                                    required
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
                                    type="tel"
                                    className="form-control"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    maxLength={10}
                                    required
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
                                    required
                                >
                                    <option value="" disabled>Select Gender</option>
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
                                    required
                                >
                                    <option value="" disabled>
                                        Select Status
                                    </option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>

                            </div>

                        </div>

                        <div className="text-center mt-3">

                            <button
                                type="submit"
                                className="btn btn-primary me-2"
                                disabled={loading}
                            >
                                {loading
                                    ? "Updating..."
                                    : "Update Receptionist"}
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                disabled={loading}
                                onClick={() =>
                                    navigate("/show_receptionist_details")
                                }
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                )}

            </div>
        </>
    );
};

export default EditReceptionist;
