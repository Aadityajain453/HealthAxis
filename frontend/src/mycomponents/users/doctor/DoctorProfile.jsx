
import { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
    Card,
    Row,
    Col,
    Form,
    Button,
    Spinner,
    Alert
} from "react-bootstrap";
import { toast } from "react-toastify";
import DoctorNavbar from "./DoctorNavbar";

const API_URL = "http://localhost:5000/api/doctor";

const DoctorProfile = () => {
    const [doctor, setDoctor] = useState(null);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        mobile: "",
        gender: "",
        experience: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await axios.get(
                `${API_URL}/my-profile`,
                { withCredentials: true }
            );

            const data = response.data.data;

            setDoctor(data);

            setFormData({
                firstname: data.firstname?.trim() || "",
                lastname: data.lastname?.trim() || "",
                mobile: data.mobile || "",
                gender: data.gender || "",
                experience: String(data.experience ?? "")
            });

        } catch (error) {
            console.log(error);
            setError(
                error.response?.data?.message ||
                "Unable to load doctor profile"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCancel = () => {
        setFormData({
            firstname: doctor.firstname?.trim() || "",
            lastname: doctor.lastname?.trim() || "",
            mobile: doctor.mobile || "",
            gender: doctor.gender || "",
            experience: String(doctor.experience ?? "")
        });

        setIsEditing(false);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        const namePattern = /^[a-zA-Z ]+$/;
        const mobilePattern = /^[6-9][0-9]{9}$/;

        if (!formData.firstname.trim() ||
            !namePattern.test(formData.firstname.trim())) {
            toast.error("Please enter a valid first name");
            return;
        }

        if (!formData.lastname.trim() ||
            !namePattern.test(formData.lastname.trim())) {
            toast.error("Please enter a valid last name");
            return;
        }

        if (!mobilePattern.test(formData.mobile)) {
            toast.error("Please enter a valid mobile number");
            return;
        }

        if (!["Male", "Female"].includes(formData.gender)) {
            toast.error("Please select gender");
            return;
        }

        if (
            formData.experience === "" ||
            !Number.isFinite(Number(formData.experience)) ||
            Number(formData.experience) < 0
        ) {
            toast.error("Please enter valid experience");
            return;
        }

        try {
            setSaving(true);

            const response = await axios.put(
                `${API_URL}/update-my-profile`,
                {
                    ...formData,
                    experience: Number(formData.experience)
                },
                { withCredentials: true }
            );

            setDoctor(response.data.data);

            setFormData({
                firstname: response.data.data.firstname.trim(),
                lastname: response.data.data.lastname.trim(),
                mobile: response.data.data.mobile,
                gender: response.data.data.gender,
                experience: String(response.data.data.experience)
            });

            setIsEditing(false);
            toast.success("Profile updated successfully");

        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to update profile"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <>
                <DoctorNavbar />
                <Container className="mt-5 text-center">
                    <Spinner animation="border" />
                    <p className="mt-2">Loading profile...</p>
                </Container>
            </>
        );
    }

    if (error || !doctor) {
        return (
            <>
                <DoctorNavbar />
                <Container className="mt-4">
                    <Alert variant="danger">{error || "Profile not found"}</Alert>
                    <Button onClick={fetchProfile}>Try Again</Button>
                </Container>
            </>
        );
    }

    return (
        <>
            <DoctorNavbar />

            <Container className="my-4">
                <Card className="shadow-sm">
                    <Card.Body className="p-4">

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h3 className="mb-1">My Profile</h3>
                                <p className="text-muted mb-0">
                                    View and manage your personal details
                                </p>
                            </div>

                            {!isEditing && (
                                <Button
                                    variant="primary"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit Profile
                                </Button>
                            )}
                        </div>

                        <hr />

                        <Form onSubmit={handleUpdate}>
                            <h5 className="mb-3">Personal Information</h5>

                            <Row>
                                <Col md={6} className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        name="firstname"
                                        value={formData.firstname}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </Col>

                                <Col md={6} className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </Col>

                                <Col md={6} className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        value={doctor.email}
                                        disabled
                                    />
                                </Col>

                                <Col md={6} className="mb-3">
                                    <Form.Label>Mobile</Form.Label>
                                    <Form.Control
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        maxLength={10}
                                        disabled={!isEditing}
                                    />
                                </Col>

                                <Col md={6} className="mb-3">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Form.Select>
                                </Col>

                                <Col md={6} className="mb-3">
                                    <Form.Label>Experience (Years)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="0"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </Col>
                            </Row>

                            <hr />

                            <h5 className="mb-3">Professional Information</h5>

                            <Row>
                                <Col md={6} className="mb-3">
                                    <Form.Label>Department</Form.Label>
                                    <Form.Control value={doctor.department} disabled />
                                </Col>

                                <Col md={6} className="mb-3">
                                    <Form.Label>Specialization</Form.Label>
                                    <Form.Control value={doctor.specialization} disabled />
                                </Col>

                                <Col md={6} className="mb-3">
                                    <Form.Label>Qualification</Form.Label>
                                    <Form.Control value={doctor.qualification} disabled />
                                </Col>

                                <Col md={6} className="mb-3">
                                    <Form.Label>Consultation Fee</Form.Label>
                                    <Form.Control
                                        value={`₹ ${doctor.consultation_fee}`}
                                        disabled
                                    />
                                </Col>

                                <Col md={6} className="mb-3">
                                    <Form.Label>Account Status</Form.Label>
                                    <Form.Control value={doctor.status} disabled />
                                </Col>
                            </Row>

                            {isEditing && (
                                <div className="d-flex gap-2 justify-content-end mt-3">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={handleCancel}
                                        disabled={saving}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        type="submit"
                                        variant="success"
                                        disabled={saving}
                                    >
                                        {saving ? "Saving..." : "Save Changes"}
                                    </Button>
                                </div>
                            )}
                        </Form>

                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default DoctorProfile;
