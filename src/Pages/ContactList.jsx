import { Flex, Table, Tbody, Th, Thead, Tr, Spinner } from "@chakra-ui/react";
import React from "react";
import styles from "../css/ContactList.module.css";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import Trow from "../Components/Trow";
import axios from "axios";
import AddContact from "../Components/AddContact";

const ContactList = () => {
  const navigate = useNavigate();
  //state for all contacts;
  const [contacts, setContacts] = React.useState([]);
  //loader state
  const [loading, setLoadingMain] = React.useState(false);

  React.useEffect(() => {
    //id and token fetching from local storage
    let id = localStorage.getItem("id");
    let token = localStorage.getItem("token");
    //if token doesn't exist then navigate to authentication
    if (!token) {
      navigate("/");
    } else {
      getData(token, id);
    }
  }, []);

  // get all contacts created by perticular user
  async function getData(token, id) {
    setLoadingMain(true);
    try {
      let res = await axios.get(
        `https://long-wetsuit-dove.cyclic.app/contact/get/${id}`,
        { headers: { Authorization: token } }
      );
      if (res.data) {
        setContacts(res.data);
      }
      setLoadingMain(false);
    } catch (err) {
      console.log(err);
      setLoadingMain(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <Navbar />
      {/* Add new contact modal */}
      <Flex justifyContent={"right"} padding="10px 5px">
        <AddContact getData={getData} setLoadingMain={setLoadingMain} />
      </Flex>
      {loading ? (
        <Spinner
          thickness="5px"
          speed="0.5s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          marginTop="30vh"
        />
      ) : (
        <Table variant="simple" margin={"auto"} width={"97%"} size="lg">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          {/* Trow is component for row  */}
          <Tbody>
            {contacts.map((el) => {
              return <Trow contact={el} key={el._id} />;
            })}
          </Tbody>
        </Table>
      )}
    </div>
  );
};

export default ContactList;
