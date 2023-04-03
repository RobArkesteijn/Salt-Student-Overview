import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, Button, TableBody, TableSortLabel, FormControl, Select, MenuItem, InputLabel, TextField, SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import PrimarySearchAppBar from "../NavBar/NavBar";
import './InstructorPage.scss';

type Data = {
  name: string;
  mobGroup: string;
  course: string;
};

type Order = 'asc' | 'desc';

function createData(name: string, mobGroup: string, course: string): Data {
  return { name, mobGroup, course };
}

const rows = [
  createData('John', 'Mob A', 'jsfs'),
  createData('Jane', 'Mob B', 'jfs'),
  createData('Mark', 'Mob C', 'dnfs'),
  createData('Mary', 'Mob D', 'jfs'),
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
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
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

  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: '1rem' }}
      />

      <FormControl variant="outlined" style={{ marginBottom: '1rem' }}>
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
      </FormControl>

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
                <TableCell><Button variant='contained'>Edit</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default InstructorPage;