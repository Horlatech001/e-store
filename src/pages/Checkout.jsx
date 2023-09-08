import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { PaystackButton } from "react-paystack";
import { auth, db } from '../Config';
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth'

const Checkout = ({ cart, totalPrice }) => {
    // State to store customer details
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("")
    const [isChecked, setIsChecked] = useState(false);

    const publicKey = "pk_test_9b2dc261dc817d12bb063212e10542e3d078d23f";
    const amount = Math.floor(totalPrice);

    const { currentUser } = useContext(AuthContext);

    // Use useEffect to set the input values when currentUser changes
    useEffect(() => {
        if (currentUser) {
            // Set the state variables with currentUser details
            setEmail(currentUser.email);
        }
    }, [currentUser]);

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    }
    
    const handleSuccess = async (firstname,
        lastname,
        address,
        phone,
        email,
        password) => {
        console.log("Payment made successfully!");
        // create user account
        try {
          const res = await createUserWithEmailAndPassword(auth, email, password);
          console.log(res);
          const userCredential = res.user;
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
        } catch (err) {
          console.error(err);
        }
      }

      const handleClose = () => {
        alert("Oops! Payment not completed");
      }

      const componentProps = {
        email,
        amount,
        publicKey,
        text: 'Place Order',
        onClose: handleClose,
      };

    return (
        <div className="container mt-5 check-out">
            <div className="row">
                <div className="col-md-6">
                    <div className="checkout-form">
                        <h2>Customer Details</h2>
                        <form>
                            <div className="form-group">
                                <label className="col-sm-2 col-form-label">Firstname:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 col-form-label">Lastname:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 col-form-label">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 col-form-label">Phone:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 col-form-label">Address:</label>
                                <textarea
                                    className="form-control"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group form-check form-switch mt-3 ">
                                <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Create an Account?</label>
                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={isChecked} onChange={toggleCheckbox} />
                            </div>
                            {isChecked && <div className="">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                                <input type="password" className="form-control" id="inputPassword" placeholder="Password" value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>}
                        </form>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="order-summary">
                        <h2>Order Summary</h2>
                        {cart.map((item) => (
                            <div key={item.id.stringValue} className="order-item">
                                <img src={item.image.mapValue.fields.src.stringValue} alt={item.title.stringValue} className="order-img" />
                                <div>{item.title.stringValue.substring(0, 21)}</div>
                                <div>
                                    {item.quantity} x ${item.price.stringValue}
                                </div>
                            </div>
                        ))}
                        <div className="total-price">
                            <div>Sub Total:</div>
                            <div>${totalPrice}</div>
                        </div>
                        <PaystackButton className="paystack-button btn btn-primary rounded-4 mb-5" {...componentProps} onSuccess={() => handleSuccess(firstName, lastName, address, phone, email, password)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
