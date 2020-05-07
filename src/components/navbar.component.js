import React, { Component } from 'react';
import logo from './hockey.png';
//import { Link } from 'react-router-dom';

export default class Navbar extends Component 
{    
    render () 
    {
        return (
            // <Navbar bg="dark" variant="dark">
            //     <Navbar.Brand href="#home">
            //     <img
            //         alt=""
            //         src="/logo.svg"
            //         width="30"
            //         height="30"
            //         className="d-inline-block align-top"
            //     />{' '}
            //     React Bootstrap
            //     </Navbar.Brand>
            // </Navbar>

            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">                    
                    <a className="navbar-brand" href="/">
                        <img src={logo} height="40" width="40" alt="GoalieWatch" className="d-inline-block align-top"/>
                    </a><a className="navbar-brand" href="/">GoalieWatch</a>

                    <div>
                        <ul className="nav navbar-nav navbar right">
                            <a className="nav-link" href="/emaildevs"><i className="fa fa-envelope mr-1"></i></a>
                        </ul>
                    </div>
            </nav>

            // <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
           
            // <div className="mx-auto order-0">
            //     <a className="navbar-brand mx-auto" href="/">GoalieWatch</a>
            //     <button className="navbar-toggler" type="button" data-target=".dual-collapse2">
            //         <span className="navbar-toggler-icon"></span>
            //     </button>
            // </div>
            // <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
            //     <ul className="navbar-nav ml-auto">
            //         <li>
            //         <a className="nav-link" href="/login"><i className="fa fa-user-o"></i> Edit Request</a>
            //         </li> 
            //     </ul>
            // </div>
            // </nav>
        );
    }
}