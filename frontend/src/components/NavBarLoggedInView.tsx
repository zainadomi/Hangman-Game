import React from 'react'
import { Button, Navbar } from 'react-bootstrap';
import { NavBarLoggedInViewProps } from './types';
import * as NotesApi from "../network/api";
import { Link } from 'react-router-dom';


const NavBarLoggedInView = ({user,onLoggedoutSuccessful}:NavBarLoggedInViewProps) => {
   
    async function logout(){
        try {
            await NotesApi.logout();
            onLoggedoutSuccessful()
            
            
        } catch (error) {
            alert(error)
            console.error(error)
            
        }
    }
    return ( 
        <>
        <Navbar.Text className="me-2" >
            Signed in as: {user.username}
        </Navbar.Text>
        <Link to={'/'}><Button className='btn btn-dark' onClick={logout}>Log out</Button>
        </Link>
        </>
     );
 }
  
 export default NavBarLoggedInView; 
