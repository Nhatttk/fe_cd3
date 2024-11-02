import React from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../services/auth";
function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (confirmPassword !== formData.password) {
        setMessage("Passwords are not the same");
      } else {
        const data = await registerUser(formData); // Gọi hàm đăng ký
        setMessage(data.message); // Hiển thị thông báo thành công
      }
    } catch (error) {
      setMessage(error.message); // Hiển thị thông báo lỗi
    }
  };

  return (
    <MDBContainer
      fluid
      className="p-3 my-5 h-custom"
      style={{ maxWidth: "1400px", margin: "auto" }}
    >
      {message && <p>{JSON.stringify(message)}</p>}
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="img-fluid"
            alt="Sample image"
          />
        </MDBCol>

        <MDBCol col="4" md="6">
          <div className="divider d-flex align-items-center my-4 justify-content-center">
            <p className="fw-bold fs-1 mx-3 mb-0 text-center">Register</p>
          </div>

          <MDBInput
            wrapperClass="mb-4"
            label="Username"
            id="formControlLg"
            size="lg"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="formControlLg"
            type="email"
            name="email"
            size="lg"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <MDBInput
            wrapperClass="mb-4"
            label="First Name"
            id="formControlLg"
            type="email"
            name="first_name"
            size="lg"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Last Name"
            id="formControlLg"
            type="email"
            name="last_name"
            size="lg"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="formControlLg"
            type="password"
            name="password"
            size="lg"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password Confirm"
            id="formControlLg"
            type="password"
            size="lg"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="text-center text-md-start mt-4 pt-2">
            <MDBBtn
              onClick={handleRegister}
              className="mb-0 px-5"
              size="lg"
              style={{ width: "100%" }}
            >
              Register
            </MDBBtn>
            <p className="small fw-bold mt-3 pt-1 mb-2 text-center">
              Return Login ?{" "}
              <a
                onClick={() => navigate("/login")}
                href="/login"
                className="link-danger"
              >
                Login
              </a>
            </p>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
