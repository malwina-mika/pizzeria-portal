import React from 'react';
import styles from './Login.module.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Login extends React.Component {

  render() {

    return (
      <div className={styles.component}>
        <form className={styles.component}>
          <TextField className={styles.textField} id="standard-basic" label="Login" />
          <TextField className={styles.textField}
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button className={styles.button} variant="outlined">Log in</Button>
        </form>
      </div>

    );
  }

}

export default Login;