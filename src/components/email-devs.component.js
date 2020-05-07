import React, { Component } from 'react';
import Axios from 'axios';
import { DropDownList } from '@progress/kendo-react-dropdowns';

export default class EmailDevs extends Component
{
    constructor(props)
    {
        super(props);

        this.onChangeEmail      = this.onChangeEmail.bind(this);
        this.onChangeSubject    = this.onChangeSubject.bind(this);
        this.onChangeBody       = this.onChangeBody.bind(this);
        this.onSubmit           = this.onSubmit.bind(this);

        this.state = 
        {
            email: '',
            subject: '',
            body: '',
        }
    }

    listAreas = [ "Submitting a notification", "Editing an existing notification", "Never recieved email notification",
                  "My fantasy goalie isn't listed", "Other"];

    onChangeEmail (e)
    {
        this.setState
        ({
            email: e.target.value
        });
    }

    onChangeSubject (e)
    {
        this.setState
        ({
            subject: e.target.value
        });
    }

    onChangeBody (e)
    {
        this.setState
        ({
            body: e.target.value
        });
    }

    onSubmit (e)
    {
        e.preventDefault();

        const sentEmail = 
        {
            email:    this.state.email,
            subject:  this.state.subject,
            body:     this.state.body
        }

        console.log(sentEmail);

        // Sending input data to the backend to use API to handle request
        Axios.post('http://localhost:8080/emailDevs/add', sentEmail)
            .then(res => console.log(res.data));
            //.catch(err => console.log("Unable to send username to bacnekend " + err));

        //Reset the fields
        this.setState
        ({
            email:'',
            subject: '',
            body: ''
        })
    }

    render()
    {
        return (
        <div>
            <h3>Send devs issues</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Email: </label>
                <input type="email"
                    required
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                />
                <br/>
                <label>Select an area you were facing an issue: </label>
                <div>
                    <DropDownList
                        required
                        data={this.listAreas}
                        onChange={this.onChangeSubject}
                        value={this.state.subject}
                    /> 
                </div>
                <br/>
                <label>Describe the issue in more detail: </label>
                <textarea type="text"
                    required
                    rows="5"
                    className="form-control"
                    value={this.state.body}
                    onChange={this.onChangeBody}
                />
              </div>       
            <div className="form-group">
                <input type="submit" value="Create Ticket" className="btn btn-primary"/>
            </div>
            </form>
        </div>
        )
    }
}