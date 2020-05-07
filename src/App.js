import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Included components
import Navbar                   from "./components/navbar.component";
import CreateGoalieNotification from "./components/create-goalie-notification.component";
import Register                 from "./components/register.component";
import Login                    from "./components/login.component";
import EmailDevs                from "./components/email-devs.component";

function App() 
{
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact    component={CreateGoalieNotification} />
        <Route path="/register"  component={Register} />
        <Route path="/login"     component={Login} />
        <Route path="/emaildevs" component={EmailDevs} />
        </div>
    </Router>
  );
}

export default App;