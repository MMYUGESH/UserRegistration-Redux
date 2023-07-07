import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { User, REGISTER_USER, RootState, UserState } from '../redux/types';
import './RegistrationForm.css';



const RegistrationForm: React.FC = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [pincodeError, setPincodeError] = useState<string | null>(null);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [cityError, setCityError] = useState('');
    // const userList = useSelector((state: UserState) => state.userList);
    const userList = useSelector((state: RootState) => state.user.userList);
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate name
        if (!name) {
            setNameError('Name is required');
            return;
        }

        // Validate email
        if (!email) {
            setEmailError('Email is required');
            return;
        }
        // Validate city
        if (!city) {
            setCityError('City is required');
            return;
        }


        if (userList && userList.some((user) => user.email === email)) {
            setEmailError('Email is already registered');
            return;
        }


        // Validate pincode
        if (!pincode) {
            setPincodeError('Pincode is required');
            return;
        } else if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
            setPincodeError('Pincode must be a 6-digit number');
            return;
        }


        // Validate age
        const today = new Date();
        const userDob = new Date(dob);
        const dateofbirth = userDob.toLocaleDateString();
        const age = today.getFullYear() - userDob.getFullYear();
        if (age < 18) {
            setAgeError('You must be at least 18 years old');
            return;
        }

        const newUser: User = {
            id: uuid(),
            name,
            email,
            dob: dateofbirth,
            city,
            pincode,
        };

        dispatch({ type: REGISTER_USER, payload: newUser });

        // Reset form fields and errors
        setName('');
        setEmail('');
        setDob('');
        setCity('');
        setPincode('');
        setNameError('');
        setEmailError('');
        setAgeError('');
        setPincodeError('');



    };

    return (
        <>
            <h1 className="header">User Registration</h1>
            <form className="registration-form" onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {nameError && <p className="error">{nameError}</p>}
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {emailError && <p className="error">{emailError}</p>}
                </div>

                <div>
                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                        type="date"
                        id="dob"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                    {ageError && <p className="error">{ageError}</p>}

                </div>

                <div>
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                    {cityError && <p className="error">{cityError}</p>}
                </div>

                <div>
                    <label htmlFor="pincode">Pincode:</label>
                    <input
                        type="text"
                        id="pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        required
                    />
                    {pincodeError && <p className="error">{pincodeError}</p>}
                </div>

                <button type="submit">Register</button>
            </form>
        </>
    )
};
export default RegistrationForm;