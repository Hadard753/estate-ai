import clsx from 'clsx';
import React from 'react';

import {
    Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { handleBlur, handleChange, useFormStyles } from '../common';

export default function Login() {
  const classes = useFormStyles();
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const [errors, setErrors] = React.useState({
    email: false,
    password: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  return (
      <>
        <Typography variant="h3" gutterBottom>
            Login
        </Typography>
        <form className={classes.root} noValidate autoComplete="off">
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
             <TextField
                id="outlined-basic"
                label="Email"
                value={values.email}
                onChange={handleChange('email', values, setValues)}
                onBlur={handleBlur('email', values, errors, setErrors)}
                variant="outlined"
                name="email"
                type="email"
                aria-describedby="emailHelp"
                required
                error={errors['email']} />
            </FormControl>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password', values, setValues)}
                    onBlur={handleBlur('password', values, errors, setErrors)}
                    required
                    error={errors['password']}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    }
                    labelWidth={70}
                />
            </FormControl>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <Button variant="contained" className={classes.btn}>Login</Button>
            </FormControl>
        </form>
    </>
  );
}