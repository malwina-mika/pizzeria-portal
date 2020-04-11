import React from 'react';
import styles from './Kitchen.module.scss';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const demoContent = [
  { id: '1', status: 'ordered', tableNumber: '1', order: ['pizza, ', 'water'] },
  { id: '2', status: 'ordered', orderNumber: '5a', order: ['pizza, ', 'salad'] },
  { id: '3', status: 'during preparation', tableNumber: '2', order: ['cake, ', 'coffe'] },
  { id: '4', status: 'during preparation', orderNumber: '8a', order: ['pizza, ', 'cake'] },
  { id: '5', status: 'ready to go', tableNumber: '3', order: ['breakfast, ', 'tea'] },
  { id: '6', status: 'ready to go', orderNumber: '10a', order: ['pizza, ', 'water'] },
  { id: '7', status: 'done', orderNumber: '12a', order: null },
];

const renderActions = status => {
  switch (status) {
    case 'ordered':
      return (
        <>
          <Button>during preparation</Button>
        </>
      );
    case 'during preparation':
      return (
        <Button>ready to go</Button>
      );
    case 'ready to go':
      return (
        <Button>done</Button>
      );
    case 'done':
      return (
        <p>done</p>
      );

    default:
      return null;
  }
};

const Kitchen = () => (
  <Paper className={styles.component}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Order ID</TableCell>
          <TableCell>Staus</TableCell>
          <TableCell>Table Number/ Order Number</TableCell>
          <TableCell>Order details</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {demoContent.map(row => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell>
              {row.status}
            </TableCell>
            <TableCell>
              {row.tableNumber || row.orderNumber}
            </TableCell>
            <TableCell>
              {row.order}
            </TableCell>
            <TableCell>
              {renderActions(row.status)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);


export default Kitchen; 