import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import useTable from './useTable';
import { TableBody, TableRow, TableCell, Toolbar, makeStyles, InputAdornment } from '@material-ui/core';
import Input from './Input';
import { Search } from '@material-ui/icons';

const useStyles = makeStyles(theme=>({
  searchInput:{
    width : '75%'
  }
}));

const records1 = [

  { id : 101, fullName : "Hello_1", email : "email1@gmail.com", department : "Training" },
  { id : 102, fullName : "Hello_2", email : "email2@gmail.com", department : "Training2" },
  { id : 103, fullName : "Hello_3", email : "email3@gmail.com", department : "Training3" },
  { id : 104, fullName : "Hello_4", email : "email4@gmail.com", department : "Training4" },
  { id : 105, fullName : "Hello_5", email : "email5@gmail.com", department : "Training5" },
  { id : 106, fullName : "Hello_6", email : "email6@gmail.com", department : "Training6" },
  { id : 107, fullName : "Hello_7", email : "email7@gmail.com", department : "Training7" },
  { id : 108, fullName : "Hello_8", email : "email8@gmail.com", department : "Training8" }

];

const headCells = [

  { id : "id", label : "ID"},
  { id : "fullName", label : "Full Name"},
  { id : "email", label : "Email (Personal)"},
  { id : "department", label : "Department"}

];



function App() {

  const classes = useStyles();

  const [records, setRecords] = useState(records1);
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting } = useTable(records,headCells,filterFn);

    const handleSearch = e => {
      let target = e.target;
      let searchString = target.value;
      setFilterFn({
          fn: items => {
              if (searchString == "")
                  return items;
              else
                  return items.filter(x =>( x.fullName.toLowerCase().includes(searchString.toLowerCase())
                                        ||  x.email.toLowerCase().includes(searchString.toLowerCase())
                                        ||  x.department.toLowerCase().includes(searchString.toLowerCase())
                                        ||  x.id == searchString
                  ))
          }
      })
  };

  return (
    <div >
      <Toolbar>
          <Input
              label="Search Employees"
              className={classes.searchInput}
              InputProps={{
                  startAdornment: (<InputAdornment position="start">
                      <Search />
                  </InputAdornment>)
              }}
              onChange={handleSearch}
          />
      </Toolbar>
      <TblContainer>
        <TblHead/>
        <TableBody>
          {
            recordsAfterPagingAndSorting().map(record => (
              <TableRow key={record.id}>
                <TableCell>{record.id}</TableCell>
                <TableCell>{record.fullName}</TableCell>
                <TableCell>{record.email}</TableCell>
                <TableCell>{record.department}</TableCell>
              </TableRow>
            ))
          }

        </TableBody>
        <TblPagination/>
      </TblContainer>

    </div>
  );
}

export default App;
