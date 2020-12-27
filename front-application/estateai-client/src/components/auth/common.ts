import { makeStyles } from '@material-ui/core/styles';

export const useFormStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  btn: {
      height: '100%'
  }
}));

export const isValid = (prop: string, value: string) => {
  switch (prop) {
    case 'email':
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
    case 'password':
      return value.length > 6;
    default:
      return true;
  }
}

export const handleChange = (prop: string, values: any, setValues: (value: any) => any) => (event: any) => {
  setValues({ ...values, [prop]: event.target.value });
};

export const handleBlur = (prop: string, values: any, errors: any, setErrors: (value: any) => any) => (event: any) => {
  setErrors({...errors, [prop]: !isValid(prop, values[prop])});
}