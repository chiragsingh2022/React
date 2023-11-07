import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = (Props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/Home');
        }
    }, []); // Add an empty dependency array to run the effect only once

    if (!localStorage.getItem('user')) {
        return null; // Return null to prevent rendering the protected component
    }

    let Cmp = Props.Cmp;

    return (
        <Cmp />
    );
}

export default Protected;
