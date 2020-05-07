import React, { Component } from 'react';
import Axios from 'axios';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
// import { filterBy } from '@progress/kendo-data-query';

export default class CreateGoalieNotification extends Component
{
    constructor(props)
    {
        super(props);

        this.onChangeEmail      = this.onChangeEmail.bind(this);
        this.onChangeGoalieName = this.onChangeGoalieName.bind(this);
        this.onChangeReminder   = this.onChangeReminder.bind(this);
        this.onSubmit           = this.onSubmit.bind(this);

        this.state = 
        {
            email: '',
            goalie_name: '',
            team_name: '',
            reminder: '',
            goalies: [],
            teams: [],
        }
    }

    onChangeEmail (e)
    {
        this.setState
        ({
            email: e.target.value
        });
    }

    onChangeGoalieName (e)
    {
        this.setState
        ({
            goalie_name: e.target.value
        });
    }

    onChangeReminder (e)
    {
        this.setState
        ({
            reminder: e.target.value
        });
    }

    // onFilterChange (e)
    // {
    //     Axios.get('http://localhost:8080/goalies/')
    //     .then(response => {

    //         console.log(response);

    //         if (response.data.length > 0) 
    //         {
    //             this.setState ({
    //                 teams: response.data.map(goalie => goalie.team_name),
    //                 data:  filterBy(response.data[0].team_name.slice())
    //             })
    //         }
    //     })
    // }

    componentDidMount()
    {
        Axios.get('http://localhost:8080/goalies/')
        .then(response => {

            console.log(response.data.length + "\n");
            console.log(response);

            if (response.data.length > 0) 
            {
                this.setState ({
                    goalies: response.data.map(goalie => goalie.goalie_name),
                    goalie_name: response.data[0].goalie_name,
                })
            }
            else return "Unable to pull list of goalies";
        })
    }

    onSubmit (e)
    {
        e.preventDefault();

        const goalieRequest = 
        {
            email:       this.state.email,
            goalie_name: this.state.goalie_name,
            reminder:    this.state.reminder
        }

        console.log(goalieRequest);

        // Nav to add another request on submit
        Axios.post('http://localhost:8080/goalieRequest/add/', goalieRequest);
    }

    render()
    {
        return (
            <div>
            <h3>Setup your custom notification</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
                <label>Email: </label>
                <input type="email"
                    required
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    />
            </div>
            <div className="form-group"> 
                <label>Select Goalies: </label>
                <div>
                    <MultiSelect
                        data={this.state.goalies.map(function(goalie_name) {   
                                return goalie_name;                                
                            })}
                        required
                        filterable={true}
                        // onFilterChange={this.onFilterChange}
                        onChange={this.onChangeGoalieName}
                        value={this.state.value}
                    />
                </div>
                <br/>
            </div>
            <div className="form-group"> 
                <label>Reminder (in minutes): </label>
                <input type="number"
                    required
                    className="form-control"
                    value={this.state.reminder}
                    onChange={this.onChangeReminder}
                    />
            </div>

            {/* <img src={"https://content.sportslogos.net/logos/1/1736/full/1651_anaheim_ducks-primary-2014.gif"} alt="team"/> */}

            <div className="form-group">
                <input type="submit" value="Submit Notifcation" className="btn btn-primary" />
            </div>

            <div className="form-group">
                <ul className="navbar-nav ml-auto">
                    <li>
                    <a className="nav-link" href="/login">Already setup a notifcation? Login to update</a>
                    </li> 
                </ul>
            </div>
            
            </form>
          </div>
        )
    }
}