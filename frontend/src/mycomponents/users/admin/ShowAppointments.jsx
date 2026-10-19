
import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { toast } from "react-toastify";

export const ShowAppointments = () => {

    const [appointments, setAppointments] = useState([]);
    const [updatingID, setUpdatingID] = useState("");

    useEffect(() => {
        displayAppointments();
    }, []);

    const displayAppointments = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/appointment/showAppointments"
            );

            if (response.data.success) {
                setAppointments(response.data.data);
            }

        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch appointments");
        }
    };

    const handleStatusUpdate = async (appointmentID, status) => {
        try {
            setUpdatingID(appointmentID);

            const response = await axios.put(
                "http://localhost:5000/api/appointment/updateAppointmentStatus",
                {
                    appointmentID,
                    status
                }
            );

            if (response.data.success) {
                setAppointments((previousAppointments) =>
                    previousAppointments.map((item) =>
                        item.appointmentID === appointmentID
                            ? { ...item, status }
                            : item
                    )
                );

                toast.success("Appointment status updated successfully");
            }

        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to update appointment status"
            );
        } finally {
            setUpdatingID("");
        }
    };

    return (
        <>
            <AdminNavbar />

            <div className="container-fluid">
                <h3 className="text-center my-3">
                    Appointment Management
                </h3>

                <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover">

                        <thead className="table-dark">
                            <tr>
                                <th>S.No.</th>
                                <th>Appointment ID</th>
                                <th>Patient ID</th>
                                <th>Doctor Email</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Reason</th>
                                <th>Created By</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {appointments.map((item, index) => (
                                <tr key={item.appointmentID}>
                                    <td>{index + 1}</td>
                                    <td>{item.appointmentID}</td>
                                    <td>{item.patientID}</td>
                                    <td>{item.doctorEmail}</td>

                                    <td>
                                        {new Date(item.appointmentDate)
                                            .toLocaleDateString("en-IN")}
                                    </td>

                                    <td>{item.appointmentTime}</td>
                                    <td>{item.reason}</td>
                                    <td>{item.createdBy}</td>

                                    <td>
                                        <span
                                            className={`badge ${item.status === "Confirmed"
                                                    ? "bg-success"
                                                    : item.status === "Completed"
                                                        ? "bg-primary"
                                                        : item.status === "Cancelled"
                                                            ? "bg-danger"
                                                            : "bg-warning text-dark"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>

                                    <td>
                                        <select
                                            className="form-select form-select-sm"
                                            value={item.status}
                                            disabled={
                                                updatingID !== "" ||
                                                item.status === "Cancelled"
                                            }
                                            onChange={(e) =>
                                                handleStatusUpdate(
                                                    item.appointmentID,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="Pending">
                                                Pending
                                            </option>
                                            <option value="Confirmed">
                                                Confirmed
                                            </option>
                                            <option value="Completed">
                                                Completed
                                            </option>
                                            <option value="Cancelled">
                                                Cancelled
                                            </option>
                                        </select>

                                        {updatingID === item.appointmentID && (
                                            <small className="text-muted">
                                                Updating...
                                            </small>
                                        )}
                                    </td>
                                </tr>
                            ))}

                            {appointments.length === 0 && (
                                <tr>
                                    <td colSpan="10" className="text-center">
                                        No appointments found
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    );
};

export default ShowAppointments;
