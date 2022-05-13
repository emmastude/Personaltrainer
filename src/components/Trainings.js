import React, { useState, useEffect }   from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';

import Addtraining from './Addtraining';
import Edittraining from './Edittraining';

import 'ag-grid-community/dist/styles/ag-grid.css'; 
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';


function Trainings () {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');



    useEffect (() => {
        fetchTrainings();
        
    }, []);

    const fetchTrainings = () => {
        fetch(process.env.REACT_APP_TRAININGS)
        .then(response => response.json())
        .then(data => setTrainings(data.content))

    }

    const deleteTraining = (link) => {
    if (window.confirm('Are you sure?')) {
      fetch(link, {method: 'DELETE' })
      .then(response => {
          if (response.ok) {
              setMsg('Training deleted');
              setOpen(true);
              fetchTrainings();
              //ok
          }
          else {
              alert('Something went wrong');
          }
      })
    }
    }
    const addTraining = (training) => {
    fetch(process.env.REACT_APP_TRAININGS, {
        method: 'POST', 
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify(training)
    })
    .then(response => {
        if (response.ok) {
        //ok 
        fetchTrainings();
        }
        else {
            alert('Something went wrong');
        }
    })
    .catch(err => console.error(err))
    }

    const updateTraining = (updateTraining, link) => {
        fetch(link, {
            method: 'PUT', //bäkkäri tietää että kyseessä on päivitys
            headers: {'Content-type' : 'application/JSON'},
            body: JSON.stringify(updateTraining)
        })
        .then(response => {
            if (response.ok) {
                setMsg('Training updated succesfully')
                setOpen(true);
                fetchTrainings();
            }
            else {
                alert('Something went wrong when updating training');
            }
        })
        .catch(err => console.error(err))

    }

    const columns = [
        {field: 'date', sortable: true, filter: true},
        {field: 'duration', sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true},
        {
            headerName: '',
            width: 100,
            field: 'links.0.href',
            cellRenderer: params => <Edittraining updateTraining={updateTraining} params={params}/>
        },
        {
            headerName: '',
            width: 100,
            field: 'links.0.href',
            cellRenderer: params => 
            <IconButton color="error" onClick={() => deleteTraining(params.value)}>
                <DeleteIcon />
            </IconButton>
        }
    ]

    return (
        <>
        <Addtraining addTraining={addTraining} />
         <div className="ag-theme-alpine-dark" style={{height: 700, width: '100%'}}>
        <AgGridReact
        columnDefs={columns}
        rowData={trainings} 
        pagination={true}
        paginationPageSize={10} 
        suppressCellFocus={true}

        />
        </div>
        <Snackbar
         open = {open}
         message={msg}
         autoHideDuration={2000}
         onClose={() => setOpen(false)}
        />
        </>
    )
}

export default Trainings;