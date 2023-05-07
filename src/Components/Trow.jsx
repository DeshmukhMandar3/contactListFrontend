import { Button, Input, Td, Text, Tr } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import styles from "../css/ContactList.module.css";

const Trow = ({ contact }) => {
  const [name, setName] = React.useState(contact.name);
  const [email, setEmail] = React.useState(contact.email);
  const [phone, setPhone] = React.useState(contact.phone);
  const [edit, setEdit] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [hide, setHide] = React.useState(false);

  React.useEffect(() => {
    let token = localStorage.getItem("token");
    setToken(token);
  }, []);

  async function handleUpdate() {
    setEdit(!edit);
    try {
      let res = await axios.patch(
        `https://long-wetsuit-dove.cyclic.app/contact/update/${contact._id}`,
        { name, email, phone },
        { headers: { Authorization: token } }
      );
      alert("Contact updated successfully");
    } catch (err) {
      console.log(err);
      alert("Unable to update!");
    }
  }

  async function handleDelete() {
    try {
      let res = await axios.delete(
        `https://long-wetsuit-dove.cyclic.app/contact/delete/${contact._id}`,
        { headers: { Authorization: token } }
      );
      setHide(true);
      alert("Contact deleted successfully");
    } catch (err) {
      console.log(err);
      alert("Unable to delete contact!");
    }
  }
  return (
    <Tr display={hide ? "none" : "table-row"}>
      <Td>
        <Text display={edit ? "none" : "block"}>{name}</Text>{" "}
        <Input
          value={name}
          display={edit ? "block" : "none"}
          onChange={(e) => setName(e.target.value)}
        />
      </Td>
      <Td>
        <Text display={edit ? "none" : "block"}> {email}</Text>
        <Input
          value={email}
          display={edit ? "block" : "none"}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Td>
      <Td>
        <Text display={edit ? "none" : "block"}>{phone} </Text>
        <Input
          value={phone}
          display={edit ? "block" : "none"}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Td>
      <Td>
        <Button
          onClick={() => setEdit(!edit)}
          display={edit ? "none" : "block"}
          backgroundColor={"rgb(42, 222, 162)"}
        >
          Edit
        </Button>
        <Button
          display={edit ? "block" : "none"}
          onClick={handleUpdate}
          backgroundColor={"rgb(42, 222, 162)"}
        >
          Update
        </Button>
      </Td>
      <Td>
        <Button onClick={handleDelete} backgroundColor={"rgb(42, 222, 162)"}>
          Delete
        </Button>
      </Td>
    </Tr>
  );
};

export default Trow;
