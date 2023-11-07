// Copyright © 2022 Dr Bhimrao Ambedkar University, Agra                                      Design & Developed by: Dr. Bhimrao Ambedkar University, Agra

import '../css/Header.css'

const Footer = () =>{
    const currentYear = new Date().getFullYear();
    return(
        <div className="footer">
           <p>Copyright <sup>©</sup> {currentYear} SMSDC, Hathras <span style={{ margin: '0 80px' }}></span> Design & Developed by: SMSDC, Hathras</p>
        </div>
    );
}

export default Footer;