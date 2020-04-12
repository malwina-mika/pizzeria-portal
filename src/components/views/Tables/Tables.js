import 'date-fns';
import React, { useState } from 'react';
import styles from './Tables.module.scss';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const hours = ['18:00', '18:30', '19:00', '19:30'];

const tables = [
  {
    id: 1,
    bookings: {
      '18:00': { hour: '18:00', type: 'Booking', typeId: '123' },
      '18:30': { hour: '18:00', type: 'Booking', typeId: '123' },
      '19:00': {},
      '19:30': {},
    },
    events: {
      '18:00': {},
      '18:30': {},
      '19:00': {},
      '19:30': {},
    },
  },
  {
    id: 2,
    bookings: {
      '18:00': {},
      '18:30': {},
      '19:00': {},
      '19:30': {},
    },
    events: {
      '18:00': { hour: '18:00', type: 'Event', typeId: '123' },
      '18:30': { hour: '18:00', type: 'Event', typeId: '123' },
      '19:00': { hour: '18:00', type: 'Event', typeId: '123' },
      '19:30': { hour: '18:00', type: 'Event', typeId: '123' },
    },
  },
  {
    id: 3,
    bookings: {
      '18:00': {},
      '18:30': {},
      '19:00': {},
      '19:30': {},
    },
    events: {
      '18:00': {},
      '18:30': {},
      '19:00': {},
      '19:30': {},
    },
  },
  {
    id: 4,
    bookings: {
      '18:00': {},
      '18:30': {},
      '19:00': {},
      '19:30': {},
    },
    events: {
      '18:00': {},
      '18:30': {},
      '19:00': { hour: '19:00', type: 'Event', typeId: '234' },
      '19:30': { hour: '19:30', type: 'Event', typeId: '234' },
    },
  },

];

const Tables = () => {

  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Paper className={styles.component}>
      <Grid container spacing={4}>

        <Grid item xs={12}>
          <Typography variant="h5" component="h2" align="center">Tables view</Typography>
        </Grid>

        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="center">

              <KeyboardDatePicker
                margin="normal"
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
                margin="normal"
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
        </Grid>

        <Divider />

        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Hours/Table</TableCell>
                {tables.map(table => (
                  <TableCell key={table.id} align="left">{table.id}</TableCell>
                ))}

              </TableRow>
            </TableHead>
            <TableBody>
              {hours.map(i => (
                <TableRow key={i}>
                  <TableCell>
                    {i}
                  </TableCell>
                  {tables.map(table => {
                    const isBooked = table.bookings[i].typeId;
                    const isEvent = table.events[i].typeId;

                    return (

                      <TableCell key={table.id} align="left">
                        {isBooked ?
                          <Button component={Link} to={`${process.env.PUBLIC_URL}/tables/booking/123`}>
                            {table.bookings[i].type}-{isBooked}
                          </Button>
                          :
                          isEvent ?
                            <Button component={Link} to={`${process.env.PUBLIC_URL}/tables/event/123`}>
                              {table.events[i].type}-{isEvent}
                            </Button>
                            : null
                        }
                      </TableCell>
                    );

                  })}
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </Grid>

        <Grid item>
          <Fab color="primary" aria-label="add" variant="extended" component={Link} to={`${process.env.PUBLIC_URL}/tables/booking/new`}>
            <AddIcon /> NEW BOOKING
          </Fab>
          <Fab color="primary" aria-label="add" variant="extended" component={Link} to={`${process.env.PUBLIC_URL}/tables/event/new`}>
            <AddIcon /> NEW EVENT
          </Fab>
        </Grid>

      </Grid>
    </Paper>
  );
};

export default Tables;