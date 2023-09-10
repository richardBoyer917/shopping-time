import React, { useState } from "react";
import "./checkout.css"


const Checkout = () => {
    const [currentStep, setCurrentStep] = useState("details");
    const [formValues, setFormValues] = useState({ firstname: "", lastname: "", email: "", phonenumber: "", streetaddress: "", country: "", postal: "", city: "", province: "", card: "", expiration: "", cvv: "" })
    const [formErrors, setFormErrors] = useState({});

    const setStep = (step, validationStep) => {
        setFormErrors(validateForm(formValues, validationStep));
        if (Object.keys(validateForm(formValues, validationStep)).length > 0) {
            return;
        }
        else {
            setCurrentStep(step);
        }
    };

    const validateForm = (values, step = "payment") => {
        const errors = {};
        if (step === "details") {
            if (!values.firstname) {
                errors.firstname = "First name is required";
            }
            if (!values.lastname) {
                errors.lastname = "Last name is required";
            }

            if (!values.email) {
                errors.email = "Please enter an email";
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            if (!values.phonenumber) {
                errors.phonenumber = "The phone number is required";
            }
        }
        if (step === "address") {
            if (!values.streetaddress) {
                errors.streetaddress = "Enter the street address";
            }
            if (!values.country) {
                errors.country = "Please enter a country";
            }
            if (!values.postal) {
                errors.postal = "Please enter a postal code";
            }
            if (!values.city) {
                errors.city = "Please enter the city";
            }
            if (!values.province) {
                errors.province = "Please enter the province name";
            }
        }
        if (step === "payment") {
            if (!values.card) {
                errors.card = "Card number is required";
            }
            if (!values.expiration) {
                errors.expiration = "Enter the expiration date";
            }
            if (!values.cvv) {
                errors.cvv = "CVV is required";
            }
        }
        return errors;
    }
    const submitForm = (e) => {
        e.preventDefault();
        setFormErrors(validateForm(formValues));
        if (Object.keys(validateForm(formValues)).length > 0) {
            return;
        }
        else {
            setCurrentStep("done");
            setFormValues({ firstname: "", lastname: "", email: "", phonenumber: "", streetaddress: "", country: "", postal: "", city: "", province: "", card: "", expiration: "", cvv: "" })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }
    return (
        <main className="checkout">
            <h1>Checkout</h1>
            <article className="checkout-content">
                {currentStep === "done" ? null :
                    <ul className="multi-steps">
                        <li><span className={`step-number`}>1</span><span className="step-title">Personal details</span></li>
                        <li><span className="step-number">2</span><span className="step-title">Delivery address</span></li>
                        <li><span className="step-number">3</span><span className="step-title">Payment method</span></li>
                    </ul>}

                <form onSubmit={submitForm}>
                    {currentStep === "details" ?
                        <React.Fragment>
                            <h2>Personal details</h2>
                            <section className="checkout-inputs">
                                <input
                                    onChange={handleChange}
                                    value={formValues.firstname}
                                    type="text"
                                    name="firstname"
                                    placeholder="First name"
                                />
                                <span className="error">{formErrors.firstname}</span>
                                <input
                                    onChange={handleChange}
                                    value={formValues.lastname}
                                    type="text"
                                    name="lastname"
                                    placeholder="Last name"
                                />
                                <span className="error">{formErrors.lastname}</span>
                                <input
                                    onChange={handleChange}
                                    value={formValues.email}
                                    type="email"
                                    name="email"
                                    placeholder="Email" />
                                <span className="error">{formErrors.email}</span>
                                <input
                                    onChange={handleChange}
                                    value={formValues.phonenumber}
                                    type="text"
                                    name="phonenumber"
                                    placeholder="Phone number"
                                />
                                <span className="error">{formErrors.phonenumber}</span>
                            </section>
                        </React.Fragment> :
                        currentStep === "address" ?
                            <React.Fragment>
                                <h2>Delivery information</h2>
                                <section className="checkout-inputs">
                                    <input
                                        onChange={handleChange}
                                        value={formValues.streetaddress}
                                        type="text"
                                        name="streetaddress"
                                        placeholder="Street address"
                                    />
                                    <span className="error">{formErrors.streetaddress}</span>
                                    <input
                                        onChange={handleChange}
                                        value={formValues.country}
                                        type="text"
                                        name="country"
                                        placeholder="Country"
                                    />
                                    <span className="error">{formErrors.country}</span>
                                    <input
                                        onChange={handleChange}
                                        value={formValues.postal}
                                        type="text"
                                        name="postal"
                                        placeholder="Postal code" />
                                    <span className="error">{formErrors.postal}</span>
                                    <input
                                        onChange={handleChange}
                                        value={formValues.city}
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                    />
                                    <span className="error">{formErrors.city}</span>
                                    <input
                                        onChange={handleChange}
                                        value={formValues.province}
                                        type="text"
                                        name="province"
                                        placeholder="Province"
                                    />
                                    <span className="error">{formErrors.province}</span>
                                </section>
                            </React.Fragment>
                            :
                            currentStep === "payment" ?

                                <React.Fragment>
                                    <h2>Payment</h2>
                                    <section className="checkout-inputs">
                                        <input
                                            onChange={handleChange}
                                            value={formValues.card}
                                            type="text"
                                            name="card"
                                            placeholder="Card number"
                                        />
                                        <span className="error">{formErrors.card}</span>
                                        <input
                                            onChange={handleChange}
                                            value={formValues.expiration}
                                            type="text"
                                            name="expiration"
                                            placeholder="MM / YY"
                                        />
                                        <span className="error">{formErrors.expiration}</span>
                                        <input
                                            onChange={handleChange}
                                            value={formValues.cvv}
                                            type="cvv"
                                            name="cvv"
                                            placeholder="CVV" />
                                        <span className="error">{formErrors.cvv}</span>
                                    </section>      </React.Fragment> :
                                currentStep === "done" ?
                                    <section className="order-success">
                                        <h2>Order Received Successfully!</h2>
                                        <p>Dear {formValues.firstname} {formValues.lastname},</p>
                                        <p>Congratulations!<br />
                                            Your order has been received successfully at Shopping Time. We're thrilled that you've chosen us for your fashion needs. Your style journey is about to begin!
                                        </p>
                                        <h3> Order Details:</h3>
                                        <ul>
                                            <li>Order Number: [Order Number]</li>
                                            <li> Order Date: [Order Date]</li>
                                            <li>Shipping Address: [Shipping Address]</li>
                                            <li>Billing Address: [Billing Address]</li>
                                            <li>Payment Method: [Payment Method]</li>
                                        </ul>
                                        <h3>Items Ordered:</h3>
                                        <ul>
                                            <li>[Item 1]: [Item Name] - [Item Price]</li>
                                            <li>[Item 1]: [Item Name] - [Item Price]</li>
                                            <li>[Item 1]: [Item Name] - [Item Price]</li>
                                        </ul>
                                        <p>
                                            Delivery Information:
                                            Your items will be carefully prepared and dispatched for delivery. You will receive a confirmation email with tracking information once your order ships.
                                            <br />
                                            Stay Connected:
                                            If you have any questions or need assistance, feel free to contact our customer support team at [Customer Support Email] or [Customer Support Phone Number].
                                            <br />
                                            Thank you for choosing Shopping Time. We can't wait to see you rocking your new outfits! Your satisfaction is our top priority.
                                            <br />
                                            Happy Shopping!
                                        </p>
                                        <p>Warm regards, <br />
                                            The Shopping Time Team</p>
                                    </section> : null}
                    {currentStep === "details" ?
                        <button className="active-add-to-cart" type="button" onClick={() => { setStep("address", "details") }}>Continue to address</button>
                        :
                        currentStep === "address" ?
                            <section className="form-buttons">

                                <button className="active-add-to-cart" type="button" onClick={(e) => { e.preventDefault(); setStep("payment", "address") }}>Continue to payment</button>
                                <button className="go-back" type="button" onClick={() => { setCurrentStep("details") }}>Go back</button>
                            </section> :
                            currentStep === "payment" ?
                                <section className="form-buttons">

                                    <button className="active-add-to-cart" type="submit">Submit</button>
                                    <button className="go-back" type="button" onClick={() => { setCurrentStep("address") }}>Go back</button>
                                </section> :
                                null}
                </form>
            </article>
        </main >

    )
}

export default Checkout;