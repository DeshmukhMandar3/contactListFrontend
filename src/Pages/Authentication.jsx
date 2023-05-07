import React from "react";
import styles from "../css/Authentication.module.css";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  //form toggle state;
  const [toggle, setToggle] = React.useState(false);
  //form state;
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  //loader state;
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  //register request
  const handleRegister = async (e) => {
    e.preventDefault();
    if (name.length != 0 && email.length != 0 && password.length != 0) {
      setLoading(true);
      try {
        let res = await axios.post(
          "https://long-wetsuit-dove.cyclic.app/user/register",
          { name, email, password }
        );
        setLoading(false);
        alert("User Registered Successfully");
        setName("");
        setEmail("");
        setPassword("");
      } catch (err) {
        setLoading(false);
        if (err.response.status == 406) {
          alert("User Already Exist, Kindly Login");
        }
      }
    } else {
      alert("Kindly fill all fields");
    }
  };

  //Login request
  const handleLogin = async (e) => {
    e.preventDefault();
    if (email.length != 0 && password.length != 0) {
      setLoading(true);
      try {
        let res = await axios.post(
          "https://long-wetsuit-dove.cyclic.app/user/login",
          { email, password }
        );
        if (res.data && res.data.token) {
          setLoading(false);
          alert("Login Successful!");
          //token stored to local storage
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("id", res.data.id);
          navigate("/contact");
        }
      } catch (err) {
        setLoading(false);
        if (err.response.status == 406) {
          alert("Wrong Email-id or Password");
        }
        console.log(err);
      }
    } else {
      alert("Kindly fill all fields");
    }
  };

  //Redirecting to Contact if details are present in local storage
  React.useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/contact");
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* Buttons to toggle login and register form */}
      <Flex className={styles.button_wrapper}>
        <Button
          onClick={() => setToggle(!toggle)}
          bgColor={
            toggle ? "rgba(17, 48, 116, 0.66)" : "rgba(17, 48, 116, 0.1)"
          }
        >
          Register
        </Button>
        <Button
          onClick={() => setToggle(!toggle)}
          bgColor={
            toggle ? "rgba(17, 48, 116, 0.1)" : "rgba(17, 48, 116, 0.66)"
          }
        >
          Login
        </Button>
      </Flex>

      {/* Register Form */}
      <form
        className={styles.register_form}
        style={{ display: toggle ? "block" : "none" }}
      >
        <Input
          placeholder="Enter Name Here.."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Enter Email Here..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Enter Password Here.."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <Input type="submit" value="Register" /> */}
        <Button
          onClick={handleRegister}
          isLoading={loading}
          backgroundColor={"rgba(17, 48, 116, 0.9)"}
        >
          Register
        </Button>
      </form>

      {/* Login Form */}
      <form
        className={styles.login_form}
        style={{ display: toggle ? "none" : "block" }}
      >
        <Input
          placeholder="Enter Email Here..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Enter Password Here.."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <Input type="submit" value="Login"  /> */}
        <Button
          onClick={handleLogin}
          isLoading={loading}
          backgroundColor={"rgba(17, 48, 116, 0.9)"}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Authentication;
