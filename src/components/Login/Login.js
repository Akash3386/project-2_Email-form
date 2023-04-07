import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { cleanup } from '@testing-library/react';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state,action) => {
  if (action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.includes('@')}

  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@')}
  }
   return {value: '', isValid: false}
}

const passwordReducer = (state,action) => {
  if (action.type === 'USER_PASSWORD'){
    return {value: action.val, isValid: action.val}

  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value}
  }
  return {value: '',isValid:false}
}

const Login = (props) => {

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  // const [enteredCollegeName, setEnteredCollegeName] = useState('');
  // const [collegeNameIsValid, setCollegeNameIsValid] = useState();

  const [emailState,dispatchEmail] = useReducer(emailReducer,{
    value:'',
    isValid: null
  },)


  const [passwordState,dispatchPassword] = useReducer(passwordReducer,{
    value:'',
    isValid: null
  })

  const authCtx = useContext(AuthContext)

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('form validition')
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollegeName.trim().length > 1
  //     );
  //   }, 500)

  //   return () => {
  //     console.log('cleanup')
  //     clearTimeout(identifier)
  //   };
    
  // },[enteredEmail,enteredPassword,enteredCollegeName])

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT', val:event.target.value})
    setFormIsValid(
      event.target.value.includes('@') && passwordState.value.trim().length > 6 
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USER_PASSWORD',val:event.target.value})
    setFormIsValid(
      emailState.value.includes('@') && event.target.value.trim().length > 6 
    );
  };

  // const collegeNameChangeHandler = (event) => {
  //   setEnteredCollegeName(event.target.value);
  // };

  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'INPUT_BLUR'})
  };

  // const validateCollegeNameHandler = () => {
  //   setCollegeNameIsValid(enteredCollegeName.trim().length > 1);
  // };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogIn(emailState.value, passwordState.value);
    //codnijo
    console.log(event)
  };

  return (
    <Card className={classes.login}>
      
      <form onSubmit={submitHandler}>
      <Input 
         label="email"
         type="email"
         id="email"
        //  isValid={emailIsvalid}
         value={emailState.value}
         onChange={emailChangeHandler}
         onBlur={validateEmailHandler}
      />
      <Input 
         label="password"
         type="password"
         id="password"
        //  isValid={passwordIsValid}
         value={passwordState.value}
         onChange={passwordChangeHandler}
         onBlur={validatePasswordHandler}
      />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
