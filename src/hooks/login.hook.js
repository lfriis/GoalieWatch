import React, { 
    useState, 
    useEffect
} from 'react';
import Axios from 'axios';

function Login (props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const data = {
        email,
        password
    }

    const HandleSubmit = (e) => {
        e.preventDefault();

        Axios.post('http://localhost:8080/users/add', data)
            .then((res) => {
                console.log(res);
            }).catch((e) => {
                console.log(e);
            });
    }

    return (
        <div>
            <h3>Login to edit existing request</h3>
            <form onSubmit={HandleSubmit}>
                <div className="form-group"> 
                    <label>Email: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label>Password: </label>
                    <input type="password"
                        required
                        className="form-control"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>       
                <div className="form-group">
                    <input type="submit" value="Login" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
}

export default Login;