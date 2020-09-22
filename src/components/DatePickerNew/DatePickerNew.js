import 'date-fns';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { yellow } from '@material-ui/core/colors';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import './DatePickerNew.css'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(yellow[500]),
        backgroundColor: yellow[500],
        '&:hover': {
        backgroundColor: yellow[700],
        },
    },
    }))(Button);
    
    const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    }));


const DatePickerNew = ({name}) => {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
 const classes = useStyles();
  return (
      <div className="date-picker"> 
          <input className="input-field" type="text" placeholder="Dhaka"/> <br/> <br/>
          <input className="input-field" type="text" placeholder={name}/>
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                disableToolbar
                variant="inline"
                minDate={new Date()}
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="From"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
                <KeyboardDatePicker
                margin="normal"
                minDate={new Date()}
                id="date-picker-dialog"
                label="To"
                format="dd/MM/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
            </MuiPickersUtilsProvider>
        </div>
        <Link className="btn-login" to="/newUser"><ColorButton variant="contained" color="primary" className={classes.margin}> Start Booking </ColorButton></Link>
      </div>
  );
}
export default DatePickerNew;
