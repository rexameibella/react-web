import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Presentation4 from '../../../../public/resources/Presentation4.png'
import Divider from '@material-ui/core/Divider'
import { green } from '@material-ui/core/colors';
import useStates from "../../states";
import { Box, Slide } from "@material-ui/core";
import WhatsUp from '../../../../public/resources/WhatsUp.png'



const Login = () => {

  const [state, actions] = useStates();
  useEffect(() => {
    actions.setStateObject({
      loadingData: false,
      loadingSucces: false,
      submitDone: false,
      helperfullName: false,
      helpercompanyName: false,
      helperemailUser: false,
      helperemailUserValidate: false,
      helperindustryUser: false,
      helperphone: false
    })
    actions.get('landingpage').then(result => {
      actions.setState('Industry', result)
    })
  }, []);

  const useStyles = makeStyles(theme => ({
    rootDiv: {
      backgroundColor: '#34b7f1'
    },
    rootImage: {
      display: 'block',
      width: '100%',
      position: 'relative',
      WebkitUserSelect: 'none',
      WebkitUserModify: 'none',
      pointerEvents:'none'
    },
    button: {
      margin: theme.spacing(1),
      backgroundColor: '#34b7f1'
    },
    buttonSucces: {
      margin: theme.spacing(1),
      backgroundColor: green[500]
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      // backgroundColor: '#F0F0F0',
    },
    progressCircle: {
      color: '#FFFFFF'
    },
    FAB: {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
      outline: 'none',
      padding: '0',
      height: ' 60px',
      width: '60px',

    },
    WhatsUp: {
      width: "125px",
      height: "auto",
    },
    PaperSumbit: {
      marginTop: '10px',
      marginBottom: '20px',
      backgroundColor: '#fdfdfd',
      padding: '50px 30px 20px 15px'
    }
  }));


  const classes = useStyles();

  const handleChange = name => event => {
    actions.setState('helper' + name, false)
    actions.handleInputChange(name, event);
  };

  const submit = event => {
    if (state.loadingSucces) {
      actions.openAlert('Attention', 'Anda Telah Submit');
    }
    else {
      if (state.fullName === '' || state.fullName == null) {
        actions.setState('helperfullName', true)
      } else if (state.companyName === '' || state.companyName == null) {
        actions.setState('helpercompanyName', true)
      } else if (state.emailUser === '' || state.emailUser == null) {
        actions.setState('helperemailUser', true)
      } else if (state.industryUser === 0 || state.industryUser == null) {
        actions.setState('helperindustryUser', true)
      } else if (state.phone === '' || state.phone == null) {
        actions.setState('helperphone', true)
      } else if (validateEmail(state.emailUser) == false) {
        actions.setState('helperemailUserValidate', true)
      }
      else {
        actions.setStateObject({
          loadingData: true,
          helperfullName: false,
          helpercompanyName: false,
          helperemailUser: false,
          helperindustryUser: false,
          helperphone: false,
          helperemailUserValidate: false
        })
        actions.post('landingpage/setMerchant', {
          username: state.fullName,
          company: state.companyName,
          email: state.emailUser,
          industry: state.industryUser,
          phone: state.phone
        }).then(result => {
          actions.setStateObject({
            loadingData: false,
            loadingSucces: true,
            submitDone: true,
          })
        }).catch(error => {
          actions.openAlert('Attention', error.response.statusText);
        })
      };
    }
  }
  const handleClose = event => {
    actions.closeAlert();
    actions.setState('submitDone', false)
  };
  const OpenDialogWA = event => {
    actions.setState('DialogWaMessage', true)
  };
  const WAMessageSend = event => {
    console.log(state.WAMessage)
    WhatsUpAutoChat(state.WAMessage)
  };


  return (

    <div className={classes.rootDiv}>
      <Box style={{ paddingBottom: '0px' }}>
        <img src={Presentation4} alt="" className={classes.rootImage} ></img>
        {/* <h1><span style={{ position: 'absolute', top: '70%', left: '50%', transform: 'translate(-50%, -40%)', fontFamily: 'Open Sans', color: 'white', display: 'block' }}>Business more
        profit, efficient, simple and easy.</span></h1> */}
        <div style={{ position: 'absolute', top: '60px', right: '100px', color: 'white', fontFamily: 'Open Sans', display: 'block' }}>
          <h2>
            <a href="tel:+6281235709469" style={{ color: 'white', textDecoration: 'none' }}>(+62) 81235709469  </a><br />
          Sentani Raya Street Number 31 <br />
          Malang,  East Java, Indonesia
          </h2></div>
      </Box>
      <Paper elevation={3} className={classes.PaperSumbit}>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <span>What amazing ideas can we turn into reality together?</span><br />
        </div>
        <Grid item xs={12} sm={12} style={{ paddingBottom: '0px' }}>
          <GridList cellHeight={200} cols={12}>
            <GridListTile key='one' cols={4}>
              <TextField
                error={state.helperfullName}
                id="filled-name"
                label="Full Name"
                helperText={state.helperfullName ? 'Fill Field Full Name' : ''}
                className={classes.textField}
                value={state.fullName}
                onChange={handleChange('fullName')}
                margin="normal"
                style={state.helperfullName ? { width: '80%', marginBottom: '-2px' } : { width: '80%', marginBottom: '20px' }}
                variant="outlined" /><br />
              <TextField
                error={state.helpercompanyName}
                id="filled-company-name"
                label="Company Name"
                helperText={state.helpercompanyName ? 'Fill Field Company Name.' : ''}
                className={classes.textField}
                value={state.companyName}
                onChange={handleChange('companyName')}
                margin="normal"
                style={state.helpercompanyName ? { width: '80%', marginBottom: '-2px' } : { width: '80%', marginBottom: '20px' }}
                variant="outlined" /><br />
            </GridListTile>
            <GridListTile key='two' cols={4}>
              <TextField
                error={state.helperemailUser || state.helperemailUserValidate}
                id="filled-email"
                type="email"
                label='E-mail'
                helperText={state.helperemailUser ? 'Fill Field E-mail' : (state.helperemailUserValidate ? 'Fill correct E-mail' : '')}
                className={classes.textField}
                value={state.emailUser}
                onChange={handleChange('emailUser')}
                margin="normal"
                style={state.helperemailUser ? { width: '80%', marginBottom: '-2px' } : (state.helperemailUserValidate ? { width: '80%', marginBottom: '-2px' } : { width: '80%', marginBottom: '20px' })}
                variant="outlined" /><br />
              <TextField
                error={state.helperindustryUser}
                select
                id="filled-industry"
                label="Industry"
                helperText={state.helperindustryUser ? 'Select item' : ''}
                className={classes.textField}
                value={state.industryUser}
                onChange={handleChange('industryUser')}
                margin="normal"
                style={state.helperindustryUser ? { width: '80%', marginBottom: '-2px' } : { width: '80%', marginBottom: '-2px' }}
                variant="outlined" >
                {state.Industry ? state.Industry.map((row, i) => (
                  <MenuItem value={row.id}>{row.name}</MenuItem>
                )) : <MenuItem value={''}>{'Kosong'}</MenuItem>}
              </TextField><br />
            </GridListTile>
            <GridListTile key='three' cols={4}>
              <TextField
                error={state.helperphone}
                id="filled-phone"
                label="Phone Number"
                helperText={state.helperphone ? 'Fill Phone Number' : ''}
                className={classes.textField}
                value={state.phone}
                onChange={handleChange('phone')}
                margin="normal"
                style={state.helperphone ? { width: '80%', marginBottom: '-2px' } : { width: '80%', marginBottom: '20px' }}
                variant="outlined" /><br />
              <Button onClick={submit} size="medium" variant="contained" color="primary" className={state.loadingSucces ? classes.buttonSucces : classes.button} style={{ width: '80%', marginTop: '20px', height: '25%' }}>
                {!state.loadingData || !state.loadingSucces ? 'Submit' : <CircularProgress color="secondary" size={10} />}
              </Button>
            </GridListTile>
          </GridList>
        </Grid>
      </Paper>
      <Paper elevation={2}> TEST</Paper>
      <Button className={classes.FAB} onClick={OpenDialogWA}>
        <img src={WhatsUp} className={classes.WhatsUp}></img>
      </Button>
      
      <Dialog
        open={state.alertOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{state.alertTitle} <br />
          <Divider orientation={'horizontal'}></Divider>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{state.alertMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose} autoFocus>OK</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={state.submitDone}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{'Terima Kasih Telah Submit'}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose} autoFocus>OK</Button>
        </DialogActions>
      </Dialog>

      
      <Dialog
        open={state.DialogWaMessage}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'WA Message Test'} <br />
          <Divider orientation={'horizontal'}></Divider>
        </DialogTitle>
        <DialogContent>
        <TextField
                id="filled-WA"
                label='WA'
                // helperText={state.helperemailUser ? 'Fill Field E-mail' : (state.helperemailUserValidate ? 'Fill correct E-mail' : '')}
                className={classes.textField}
                value={state.WAMessage}
                onChange={handleChange('WAMessage')}
                margin="normal"
                style={state.helperemailUser ? { width: '80%', marginBottom: '-2px' } : (state.helperemailUserValidate ? { width: '80%', marginBottom: '-2px' } : { width: '80%', marginBottom: '20px' })}
                variant="outlined" /><br />
        <Button color="primary" onClick={WAMessageSend} autoFocus>OK</Button>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose} autoFocus>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function WhatsUpAutoChat(message){
  let test = 'https://wa.me/send?phone=&text='+encodeURI(message)
  let test2 = 'https://wa.me/?text='+message
  window.location.assign(test)
}

