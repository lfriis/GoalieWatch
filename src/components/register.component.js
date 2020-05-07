import React, { Component } from 'react';
import Axios from 'axios';

export default class Register extends Component
{
    constructor(props)
    {
        super(props);

        this.onChangeUsername   = this.onChangeUsername.bind(this);
        this.onChangeEmail      = this.onChangeEmail.bind(this);
        this.onChangePassword   = this.onChangePassword.bind(this);
        this.onSubmit           = this.onSubmit.bind(this);

        this.state = 
        {
            username: '',
            email: '',
            password: '',
        }
    }

    onChangeUsername (e)
    {
        this.setState
        ({
            username: e.target.value
        });
    }

    onChangeEmail (e)
    {
        this.setState
        ({
            email: e.target.value
        });
    }

    onChangePassword (e)
    {
        this.setState
        ({
            password: e.target.value
        });
    }

    onSubmit (e)
    {
        e.preventDefault();

        const user = 
        {
            username: this.state.username,
            email:    this.state.email,
            password: this.state.password
        }

        console.log(user);

        // Sending input data to the backend to use API to handle request
        Axios.post('http://localhost:8080/users/add', user)
            .then(res => console.log(res.data));
            //.catch(err => console.log("Unable to send username to bacnekend " + err));

        //Reset the fields
        this.setState
        ({
            username:'',
            email:'',
            password:''
        })
    }

    render()
    {
        return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                <input type="text"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                />
                <label>Email: </label>
                <input type="email"
                    required
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                />
                <label>Password: </label>
                <input type="password"
                    required
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                />
              </div>       
            <div className="form-group">
                <input type="submit" value="Create User" className="btn btn-primary"/>
            </div>
            </form>
        </div>
        )
    }
}