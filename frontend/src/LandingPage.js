import React from 'react';
import { Button, Card } from 'react-bootstrap';

const LandingPage = ({ userData, handleLogout }) => {
    return (
        <div className="landing-container">
            <Card className="text-center shadow p-4">
                <Card.Body>
                    <h2>Hello, {userData?.firstName}!</h2>
                    <p className="text-muted mt-3">
                        You're now logged in to DevConnect.
                    </p>

                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <Button variant="primary" size="lg">
                            Go to Dashboard
                        </Button>
                        <Button variant="outline-secondary" size="lg">
                            View Profile
                        </Button>
                    </div>

                    <div className="mt-5 pt-4 border-top">
                        <Button
                            variant="danger"
                            onClick={handleLogout}
                            className="px-4"
                        >
                            Logout
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default LandingPage;