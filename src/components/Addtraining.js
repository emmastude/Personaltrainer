import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function Addtraining ({ addTraining }) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '',
        duration: '',
        activity: ''
    })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    addTraining(training);
    setOpen(false);
  };

  const inputChanged = (event) => {
      setTraining({...training, [event.target.name]: event.target.value})


  }


  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Training</DialogTitle>
        <DialogContent>
          <TextField
            name = "date"
            value={training.date}
            onChange={inputChanged}
            margin="dense"
            label="date"
            fullWidth
            variant="standard"
          />
            <TextField
            name = "duration"
            value={training.duration}
            onChange={inputChanged}
            margin="dense"
            label="duration"
            fullWidth
            variant="standard"
          />
            <TextField
            name = "activity"
            value={training.activity}
            onChange={inputChanged}
            margin="dense"
            label="activity"
            fullWidth
            variant="standard"
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Addtraining;
