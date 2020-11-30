import React, { 
    useState, 
    useEffect
} from 'react';
import Axios from 'axios';

function Issue (props) {

    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    const data = {
        email,
        subject,
        body
    }

    const HandleSubmit = (e) => {
        e.preventDefault();

        Axios.post('http://localhost:8080/emailDevs/add', data)
            .then((res) => {
                console.log(res);
            }).catch((e) => {
                console.log(e);
            });
    }

    return (
        <div>
            <h3>Send devs issues</h3>
            <form onSubmit={HandleSubmit}>
              <div className="form-group"> 
                <label>Email: </label>
                <input type="email"
                    required
                    className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label>Select an area you were facing an issue: </label>
                <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                >
                    <option default>Please Select...</option>
                    <option value="Submit notification">Submitting a notification</option>
                    <option value="Edit notification">Editing an existing notification</option>
                    <option value="Never recieved">Never recieved email notification</option>
                    <option value="Goalie listing">My fantasy goalie isn't listed</option>
                    <option value="Other">Other</option>
                </select>
                <label>Describe the issue in more detail: </label>
                <textarea type="text"
                    required
                    rows="5"
                    className="form-control"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                />
              </div>       
            <div className="form-group">
                <input type="submit" value="Create Ticket" className="btn btn-primary"/>
            </div>
            </form>
        </div>
    )
}

export default Issue;