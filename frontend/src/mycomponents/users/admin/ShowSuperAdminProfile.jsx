import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { Link } from "react-router-dom";

const SuperAdminProfile = () => {

    const [superadmin, setSuperAdmin] = useState(null);

    useEffect(() => {
        displaySuperAdmin();
    }, []);

    const displaySuperAdmin = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/admin/getSuperAdminData"
            );

            console.log(response.data);

            setSuperAdmin(response.data.data);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <AdminNavbar />

            <div className="container my-5">
                <div
                    className="card shadow-lg border-0 mx-auto"
                    style={{ maxWidth: "600px" }}
                >

                    <div className="card-header bg-primary text-white text-center">
                        <h3>Super Admin Profile</h3>
                    </div>

                    <div className="card-body">

                        {superadmin && (
                            <>

                                <div className="row mb-3">
                                    <div className="col-4 fw-bold">
                                        First Name
                                    </div>
                                    <div className="col-8">
                                        {superadmin.firstName}
                                    </div>
                                </div>


                                <div className="row mb-3">
                                    <div className="col-4 fw-bold">
                                        Last Name
                                    </div>
                                    <div className="col-8">
                                        {superadmin.lastName}
                                    </div>
                                </div>


                                <div className="row mb-3">
                                    <div className="col-4 fw-bold">
                                        Email
                                    </div>
                                    <div className="col-8">
                                        {superadmin.email}
                                    </div>
                                </div>


                                <div className="row mb-3">
                                    <div className="col-4 fw-bold">
                                        Mobile
                                    </div>
                                    <div className="col-8">
                                        {superadmin.mobile}
                                    </div>
                                </div>


                                <div className="row mb-3">
                                    <div className="col-4 fw-bold">
                                        Gender
                                    </div>
                                    <div className="col-8">
                                        {superadmin.gender}
                                    </div>
                                </div>


                                <div className="row mb-5">
                                    <div className="col-4 fw-bold">
                                        Role
                                    </div>

                                    <div className="col-8">
                                        <span className="badge bg-success">
                                            {superadmin.role}
                                        </span>
                                    </div>
                                </div>


                                <div className="text-center">
                                   <Link className="btn btn-warning px-4 fw-bold" to={'/edit_superadmin/' + superadmin.email}>Edit</Link>
                                </div>

                            </>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
};

export default SuperAdminProfile;