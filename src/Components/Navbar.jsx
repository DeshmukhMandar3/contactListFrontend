import React from "react";
import { Flex, Image, Box, Text, Button } from "@chakra-ui/react";
import styles from "../css/ContactList.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  let navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    let token = localStorage.getItem("token");
    let id = localStorage.getItem("id");
    if (!token) {
      navigate("/");
    } else {
      async function getUser() {
        try {
          let res = await axios.get(
            `https://long-wetsuit-dove.cyclic.app/user/get/${id}`,
            { headers: { Authorization: token } }
          );
          if (res.data) {
            setName(res.data.name);
            setEmail(res.data.email);
          }
        } catch (err) {
          console.log(err);
        }
      }
      getUser();
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Flex className={styles.navbar}>
      <Flex>
        <Image
          src="https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg"
          className={styles.profile}
        />
        <Box textAlign={"left"}>
          <Text>{name}</Text>
          <Text>{email}</Text>
        </Box>
      </Flex>
      <Button onClick={handleLogout}>
        <FiLogOut />
        &nbsp; Logout
      </Button>
    </Flex>
  );
};

export default Navbar;
