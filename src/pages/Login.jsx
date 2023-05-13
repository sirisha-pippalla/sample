import React, { useState, useEffect } from "react";
import Logo from "../components/Logo.png";
import { Form, Input, Button, Checkbox, Col, Row, Card, Divider } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";


const Login = () => {
  //global state
  const { showAlert, displayAlert } = useAppContext();
  //To store the data from frontend
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(null);
  const [diplayError, setdisplayError] = useState(false);
  const navigate = useNavigate();
  // const [error, setError] = useState(false);
  //success message for db
  // const [success, setSuccess] = useState(false);

  //function to fetch the data from DB
  const submitData = async () => {
    const data = {
      email: email,
      // password: password,
    };
    try {
      const res = await axios.post("http://localhost:4000/getUser", data);
      console.log(res);

      if (res && res.data && res.data.success) {
        localStorage.setItem("authenticated", "true");
        setLoggedIn(true);
      }
      // if (!res.ok) {
      //   setError(true);
      //   return;
      // }
    } catch (err) {
      console.log(err);
      if (
        err.response &&
        err.response.data &&
        err.response.data.success &&
        err.response.data.success === false
      ) {
        setLoggedIn(false);
      } else {
        setLoggedIn(false);
      }
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleCommit = () => {
    console.log('handle commit')
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      displayAlert();
      setdisplayError(true);
      return;
    }
    //To submit data
    submitData();


    //for empty the previous details
    // setEmail("");
    // setPassword("");
  };
  return (
    <div style={{ backgroundColor: "#EBFAF4", height: "97vh" }}>
      {/* {isLoggedIn && <Navigate to="/pricing" replace={true} />} */}
      {isLoggedIn && setTimeout(() => {
        navigate("/pricing");
      },)}
      <div className="header-login">
        <img
          src={Logo}
          alt="Logo"
          width="110rem"
          style={{ marginLeft: "1rem" }}
        />
      </div>
      <Row gutter={15} style={{ marginTop: "5rem" }}>
        <Col span={8} offset={8}>
          <Card bordered={true}>
            <h1
              style={{
                color: "green",
                justifyContent: "center",
                float: "center",
                alignItems: "center",
              }}
            >
              Littr Login
            </h1>
            <Divider />
            {showAlert && <Alert />}
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  value={email}
                  onChange={handleEmail}
                />
                {diplayError && email.length <= 0 ? (
                  <span style={{ color: "red", fontStyle: "italic" }}>
                    please fill the email.
                  </span>
                ) : (
                  ""
                )}
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePassword}
                />
                {diplayError && password.length <= 0 ? (
                  <span style={{ color: "red", fontStyle: "italic" }}>
                    please fill the password.
                  </span>
                ) : (
                  ""
                )}
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  size="large"
                  onClick={handleSubmit}
                >
                  {/* <Link to="/pricing">Log in</Link> */}
                  Log in
                </Button>
              </Form.Item>
            </Form>
            {isLoggedIn === false ? <span style={{color:"red"}}>User is not exist</span> : ""}
            {isLoggedIn === true ? <span style={{color:"green"}}>Successfully Login..</span> : ""}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
