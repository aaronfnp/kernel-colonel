import React, { Component } from 'react';
import { signUp } from '../../utilities/users-service';
import './SignUpForm.css';

class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: '',
  };

  handleChange = (evt) => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value,
      error: '',
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    const { name, email, password } = this.state;
    const formData = { name, email, password };
    try {
      console.log('Submitting form data:', formData);  
      const user = await signUp(formData);
      console.log('Sign up successful. User:', user);
      this.props.setUser(user);
    } catch (error) {  
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  };

  render() {
    const { password, confirm, error } = this.state;
    const disable = password !== confirm;

    return (
      <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} required autoComplete="name" />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} required autoComplete="email" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={this.handleChange} required autoComplete="new-password" />
            <label htmlFor="confirm">Confirm Password</label>
            <input type="password" id="confirm" name="confirm" value={confirm} onChange={this.handleChange} required autoComplete="new-password" />
            <button type="submit" disabled={disable}>SIGN UP</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{error}</p>
      </div>
    );
  }
}

export default SignUpForm;
