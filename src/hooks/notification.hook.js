import React, { 
    useState, 
    useEffect
} from 'react';
import Axios from 'axios';
import { MultiSelect } from '@progress/kendo-react-dropdowns';

function Notification (props) {

    const [email, setEmail] = useState('');
    const [goalieName, setGoalieName] = useState('');
    const [reminder, setReminder] = useState('');
    const [goalies, setGoalies] = useState('');


    //https://stackoverflow.com/questions/53824116/react-hooks-usestate-array
    const data = {
        email,
        goalieName,
        reminder
    }

    const getGoalies = (e) => {

        Axios.get('http://localhost:8080/goalies/')
        .then(res => {
            console.log(res);

            if (res.data.length > 0) {  
                setGoalies(res.data);
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    const HandleSubmit = (e) => {
        e.preventDefault();

        Axios.post('http://localhost:8080/goalieRequest/add/', data)
            .then((res) => {
                console.log(res);
            }).catch((e) => {
                console.log(e);
            });
    }

    useEffect(() => {
        getGoalies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    return (
        <div className="form-group">
            <h3>Setup your custom notification</h3>
            <form onSubmit={HandleSubmit}>
            <div className="form-group"> 
                <label>Email: </label>
                <input type="email"
                    required
                    className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
            </div>
            <div className="form-group"> 
                <label>Select Goalies: </label>
                <div>
                    <MultiSelect
                        data={goalies.map(function(goalie) {  
                                return goalie.goalie_name;                                
                            })
                        }
                        filterable={true}
                        // onFilterChange={this.onFilterChange}
                        onChange={e => setGoalieName(e.target.value)}
                        required
                    />
                </div>
                <br/>
            </div>
            <div className="form-group"> 
                <label>Reminder (in minutes): </label>
                <input type="number"
                    required
                    className="form-control"
                    value={reminder}
                    onChange={e => setReminder(e.target.value)}
                    />
            </div>

            <div className="form-group">
                <input type="submit" value="Create Notifcation" className="btn btn-primary" />
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

export default Notification;