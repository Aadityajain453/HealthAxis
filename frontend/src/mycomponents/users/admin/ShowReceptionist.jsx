import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { Link } from "react-router-dom";

export const ShowReceptionist = () => {

    const [receptionists, setReceptionists] = useState([]);

    useEffect(() => {
        displayReceptionists();
    }, []);

    const displayReceptionists = async () => {
        try {

            const response = await axios.post(
                "http://localhost:5000/api/receptionist/showreceptionists"
            );

            console.log(response.data);

            setReceptionists(response.data);

        } catch (error) {
            console.log(error);
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
                                    <Link className="btn btn-success btn-sm" to={"/edit_receptionist/" + item.email}>Edit</Link>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
        </>
    );
};

export default ShowReceptionist;