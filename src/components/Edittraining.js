import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

function Edittraining ({ updateTraining, params }) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '',
        duration: '',
        activity: ''
    })

  const handleClickOpen = () => {
    setOpen(true);
    setTraining ({
      date: params.data.date,
      duration: params.data.duration,
      activity: params.data.activity
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    updateTraining(training, params.value);
  }

  const inputChanged = (event) => {
      setTraining({...training, [event.target.name]: event.target.value})


  }


  return (
    <div>
      <IconButton  onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Training</DialogTitle>
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

export default Edittraining;