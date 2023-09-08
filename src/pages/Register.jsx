import React, { useState } from "react";
import { auth, db } from '../Config';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const registerWithEmailAndPassword = async (
        firstname,
        lastname,
        address,
        phone,
        email,
        password
    ) => {
        setLoading(true);
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const userCredential = res.user;
            // console.log(userCredential);
            await addDoc(collection(db, "users"), {
                uid: userCredential.uid,
                firstname,
                lastname,
                address,
                phone,
                authProvider: "local",
                email,
                password,
            });
            { userCredential?.uid && navigate("/") }
        } catch (err) {
            console.error(err);
        }
        setTimeout(() => {
            setLoading(false);
        }, 3000)
    };

    return (
        <>
            <div className='container'>
                <div className="row">
                    <div className="register-card col-sm-4 offset-sm-4 mt-5 mb-5 rounded-4 pb-4 shadow">
                        <h3 className='text-center mt-3'>Registration Form</h3>
                        <div className="form-group row">
                            <div className="col-sm-10 offset-sm-1">
                                <label htmlFor="inputFirstName" className="col-sm-2 col-form-label">Firstname</label>
                                <input type="text" className="form-control" id="inputFirstName" value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)} required />
                            </div>
                            <div className="col-sm-10 offset-sm-1">
                                <label htmlFor="inputLastName" className="col-sm-2 col-form-label">Lastname</label>
                                <input type="text" className="form-control" id="inputLastName" value={lastName}
                                    onChange={(e) => setLastName(e.target.value)} required />
                            </div>
                            <div className="col-sm-10 offset-sm-1">
                                <label htmlFor="inputAddress" className="col-sm-2 col-form-label">Address</label>
                                <input type="text" className="form-control" id="inputAddress" value={address}
                                    onChange={(e) => setAddress(e.target.value)} required />
                            </div>
                            <div className="col-sm-10 offset-sm-1">
                                <label htmlFor="inputPhone" className="col-sm-2 col-form-label">Phone</label>
                                <input type="text" className="form-control" id="inputPhone" value={phone}
                                    onChange={(e) => setPhone(e.target.value)} required />
                            </div>
                            <div className="col-sm-10 offset-sm-1">
                                <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                                <input type="text" className="form-control" id="inputEmail" value={email}
                                    onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="col-sm-10 offset-sm-1">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                                <input type="password" className="form-control" id="inputPassword" value={password}
                                    onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                        </div>
                        <div className="col-sm-10 offset-sm-1 mt-3">
                            <Button variant='primary' onClick={() => registerWithEmailAndPassword(firstName, lastName, address, phone, email, password)} disabled={isLoading}>
                                {isLoading ? <Spinner animation='border' size='sm' /> : "Register"}
                            </Button>
                        </div>
                        <div className="col-sm-10 offset-sm-1 mt-3" >
                            <p>Already have an account? <Link to="/login">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
