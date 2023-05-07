import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import styles from "../css/ContactList.module.css";
import axios from "axios";
import { IoCreate } from "react-icons/io5";

const AddContact = ({ getData, setLoadingMain }) => {
  //disclosure for opening and closing Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  //State management for form input
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  //state management for token and id
  const [token, setToken] = React.useState("");
  const [id, setId] = React.useState("");

  //state management for loader
  const [loading, setLoading] = React.useState(false);

  //function to make network request to add new contact
  const handleAdd = async () => {
    if (name.length != 0 && email.length != 0 && phone.length != 0) {
      setLoading(true);
      try {
        let res = await axios.post(
          `https://long-wetsuit-dove.cyclic.app/contact/add`,
          { name, email, phone },
          { headers: { Authorization: token } }
        );
        setLoading(false);
        alert("Contact added successfully");
        //function to close modal
        onClose();
        //state changed to original value;
        setEmail();
        setName();
        setPhone();
        //function to fetch data from server
        getData(token, id);
      } catch (err) {
        console.log(err);
        setLoading(false);
        alert("Error adding new contact");
      }
    } else {
      alert("Kindly fill all fields");
    }
  };

  React.useState(() => {
    let Token = localStorage.getItem("token");
    let id = localStorage.getItem("id");
    setId(id);
    setToken(Token);
  }, []);

  return (
    <>
      <Button onClick={onOpen} backgroundColor={"rgb(42, 222, 162)"}>
        {" "}
        <IoCreate /> &nbsp;Create New Contact
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form className={styles.addform}>
              <Input
                placeholder="Enter Name Here.."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Enter Email Here..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <Input
                placeholder="Enter Phone Here.."
                value={phone}
                type="number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={handleAdd}
              isLoading={loading}
              backgroundColor={"rgb(42, 222, 162)"}
            >
              Add Contact
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddContact;
