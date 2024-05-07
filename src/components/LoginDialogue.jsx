import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

export default function LoginDialog({open,setOpen}) {
  let navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const navigateToLoginPage = ()=>{
    navigate("/login");
  }

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Login Required.
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please login before adding any comments or reactions.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={navigateToLoginPage} autoFocus>
            Login
          </Button>
        </DialogActions>
      </Dialog>
  );
}
