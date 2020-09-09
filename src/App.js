import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

function UploadButton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept='image/*'
        className={classes.input}
        id='contained-button-file'
        multiple
        type='file'
      />
      <label htmlFor='contained-button-file'>
        <Button variant='contained' color='primary' component='span'>
          Upload
        </Button>
      </label>
    </div>
  );
}

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>Compress images to the new AVIF codec</p>
        <br />
        {UploadButton()}
      </header>
    </div>
  );
}

export default App;
