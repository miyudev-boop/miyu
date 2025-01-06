import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Home Page
const Home: React.FC = () => (
  <div>
    <h1>Welcome to the App</h1>
    <p>This is the homepage of your application.</p>
    <nav>
      <ul>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  </div>
);

// About Page
const About: React.FC = () => (
  <div>
    <h1>About Us</h1>
    <p>This application was built to demonstrate best practices in modern development.</p>
  </div>
);

// Dashboard Main Page
const Dashboard: React.FC = () => (
  <div>
    <h1>Dashboard</h1>
    <nav>
      <ul>
        <li><Link to="/dashboard/analytics">Analytics</Link></li>
        <li><Link to="/dashboard/settings">Settings</Link></li>
      </ul>
    </nav>
  </div>
);

// Dashboard Analytics Page
const Analytics: React.FC = () => (
  <div>
    <h1>Analytics</h1>
    <p>View detailed analytics about your app here.</p>
  </div>
);

// Dashboard Settings Page
const Settings: React.FC = () => (
  <div>
    <h1>Settings</h1>
    <p>Update your preferences here.</p>
  </div>
);

// Login Page
const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', { username, password });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

// 404 Page
const NotFound: React.FC = () => (
  <div>
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <Link to="/">Go back to Home</Link>
  </div>
);

// Main App Component
const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/dashboard/analytics" component={Analytics} />
      <Route path="/dashboard/settings" component={Settings} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;

