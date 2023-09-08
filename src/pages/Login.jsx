import React, { useState } from 'react'
import { auth } from '../Config';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Spinner } from 'react-bootstrap';
import CustomAlert from '../component/CustomAlert';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const navigate = useNavigate();

    const loginUser = () => {
        if (email === '' || password === '') {
            setAlertMessage('Enter your email and password');
            setShowAlert(true);
        } else {
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // console.log(userCredential);
                    { userCredential.user.uid && navigate("/") }
                })
                .catch((error) => {
                    let errorCode = error.code;
                    let errorMessage;
                    switch (errorCode) {
                        case 'auth/user-not-found':
                            errorMessage = 'Invalid email entered';
                            break;
                        case 'auth/wrong-password':
                            errorMessage = 'Invalid password entered';
                            break;
                        default:
                            errorMessage = 'Network issue: Sign in failed';
                            break;
                    }
                    setAlertMessage(errorMessage)
                    setShowAlert(true);
                });
            setTimeout(() => {
                setLoading(false);
            }, 3000)
        }
    }


    const togglePasswordVisibility = () => {
        setIsPasswordHidden(!isPasswordHidden);
    }

    return (
        <>
            <div className='container single'>
                <div className="row">
                    <div className="login-card col-sm-4 offset-sm-4 mt-5 pb-4 shadow rounded-4">
                        <h3 className='text-center mb-3 mt-3'>Login Form</h3>
                        <div className="form-group row">
                            <div className="col-sm-10 offset-sm-1">
                                <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                                <input type="text" className="form-control" id="inputEmail" value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="col-sm-10 offset-sm-1">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                                <div className='password-wrapper'>
                                    <input type={isPasswordHidden ? 'password' : 'text'} className="form-control" id="inputPassword" value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                    <span onClick={togglePasswordVisibility}>{isPasswordHidden ? <i className='fa fa-eye'></i> : <i className='fa fa-eye-slash'></i>}</span>
                                </div>
                            </div>
                            <div className="col-sm-10 offset-sm-1 mt-3">
                                <Button variant='primary' onClick={loginUser} disabled={isLoading}>
                                    {isLoading ? <Spinner animation='border' size='sm' /> : "Login"}
                                </Button>
                                    {showAlert && (
                                        <CustomAlert message={alertMessage} />
                                    )}
                            </div>
                        </div>
                        <div className="col-sm-10 offset-sm-1 mt-3" >
                            <p>Doesn't have an account? <Link to="/register">Create an Account</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
