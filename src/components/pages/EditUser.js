import { styled } from "@mui/material/styles";
import { Box, Button, Grid, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useState, useEffect } from "react";
import { updateUser } from "../../store/action-creators/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";

const CustomerTextField = styled(TextField)`
  width: 100%;
  margin-top: 20px;
`;

const EditUser = () => {
  const dispatch = useDispatch();
  const negtive = useNavigate();

  const [valueInput, setValueInput] = useState({
    name: "",
    content: "",
    address: "",
    email: "",
  });

  const { loading, users, error } = useSelector((state) => state.users);
  const { id } = useParams();
  const objectUsers = _.mapKeys(users, "id");
  const objecSingleUser = objectUsers[id];

  const { name, content, address, email } = valueInput;

  const handelinputChange = (e) => {
    const { name, value } = e.target;
    setValueInput({ ...valueInput, [name]: value });
  };

  useEffect(() => {
    setValueInput({
      name: objecSingleUser["name"],
      content: objecSingleUser["content"],
      address: objecSingleUser["address"],
      email: objecSingleUser["email"],
    });
  }, []);

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (!name || !content || !email || !address) {
      return (
        <>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            All fields must be filled
            <strong>check it out!</strong>
          </Alert>
        </>
      );
    } else {
      dispatch(updateUser(id, valueInput));
      negtive("/");
      toast.warn("Your User Updated");
    }
  };

  return (
    <div>
      <Grid container direction="column">
        <h3 style={{ margin: "10px auto" }}>Edit User Page</h3>
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
          defaultValue={objecSingleUser["name"]}
          onChange={handelinputChange}
        />
        <CustomerTextField
          name="email"
          label="Email"
          variant="standard"
          defaultValue={objecSingleUser["email"]}
          onChange={handelinputChange}
        />
        <CustomerTextField
          name="content"
          label="Contect"
          variant="standard"
          defaultValue={objecSingleUser["content"]}
          onChange={handelinputChange}
        />
        <CustomerTextField
          name="address"
          label="Address"
          variant="standard"
          defaultValue={objecSingleUser["address"]}
          onChange={handelinputChange}
        />
        <Button
          style={{ margin: "50px 0" }}
          variant="contained"
          color="success"
          endIcon={<SendIcon />}
          type="submit"
        >
          update user
        </Button>
      </Box>
    </div>
  );
};

export default EditUser;
