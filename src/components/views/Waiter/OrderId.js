import React from 'react';
import styles from './Waiter.module.scss';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const menu = [
  { id: 1, dish: 'breakfast', options: ['Late', 'Cappuccino', 'Espresso', 'Macchiato'] },
  { id: 2, dish: 'pizza', options: ['Olives', 'Red peppers', 'Mushrooms', 'Salami'] },
  { id: 3, dish: 'salad', options: ['Cucumber', 'Cheese', 'Fresh herbs', 'Black pepper', 'Olives'] },
];

const OrderId = () => {
  return (
    <Container>
      <Paper className={styles.component}>
        <h2>Order ID</h2>
        <Grid container spacing={5}>
          <Grid item xs={6} lg={4} spacing={2}>
            <Paper>
              <Typography variant="h5">Table</Typography>
              <Divider />
              <TextField id="outlined-basic" label='1' variant="outlined" />
            </Paper>
          </Grid>
          <Grid item xs={6} lg={4} spacing={2}>
            <Paper>
              <Typography variant="h5">Value</Typography>
              <Divider />
              <Typography variant="h3">89$</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs container direction="column" spacing={5}>
          <Grid item>
            <Paper>
              <Typography variant="h5">Menu</Typography>
              <Divider />
              <Table>
                <TableBody>
                  {menu.map(row => (
                    <TableRow key={row.id} className={styles.tableRow}>
                      <TableCell><Typography variant="h6">{row.dish}</Typography></TableCell>
                      {row.options.map(option => (
                        <TableCell key={option}>{option}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={12} container direction="column" spacing={5}>
          <Grid item>
            <Paper>
              <Typography variant="h5">Order</Typography>
              <Divider />
              <Table>
                <TableBody>
                  {menu.map(row => (
                    <TableRow key={row.id} className={styles.tableRow}>
                      <TableCell><Typography variant="h6">{row.dish}</Typography></TableCell>
                      {row.options.map(option => (
                        <TableCell key={option}>{option}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default OrderId; 