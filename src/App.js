import React from 'react';
import './App.css';

import Customers from './components/Customers';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Trainings from './components/Trainings';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';



function App() {

  const [menu, setMenu] = React.useState(null);



  const darkTheme = createTheme({
    palette: {
    mode: 'dark',
    primary: {
    main: '#1976d2',
  },
  },
  });
  

  return (
    <div className="App">

    
        <ThemeProvider theme={darkTheme}>
         <AppBar 
         position='static' 
         color="primary" 
         enableColorOnDark>

        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant = "h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Book your workout!
          </Typography>
          </Toolbar>
         </AppBar>

         <Router>
      <Link to="/">Customers</Link>{' '}
      <Link to="/Trainings">Trainings</Link>{' '}
     
      <Routes>
      <Route path="/" element={<Customers />}/>
      <Route path="/Trainings"element={<Trainings />} />
  
      </Routes>
      </Router>
        </ThemeProvider>
    

      </div>
  
  );

}
export default App;
