
import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const ShowReceptionist = () => {

    const [receptionists, setReceptionists] = useState([]);
    const [deletingEmail, setDeletingEmail] = useState("");

    useEffect(() => {
        displayReceptionists();
    }, []);

    const displayReceptionists = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/receptionist/showreceptionists"
            );

            setReceptionists(response.data);

        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch receptionists");
        }
    };

    const handleDeleteReceptionist = async (email) => {

        if (deletingEmail) {
            return;
        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this receptionist?"
        );

        if (!confirmDelete) {
            toast.info("Deletion cancelled");
            console.log("Cancel delete");
            return;
        }

        try {
            setDeletingEmail(email);

            const response = await axios.delete(
                "http://localhost:5000/api/receptionist/deletereceptionist",
                {
                    data: { email }
                }
            );

            console.log(response.data.message);
            if (response.data.success) {
                toast.success("Receptionist deleted successfully");

                setReceptionists((previousReceptionists) =>
                    previousReceptionists.filter(
                        (item) => item.email !== email
                    )
                );
            }

        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to delete receptionist"
            );
        } finally {
            setDeletingEmail("");
        }
    };

    return (
        <>
            <AdminNavbar />

            <div className="container-fluid">

                <h3 className="text-center my-3">
                    Show Receptionists
                </h3>

                <table className="table table-bordered table-striped table-hover">

                    <thead className="table-dark">
                        <tr>
                            <th>S.No.</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {receptionists.map((item, index) => (
                            <tr key={item.email}>
                                <td>{index + 1}</td>
                                <td>{item.firstname}</td>
                                <td>{item.lastname}</td>
                                <td>{item.email}</td>
                                <td>{item.mobile}</td>
                                <td>{item.gender}</td>
                                <td>{item.status}</td>

                                <td>
                                    <Link
                                        className="btn btn-success btn-sm me-2"
                                        to={"/edit_receptionist/" + item.email}
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        disabled={deletingEmail !== ""}
                                        onClick={() =>
                                            handleDeleteReceptionist(item.email)
                                        }
                                    >
                                        {deletingEmail === item.email
                                            ? "Deleting..."
                                            : "Delete"}
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {receptionists.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center">
                                    No receptionists found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </>
    );
};

export default ShowReceptionist;
