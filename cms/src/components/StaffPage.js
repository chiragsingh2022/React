import React from "react";
import '../css/InputFields.css';
import Navbar from './NavBar'
import Card from 'react-bootstrap/Card';

const StaffPage = () => {
    return (
        <>
            <div className="staff-container">
                <div className="navbar-section">
                    <Navbar />
                </div>
                <div className="content-section">
                    {
                        ['Karmendar Sainger', 'Bheesham pal singh', 'Umesh kumar', 'Karmendar Sainger', 'Bheesham pal singh', 'Umesh kumar', 'Karmendar Sainger', 'Bheesham pal singh', 'Umesh kumar'].map((res) => (
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="https://edtech4beginnerscom.files.wordpress.com/2021/05/1.png" />
                                <Card.Body >
                                    <Card.Title style={{ color: 'blue' }}>{res}</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>

                                </Card.Body>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default StaffPage;