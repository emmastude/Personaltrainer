import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';


function Customers() {
    const [customers, setCustomers] = useState([]); // state johon tullaan tallentamaan kaikki asiakkaat
    const [open, setOpen] = useState(false); 
    //asetetaan toastin arvo falseksi, jotta se ei ole heti näkyvissä
    const [msg, setMsg] = useState('');
    
    useEffect(() => {
        fetchCustomers(); // saadaan haettua ja näytettyä tiedot heti
    },[]);

    const fetchCustomers = () => {
        fetch(process.env.REACT_APP_CUSTOMERS)
        .then(response => response.json()) //vastaus tulee theniin parametrinä
        .then(data => setCustomers(data.content)) //data parsittuna tänne theniin
    }
    //Tämä funktio tehdään, jotta asiakkaat voidaan hakea uudestaankin bäkkäristä

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) { //tähän voi lisätä materialdesignistä myös hienomman poistoikkunan
        fetch(link, { method: 'DELETE' })
        .then(response =>{
            if (response.ok) {
                //ok
                setMsg('Customer deleted');
                setOpen(true);
                fetchCustomers();
            }
            else {
                alert('Something went wrong');
            }
        })
        
    }
    }
    //toisen parametriin pystyy määtrittelemään esim millanen header lisätään yms
    //määritellään metodiksi delete, jotta asiakas saadaan poistettua

    const addCustomer = (customer) => {
        fetch(process.env.REACT_APP_CUSTOMERS,{
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok) {
            //ok 
            fetchCustomers();
            }
            else {
                alert('Something went wrong');
            }
        })
        .catch(err => console.error(err))
        }

        const updateCustomer = (updatedCustomer, link) => {
            fetch(link, {
                method: 'PUT', 
                headers:  {'Content-type' : 'application/json'},
                body: JSON.stringify(updatedCustomer)
            })
            .then(response => {
                if (response.ok) {
                    setMsg('Customer edited successfully')
                    setOpen(true);
                    fetchCustomers();
                }
                else{
                    alert('Something went wrong when updating car')
                }
            })
            .catch(err => console.error(err))
        }
    
 
    const columns  = [
        {field: 'firstname', sortable: true, filter: true}, 
        {field: 'lastname', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {
            headerName: '',
            width: 100,
            field: 'links.1.href',
            cellRenderer: params => <Editcustomer updateCustomer={updateCustomer} params={params} />
        },
        {
            headerName: '', 
            width: 100,
            field: 'links.1.href',
            cellRenderer: params =>
             <IconButton color="error" onClick={() => deleteCustomer(params.value)}>
                <DeleteIcon />
                 </IconButton>
            //cellrenderer määrittelee mitä soluun renderöidään
            //params -olio auttaa deletetCustomer -funktiota löytämään juuri kyseisen auton
        }
        
    ]
    
    
    return(
        <>
        <Addcustomer addCustomer={addCustomer} />
        <div className="ag-theme-alpine-dark" style={{height: 800, width: '100%'}}>
            <AgGridReact
            columnDefs={columns}
            rowData={customers} //kerrotaan mistä data tulee
            pagination={true} //sivutus kytketään päälle
            paginationPageSize={10} //määritellään monta asiakasta per sivu 
            suppressCellFocus={true} //päästään eroon sinireunaisesta focusoinnista


    

        />
        
         </div>
         <Snackbar 
         open = {open}
         message={msg}
         autoHideDuration={2000}
         onClose={() => setOpen(false)}
         //autoHideDuration kertoo kauan viesti on näkyvissä
         //2000 tarkoittaa 2s
         />
         </>
    )
}

export default Customers;