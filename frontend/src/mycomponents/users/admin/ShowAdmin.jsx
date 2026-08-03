import { useEffect, useState } from "react"
import AdminNavbar from "./AdminNavbar"
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";


export const ShowAdmin = () => {


    const [admins, setAdmins] = useState([]);

    useEffect(
        () => {
            displayAdmins();
        },
        []
    );

    const displayAdmins = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/admin/getAdminData")

            console.log(response.data);

            setAdmins(response.data.data);

        } catch (error) {
            console.log(error);
        }
    }


    // Note: In axios DELETE requests, request body must be sent inside the 'data' property.

    const handleDeleteAdmin = async (email) => {
        try {

            const DeleteRecord = window.confirm("Are you sure you want to delete this admin?");

            if (DeleteRecord === false) {
                return;
            }
            const response = await axios.delete("http://localhost:5000/api/admin/getDeleteAdmin", { data: { email } });

            let result = response.data;
            console.log(result);

            if (result.message === "Data deleted successfully") {
                toast.success("Admin Deleted successfully");
                displayAdmins();
            }

        } catch (error) {
            
            if (error.response?.status === 404) {
                toast.error("Admin not found");
            } else {
                toast.error("Something went wrong");
            }
            console.log(error);

        }
    }


    return (
        <>
            <AdminNavbar />
            <div className="container my-4 table-responsive">
                <table className="table table-bordered table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Sr.No.</th>
                            <th>firstname</th>
                            <th>lastname</th>
                            <th>email</th>
                            <th>mobile</th>
                            <th>gender</th>
                            <th>role</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {admins.map((items, index) => (
                            <tr key={items.email}>
                                <td>{index + 1}</td>
                                <td>{items.firstName}</td>
                                <td>{items.lastName}</td>
                                <td>{items.email}</td>
                                <td>{items.mobile}</td>
                                <td>{items.gender}</td>
                                <td>{items.role}</td>
                                <td>
                                    <Link className="btn btn-warning btn-sm me-2" to={'/edit_admin/' + items.email}>Edit</Link>

                                    <button onClick={() => handleDeleteAdmin(items.email)} className="btn btn-danger btn-sm me-2" >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </>
    )
}