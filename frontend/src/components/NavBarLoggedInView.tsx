import React from 'react'
import { Navbar } from 'react-bootstrap';
import { NavBarLoggedInViewProps } from './types';
import * as GameApi from "../network/api";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';




const NavBarLoggedInView = ({user,onLoggedoutSuccessful}:NavBarLoggedInViewProps) => {

    async function logout(){
        try {
            await GameApi.logout();
            onLoggedoutSuccessful()
            
            
        } catch (error) {
            alert(error)
            console.error(error)
            
        }
    }
    return ( 
        <>
        <Navbar.Text className="me-3" style={{color:'white'}}>
          Signed in as: {user.username} 
        </Navbar.Text>
        <Link to='/'>
                <Button variant="text" style={{ color: 'white',textTransform: 'none'}} onClick={logout}>Log out</Button>

        </Link>
        </>
     );
 }
  
 export default NavBarLoggedInView; 
