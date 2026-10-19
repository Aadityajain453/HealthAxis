import { useState } from "react";
import '../HomeComponents/css/LoginStyle.css';
import { HomeNavbar } from "./navbars/HomeNavbar";
import hospital from "../../assets/hospital.png";
import axios from "axios";
import { replace, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Login = () => {

    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const handleLogin = async () => {

        if (!email || !password || !role) {
            toast.error("Please fill all fields");
            return;
        }

        try {

            const response = await axios.post(
                "http://localhost:5000/api/login/login",
                {
                    email: email,
                    password: password,
                    role: role
                },
                {
                    withCredentials: true
                }
            );

            console.log(response.data);

            if (response.data.success) {

                toast.success("Login successful");

                if (response.data.usertype === "patient") {
                    navigate("/patient/home", { replace: true });
                }
                else if (response.data.usertype === "superadmin") {
                    navigate("/admin/dashboard", { replace: true });
                }

                // else if (response.data.usertype === "admin") {
                //     navigate("/");
                // }

                else if (response.data.usertype === "doctor") {
                    navigate("/doctor/home");
                }

                else if (response.data.usertype === "receptionist") {
                    navigate("/receptionist", { replace: true });
                }
            }

        } catch (error) {

            console.log(error);

            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Server error");
            }
        }
    };


    return (
        <>
            <HomeNavbar />

            <section className="login-page">

                <div className="left-side">

                    <h5>WELCOME TO</h5>

                    <h1>
                        Health<span>Axis</span>
                    </h1>

                    <div className="line"></div>

                    <p>
                        One Platform. Many Possibilities.
                    </p>

                    <p className="description">
                        Delivering better healthcare experiences
                        for hospitals, doctors and patients.
                    </p>

                    <img
                        src={hospital}
                        alt="hospital"
                        className="hospital-image"
                    />

                    <div className="features">

                        <div>
                            <h4>🔒</h4>
                            <p>Secure Data</p>
                        </div>

                        <div>
                            <h4>👨‍⚕️</h4>
                            <p>Role Based Access</p>
                        </div>

                        <div>
                            <h4>🩺</h4>
                            <p>24/7 Support</p>
                        </div>

                    </div>

                </div>

                <div className="right-side">

                    <div className="login-card">

                        <div className="lock">
                            🔐
                        </div>

                        <h2>Welcome Back</h2>

                        <p>Login to your HealthAxis account</p>



                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="" disabled>
                                Select Role
                            </option>

                            <option value="superadmin">Super Admin</option>
                            {/* <option value="admin">Admin</option> */}
                            <option value="doctor">Doctor</option>
                            <option value="receptionist">Receptionist</option>
                            <option value="patient">Patient</option>
                        </select>

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="options">

                            <label>

                                <input type="checkbox" />

                                Remember Me

                            </label>

                            <a href="#">Forgot Password?</a>

                        </div>

                        <button onClick={handleLogin}>

                            Login

                        </button>

                    </div>

                </div>

            </section>
        </>
    );
};