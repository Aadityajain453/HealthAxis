import { useState } from "react";
import '../HomeComponents/css/LoginStyle.css';
import { HomeNavbar } from "../HomeComponents/navbars/HomeNavbar";
import hospital from "../../assets/hospital.png";

export const Login = () => {

    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

                        <button>

                            Login

                        </button>

                    </div>

                </div>

            </section>
        </>
    );
};