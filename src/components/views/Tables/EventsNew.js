import 'date-fns';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Tables.module.scss';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const EventsNew = () => {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const [value, setValue] = React.useState({
    tableValue: '',
    guestValue: '',
    durationValue: '',
    clientValue: '',
    phoneValue: '',
    messageValue: '',
  });
  const inputLabel = React.useRef(null);
  const handleValueChange = name => event => {
    setValue({ ...value, [name]: event.target.value });
  };

  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
  });

  const handleCheckboxChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <Paper className={styles.component}>
      <Grid container spacing={4} >

        <Grid item xs={12}>
          <Typography variant="h5" component="h2" align="center">New event</Typography>
        </Grid>

        <Grid item xs={12} lg={2}>
          <Grid container spacing={2} direction={'column'}>
            <Grid item>
              <Card>
                <Typography variant="h6" component="h6">ID</Typography>
                <Divider />
                {/*<Typography variant="h6" component="h6"><span>{match.params.id}</span></Typography>*/}
                <Input
                  id="orderId"
                  variant="outlined"
                  size="small"
                //value={value}
                //onChange={handleValueChange}
                />
              </Card>
            </Grid>

            <Grid item>
              <Card>
                <Typography>Table</Typography>
                <Divider />

                <FormControl variant="outlined">
                  <InputLabel ref={inputLabel} id="table-label"></InputLabel>
                  <Select
                    labelId="table-label"
                    id="table"
                    value={value.tableValue}
                    onChange={handleValueChange('tableValue')}
                  >

                    <MenuItem value="">

                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                  </Select>
                </FormControl>
              </Card>
            </Grid>

            <Grid item>
              <Card>
                <Typography>Guests</Typography>
                <Divider />

                <FormControl variant="outlined">
                  <InputLabel ref={inputLabel} id="guests-label"></InputLabel>
                  <Select
                    labelId="guests-label"
                    id="guests"
                    value={value.guestValue}
                    onChange={handleValueChange('guestValue')}
                  >
                    <MenuItem value="">

                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                  </Select>
                </FormControl>
              </Card>
            </Grid>

            <Grid item>
              <Card>
                <Typography>Duration</Typography>
                <Divider />

                <Input
                  id="duration"
                  variant="outlined"
                  size="small"
                  value={value.durationValue}
                  onChange={handleValueChange('durationValue')}
                />

              </Card>
            </Grid>

            <Grid item>
              <Card>
                <Typography>Starters</Typography>
                <Divider />

                <FormGroup row>

                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={state.checkedA}
                        onChange={handleCheckboxChange('checkedA')}
                        value="checkedA"
                        color="primary"
                      />
                    }
                    label="Bread"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={state.checkedB}
                        onChange={handleCheckboxChange('checkedB')}
                        value="checkedB"
                        color="primary"
                      />
                    }
                    label="Lemon water"
                  />

                </FormGroup>
              </Card>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} lg={10}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>

              <KeyboardDatePicker
                autoOk
                margin="normal"
                variant="static"
                orientation="landscape"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
                autoOk
                margin="normal"
                variant="static"
                orientation="landscape"
                ampm={false}
                id="time-picker"
                label="Time picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>

          <Grid item xs={12} lg={6}>
            <Card>
              <Typography>EVENT DETAILS:</Typography>
              <Table>
                <TableBody>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      Name, Surname:
                    </TableCell>
                    <TableCell>

                    </TableCell>
                  </TableRow>

                  <TableRow >
                    <TableCell component="th" scope="row">
                      Phone number:
                    </TableCell>
                    <TableCell>

                    </TableCell>

                  </TableRow>

                  <TableRow >
                    <TableCell component="th" scope="row">
                      Message:
                    </TableCell>
                    <TableCell>

                    </TableCell>

                  </TableRow>

                </TableBody>
              </Table>

            </Card>
          </Grid>


        </Grid>
      </Grid>
    </Paper>
  );
};

EventsNew.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default EventsNew;