import '../css/MainCss.css';
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import NavBar from './NavBar';
import { Container, Image, Table } from 'react-bootstrap';
const Home = () => {

    return (

        <>
            <NavBar />
            <div className='image-div' >
                
                    <Image style={{ width: '100%', height: '100%' }} src="https://cdn.pixabay.com/photo/2016/01/19/01/42/library-1147815_1280.jpg" alt='College Image' thumbnail />                
            </div>
           <div className='section-div'>

           </div>
        </>
    );
}
export default Home;