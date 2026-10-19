
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import DoctorNavbar from './DoctorNavbar';

const DoctorHome = () => {
    return (
        <>
            <DoctorNavbar />
            <Container className="mt-4">
                <Card className="shadow-sm">
                    <Card.Body>
                        <h2>Doctor Dashboard</h2>
                        <p>Welcome to the HealthAxis Doctor Panel.</p>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default DoctorHome;
