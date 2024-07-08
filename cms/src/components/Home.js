import '../css/MainCss.css';
import React from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import { createTheme } from '@mui/material/styles';
import Header from './Header';


const defaultTheme = createTheme();
const Home = () => {

    // Cookies.remove('user');
    // Cookies.remove('token');
    return (
        <div className='home-main'>
            <div className="home-rows">
                <Header />
                <NavBar />
            </div>
            
            <div className="home-content-rows">
                <section className='home-content-section'>
                    <div className='section-header'>Notice</div>
                </section>
                <section className='home-content-section'></section>
                <section className='home-content-section'></section>
            </div>
            <div className="home-rows"><Footer /></div>

        </div>
    );
}
export default Home;


{/* <Grid container component="main">
                    <section className='image-div' >
                    </section>
                    <section className='section-div'>
                        <main>
                            <section>
                                <h2>Get in Touch</h2>
                                <p>
                                    We would love to hear from you! If you have any questions or
                                    inquiries, please feel free to reach out to us.
                                </p>
                            </section>

                            <section>
                                <h2>Contact Information</h2>
                                <p>
                                    <strong>Email:</strong> info@mycollege.edu
                                </p>
                                <p>
                                    <strong>Phone:</strong> +1 (123) 456-7890
                                </p>
                                <p>
                                    <strong>Address:</strong> 123 College Street, Cityville, State, ZIP
                                </p>
                            </section>

                            <section>
                                <h2>Contact Form</h2>
                                <form>
                                    <label htmlFor="name">Your Name:</label>
                                    <input type="text" id="name" name="name" required />

                                    <label htmlFor="email">Your Email:</label>
                                    <input type="email" id="email" name="email" required />

                                    <label htmlFor="message">Your Message:</label>
                                    <textarea id="message" name="message" rows="4" required></textarea>

                                    <button type="submit">Submit</button>
                                </form>
                            </section>
                        </main>
                    </section>
                </Grid> */}