//importing matrial ui
import * as React from "react";
import { makeStyles, styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import VisibilityIcon from "@mui/icons-material/Visibility";

//importing redux
import { useDispatch, useSelector } from "react-redux";
import {
  getToUsers,
  deleteUser,
} from "../../store/action-creators/actionCreators";

//importing router dom
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

//importing components
import Loading from "../Loading/Loading";
import { Grid, Icon } from "@mui/material";

//config matrial ui
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, users, error } = useSelector((state) => state.users);

  React.useEffect(() => {
    dispatch(getToUsers());
  }, []);

  const handlDelete = (id) => {
    dispatch(deleteUser(id));

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return (
        <>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
            <strong>check it out!</strong>
          </Alert>
        </>
      );
    }

    toast.error("Your User Select Is Deleted!!!");
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
          <strong>check it out!</strong>
        </Alert>
      </>
    );
  }

  return (
    <div>
      <Grid
        style={{ margin: "50px 0" }}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Button
          variant="contained"
          onClick={() => navigate("/addUser")}
          color="primary"
        >
          Add New User
        </Button>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Content</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {user.name}
                </StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                <StyledTableCell align="center">{user.content}</StyledTableCell>
                <StyledTableCell align="center">{user.address}</StyledTableCell>
                <StyledTableCell align="center">
                  {/* icon button edit user */}
                  <Tooltip title="Edit User" placement="top-start">
                    <IconButton
                      aria-label="edit"
                      onClick={() => navigate(`/editUser/${user.id}`)}
                    >
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>

                  {/* icon button Delete user */}
                  <Tooltip title="Delete User" placement="top-start">
                    <IconButton
                      onClick={() => handlDelete(user.id)}
                      aria-label="delete"
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
