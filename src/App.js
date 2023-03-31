import React, {useState} from 'react'
import './styles/App.scss';
import Header from './components/Header';
import SuccessImg from './assets/success.svg';
import { Container, TextField, FormControl, FormLabel, Button} from '@mui/material';
import axios from 'axios';

function App() {

  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [fullNameError, setFullNameError] = useState(false);
  const [contactNumberError, setContactNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [fullNameErrorText, setFullNameErrorText] = useState('');
  const [contactNumberErrorText, setContactNumberErrorText] = useState('');
  const [emailErrorText, setEmailErrorText] = useState('');
  const [dobErrorText, setDobErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState('');

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [responseStatus, setResponseStatus] = useState('')

  const format = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  const contactNumberFormat = /^(\(\+[0-9]{2}\))?([0-9]{3}-?)?([0-9]{3})\-?([0-9]{4})(\/[0-9]{4})?$/;
  const emailFormat= /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const dateOfBirthFormat = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
  const passwordFormat = /[0-9a-zA-Z]{8,}/;
  
 

  const handleName = (e) => {
    const val = e.target.value.trim();
      
    if(format.test(val)){
      setFullNameError(true);
      setFullNameErrorText('Sorry, this full name is invalid. Please try again.');
    } else {
      setFullNameError(false);
    }

    setFullName(e.target.value);
  }

  const handleContactNumber = (e) => {
    const val = e.target.value.trim();
      
    if(contactNumberFormat.test(val)){
      setContactNumberError(true);
      setContactNumberErrorText('Sorry, this contact number is invalid. Please try again.');
    } else {
      setContactNumberError(false);
    }

    setContactNumber(e.target.value);
  }

  const handleEmail = (e) => {
    const val = e.target.value.trim();
    
      
    if(emailFormat.test(val)){
      setEmailError(false);
    } else {
      setEmailError(true);
      setEmailErrorText('Sorry, this email address is invalid. Please try again.');
    }

    setEmail(e.target.value);
  }

  const handleDob= (e) => {
    const val = e.target.value;
      
    if(dateOfBirthFormat.test(val)){
      setDobError(false);
    } else {
      setDobError(true);
      setDobErrorText('Sorry, this date of birth is invalid. Please try again.');
    }

    setDob(e.target.value);
  }

  const handlePassword = (e) => {
    const val = e.target.value.trim();
      
    if(passwordFormat.test(val)){
      setPasswordError(false);
    } else {
      setPasswordError(true);
      setPasswordErrorText('Sorry, this password is invalid. Please try again.');
    }

    setPassword(e.target.value);
  }

  const handleConfirmPassword = (e) => {
    const val = e.target.value.trim();
      
    if(val == password){
      setConfirmPasswordError(false);
    } else {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorText('Sorry, confirm password doesn\'t match password. Please try again.');
    }

    setConfirmPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(fullName == "") {
      setFullNameError(true);
      setFullNameErrorText('Sorry, this full name is invalid. Please try again.');
  
    } else {
      setFullNameError(false);
    }

    if(contactNumber == ""){
      setContactNumberError(true);
      setContactNumberErrorText('Sorry, this contact number is invalid. Please try again.');
    } else {
      setContactNumberError(false);
    }

    if(email == "") {
      setEmailError(true);
      setEmailErrorText('Sorry, this email address is invalid. Please try again.');
    } else {
      setEmailError(false);
    }

    if(dob == ""){
      setDobError(true);
      setDobErrorText('Sorry, this date of birth is invalid. Please try again.');
    } else {
      setDobError(false);
    }

    if(password == ""){
      setPasswordError(true);
      setPasswordErrorText('Sorry, this password is invalid. Please try again.');
    } else {
      setPasswordError(false);
    }

    if(confirmPassword == ""){
      setConfirmPasswordError(true);
      setConfirmPasswordErrorText('Sorry, this password is invalid. Please try again.');
    } else {
      setConfirmPasswordError(false);
    }

    if(fullNameError || contactNumberError || emailError || dobError || passwordError || confirmPasswordError){
      return
    }
      
    

    const json = JSON.stringify({'full_name': fullName, 'contact_number': contactNumber, 'email': email, 'date_of_birth': dob, 'password': password})
    
    axios.post("https://fullstack-test-navy.vercel.app/api/users/create", json, 
    {headers: { "Content-Type": "application/json" }})
      .then(function (response) {
        //handle success
        setResponseStatus(response.status);
      })
      .catch(function (response) {
        //handle error
        setResponseStatus(response.status);
      });

      setFormSubmitted(true);
  }

  return (
    <div className="bg-offwhite">
      <Header/>

      <Container className="form-container">
      {formSubmitted && 
          <p className={`register-alert ${responseStatus == 200 ? "register-alert-success": "register-alert-error"}`}>
            {responseStatus == 200 ? 
              <><img src={SuccessImg}/> User account successfully created.</>
              : <>X There was an error creating the account.</>} 
          </p>
        }
        <h1 className="form-title">Create User Account</h1>
       
        <form onSubmit={handleSubmit}>
          <div className="form">
            <FormControl className="form-control">
              <FormLabel className="margin-10 form-label">Full Name</FormLabel>
              <TextField className="text-field" type="text" size="normal" placeholder="Full Name" helperText={fullNameError ? fullNameErrorText: ''} error={fullNameError} onChange={(e) => handleName(e)}></TextField>
            </FormControl>

            <FormControl className="form-control">
              <FormLabel className="margin-10 form-label">Contact Number</FormLabel>
              <TextField className="text-field" type="text" size="normal" placeholder="Contact Number" helperText={contactNumberError ? contactNumberErrorText: ''} error={contactNumberError} onChange={(e) => handleContactNumber(e)}></TextField>
            </FormControl>

            <FormControl className="form-control">
              <FormLabel className="margin-10 form-label">Email Address</FormLabel>
              <TextField className="text-field" type="text" size="normal" placeholder="Email Address" helperText={emailError ? emailErrorText: ''} error={emailError} onChange={(e) => handleEmail(e)}></TextField>
            </FormControl>


            <FormControl className="form-control">
              <FormLabel className="margin-10 form-label">Date of Birth</FormLabel>
              <TextField className="text-field" type="date" size="normal" placeholder="dd/mm/yyyy" helperText={dobError ? dobErrorText: ''} error={dobError} onChange={(e) => handleDob(e)}></TextField>
            </FormControl>
            
            <FormControl className="form-control">
              <FormLabel className="margin-10 form-label">Password</FormLabel>
              <TextField className="text-field" type="password" size="normal" placeholder="Create Password" helperText={passwordError ? passwordErrorText: ''} error={passwordError} onChange={(e) => handlePassword(e)}></TextField>
            </FormControl>

            <FormControl className="form-control">
              <FormLabel className="margin-10 form-label">Confirm Password</FormLabel>
              <TextField className="text-field" type="password" size="normal" placeholder="Confirm Password" helperText={confirmPasswordError ? confirmPasswordErrorText: ''} error={confirmPasswordError} onChange={(e) => handleConfirmPassword(e)}></TextField>
            </FormControl>
          </div>
         

          <div className="button-group">
            <Button sx={{textTransform: 'none'}} variant="outlined" className="btn cancel-btn">Cancel</Button>
            <Button sx={{textTransform: 'none'}} variant="filled" type="submit" className="btn submit-btn">Submit</Button>
          </div>

        </form>
      </Container>
    </div>
    
  );
}

export default App;
