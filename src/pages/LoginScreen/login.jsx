import React, { useEffect, useState } from "react";
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
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  // useEffect(() => {
  //   const isAuthenticated = localStorage.getItem("accessToken") !== null;
  //   if (isAuthenticated) {
  //     setTimeout(5000);
  //     navigate("/home");
  //   }
  // }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); 

    try {
      const { access, refresh } = await login(username, password);
      
      if (access != null) {
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        navigate('/home')
      } else {
        setError("Tên đăng nhập hoặc mật khẩu không đúng");
      }
 
      // Chuyển hướng sau khi đăng nhập thành công
      
    } catch (error) {
      setError("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  };

  return (
    <MDBContainer
      fluid
      className="p-3 my-5 h-custom"
      style={{ maxWidth: "1400px", margin: "auto" }}
    >
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
            <p className="fw-bold fs-1 mx-3 mb-0 text-center">Login</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>

          <MDBInput
            wrapperClass="mb-4"
            label="Username"
            id="formControlLg"
            size="lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="formControlLg"
            type="password"
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="text-center text-md-start mt-4 pt-2">
            <MDBBtn
              onClick={handleLogin}
              className="mb-0 px-5"
              size="lg"
              style={{ width: "100%" }}
            >
              Login
            </MDBBtn>
            <p className="small fw-bold mt-3 pt-1 mb-2 text-center">
              Don't have an account?{" "}
              <a
                href="/register"
                className="link-danger"
              >
                Register
              </a>
            </p>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
