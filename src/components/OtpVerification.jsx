import React, { useState, useRef, useEffect } from "react";
import "./OtpInput.css";
import image from "../assets/logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

const OtpInput = () => {
  const location = useLocation();
  const email = location.state?.email || "";
  localStorage.setItem("userEmail", email);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      const prevInput = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleOTPVerification = () => {
    const otpString = otp.join(""); 

    fetch("http://localhost:3000/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp: otpString }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          toast.success("Email verified successfully!");
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 3000);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        toast.error("An error occurred during OTP verification.");
        console.error("OTP Verification Error:", error);
      });
  };

  return (
    <div className="otp-form-container">
      <div className="otp-box">
        <div className="logo-container">
          <img src={image} alt="Logo" className="logo" />
        </div>
        <h2 className="otp-heading">Verify Your OTP</h2>
        <form className="otp-form" onSubmit={(e) => e.preventDefault()}>
          <div className="otp-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(ref) => (inputRefs.current[index] = ref)}
                className="otp-input"
              />
            ))}
          </div>
          <button
            type="button"
            className="verify-button"
            onClick={handleOTPVerification}
          >
            Verify OTP
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
      />
    </div>
  );
};

export default OtpInput;
