import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, Button, TableBody, TableSortLabel, FormControl, Select, MenuItem, InputLabel, TextField, SelectChangeEvent, Grid, styled } from "@mui/material";
import React, { useState } from "react";
import PrimarySearchAppBar from "../NavBar/NavBar";
import './InstructorPage.scss';

type Data = {
  id: number;
  name: string;
  mobGroup: string;
  course: string;
};

type Order = 'asc' | 'desc';

function createData(id: number, name: string, mobGroup: string, course: string): Data {
  return { id, name, mobGroup, course };
}

const rows = [
  createData(1, 'John', 'Mob A', 'jsfs'),
  createData(2, 'Jane', 'Mob B', 'jfs'),
  createData(3, 'Mark', 'Mob C', 'dnfs'),
  createData(4, 'Mary', 'Mob D', 'jfs'),
];

const InstructorPage = () => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('');

  const handleSort = (property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (event: SelectChangeEvent<string>) => {
    setCourseFilter(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    (row.name.toLowerCase().includes(searchTerm.toLowerCase()) || row.mobGroup.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (courseFilter === '' || row.course === courseFilter)
  );
  
  const sortedRows = filteredRows.sort((a, b) => {
    const orderFactor = order === 'asc' ? 1 : -1;
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return orderFactor * aValue.localeCompare(bValue);
    } else {
      return 0;
    }
  });

  const SaltInput = styled(TextField) ({
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: 'rgb(255, 121, 97)'
    },
    "& label.Mui-focused": {
      color: 'rgb(255, 121, 97)'
    },
  })

  const SaltSelect = styled(FormControl) ({
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: 'rgb(255, 121, 97)'
    },
    "& label.Mui-focused": {
      color: 'rgb(255, 121, 97)'
    },
  })

  return (
    <>
      <PrimarySearchAppBar/>
      <div className='instructorContent'>
        <Grid container style={{textAlign: 'center', marginBottom: '20px'}}>
          <Grid xs={6} style={{paddingRight: '10px'}}>
            <SaltInput
              label="Search"
              variant="filled"
              value={searchTerm}
              onChange={handleSearch}
              style={{ width: '100%'}}
            />
          </Grid>

          <Grid xs={6} style={{paddingLeft: '10px'}}>
            <SaltSelect variant="filled" style={{ width: '100%'}}>
              <InputLabel id="course-filter-label">Course</InputLabel>
              <Select
                labelId="course-filter-label"
                id="course-filter"
                value={courseFilter}
                onChange={handleFilter}
                label="Course"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="jsfs">JSFS</MenuItem>
                <MenuItem value="jfs">JFS</MenuItem>
                <MenuItem value="dnfs">DNFS</MenuItem>
              </Select>
            </SaltSelect>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={order}
                    onClick={() => handleSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'mobGroup'}
                    direction={order}
                    onClick={() => handleSort('mobGroup')}
                  >
                    Mob Group
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'course'}
                    direction={order}
                    onClick={() => handleSort('course')}
                  >
                    Course
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.mobGroup}</TableCell>
                  <TableCell>{row.course}</TableCell>
                  <TableCell style={{width: '120px'}}><Button variant='contained' style={{backgroundColor: 'rgb(255, 121, 97)'}}>Edit {row.id}</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default InstructorPage;