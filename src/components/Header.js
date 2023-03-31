import React from "react";
import {AppBar, Toolbar} from '@mui/material';
import logo from '../assets/logo.svg';

const Header = () => {
    return (
        <AppBar className="header" position="sticky">
            <Toolbar variant="dense" className="logo" >
            <img className="logo" src={logo} alt="Idea Theorem Logo"/>
            </Toolbar>
        </AppBar>
    )
}

export default Header;