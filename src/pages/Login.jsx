import React, { useState, useEffect } from "react";
import Logo from "../components/Logo.png";
import { Form, Input, Button, Checkbox, Col, Row, Card, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";



const Login = () => {
  //global state
  const { showAlert, displayAlert } = useAppContext();
  //To store the data from frontend
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(null);
  const [diplayError, setdisplayError] = useState(false);
  const navigate = useNavigate();

  const[message, setMessage] = useState()
  // const [error, setError] = useState(false);
  //success message for db
  // const [success, setSuccess] = useState(false);

  //function to fetch the data from DB
  const submitData = async () => {
    const data = {
      username: username,
      password: password,
    };
    try {
      const res = await axios.post("https://cvwapkf3q6.execute-api.us-east-1.amazonaws.com/test/getUserLogin", data);
      console.log(res);

      if (res && res.data && res.data.statusCode && res.data.statusCode === 200) {
        // localStorage.setItem("authenticated", "true");
        setLoggedIn(true);
        setMessage(res.data.message)
        
        // navigate("/pricing");
        console.log("navigated")
      } else {
        console.log(res.data.message)
        setLoggedIn(false);
        setMessage(res.data.message)
      }
     
    } catch (err) {
      console.log(err);
      if (
        err.res &&
        err.res.data &&
        err.res.data.statusCode &&
        err.res.data.statusCode === false
      ) {
        setLoggedIn(false);
        
      }else {
        setLoggedIn(false);
      }
    }
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
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
      },1000)}
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
            

            {isLoggedIn === false ? <Button className="invalid">{message}</Button> : ""}
            {isLoggedIn === true ? <Button className="valid">{message}</Button> : ""}
            {showAlert && <Alert />}
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please enter username!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  value={username}
                  onChange={handleUsername}
                />
                {diplayError && username.length <= 0 ? (
                  <span style={{ color: "red", fontStyle: "italic" }}>
                    please enter username.
                    
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
                    message: "Please enter Password!",
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
                    please enter password.
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
            
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
