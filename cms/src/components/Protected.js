import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = (Props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get('user')) {
            window.location.href = '/login';
        }
    }, []); // Add an empty dependency array to run the effect only once

    if (!Cookies.get('user')) {
        return  window.location.href = '/login'; // Return null to prevent rendering the protected component
    }

    let Cmp = Props.Cmp;

    return (
        <Cmp />
    );
}

export default Protected;
