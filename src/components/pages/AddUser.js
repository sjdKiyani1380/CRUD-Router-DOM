import { styled } from "@mui/material/styles";
import { Box, Button, Grid, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";
import { addUser } from "../../store/action-creators/actionCreators";
import { useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CustomerTextField = styled(TextField)`
  width: 100%;
  margin-top: 20px;
`;

const AddUser = () => {
  const [valueInput, setValueInput] = useState({
    name: "",
    content: "",
    address: "",
    email: "",
  });

  const dispatch = useDispatch();
  const negtive = useNavigate();
  const { name, content, address, email } = valueInput;

  const handelinputChange = (e) => {
    const { name, value } = e.target;
    setValueInput({ ...valueInput, [name]: value });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (!name || !content || !email || !address) {
      return (
        <>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Please fill in all the fields
            <strong>check it out!</strong>
          </Alert>
        </>
      );
    } else {
      dispatch(addUser(valueInput));
      negtive("/");
      toast.success("Your User Adding");
    }
  };

  return (
    <div>
      <Grid container direction="column">
        <h3 style={{ margin: "10px auto" }}>Add User Page</h3>
        <Button
          style={{ margin: "20px auto" }}
          variant="contained"
          color="error"
          onClick={() => negtive("/")}
        >
          Go Back
        </Button>
      </Grid>
      <Box
        mt="100"
        height="100%"
        alignItems="cetner"
        flexDirection="column"
        component="form"
        width="25%"
        display="flex"
        justifyContent="center"
        mx="auto"
        onSubmit={onSubmitForm}
      >
        <CustomerTextField
          name="name"
          label="Name"
          variant="standard"
          defaultValue={name}
          onChange={handelinputChange}
        />
        <CustomerTextField
          name="email"
          label="Email"
          variant="standard"
          defaultValue={email}
          onChange={handelinputChange}
        />
        <CustomerTextField
          name="content"
          label="Contect"
          variant="standard"
          defaultValue={content}
          onChange={handelinputChange}
        />
        <CustomerTextField
          name="address"
          label="Address"
          variant="standard"
          defaultValue={address}
          onChange={handelinputChange}
        />
        <Button
          style={{ margin: "50px 0" }}
          variant="contained"
          color="success"
          endIcon={<SendIcon />}
          type="submit"
        >
          add user
        </Button>
      </Box>
    </div>
  );
};

export default AddUser;
