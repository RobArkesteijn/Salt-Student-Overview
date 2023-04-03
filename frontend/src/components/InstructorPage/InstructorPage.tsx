import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, Button, TableBody, TableSortLabel, FormControl, Select, MenuItem, InputLabel, TextField, SelectChangeEvent, Grid, styled, Modal, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PrimarySearchAppBar from "../NavBar/NavBar";
import './InstructorPage.scss';

type UserDetails = {
  id: number,
  email: string,
  first_name: string,
  last_name:string,
  Role:string,
  mob_name: string,
  mob_id: number,
  name: string
}

type Order = 'asc' | 'desc';

const InstructorPage = () => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof UserDetails>('first_name');
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [userDetails, setUserDetails] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [modalFirstName, setModalFirstName] = useState('');
  const handleOpen = (first_name: string) => {
    setOpen(true);
    setModalFirstName(first_name);
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const getAllUserDetails = async () => {
        const response = await fetch(`http://localhost:8080/api/alluserdetails`)
        const data = await response.json();
        setUserDetails(data);
    };
    getAllUserDetails();
  }, []);

  const handleSort = (property: keyof UserDetails) => {
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

  const filteredRows = userDetails.filter((item: UserDetails) =>
    (item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || item.mob_name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (courseFilter === '' || item.name.toLowerCase() === courseFilter)
  );
  
  const sortedRows = filteredRows.sort((a: UserDetails, b: UserDetails) => {
    const orderFactor = order === 'asc' ? 1 : -1;
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return orderFactor * aValue.localeCompare(bValue);
    } else {
      return 0;
    }
  });

  // const SaltInput = styled(TextField) ({
  //   "& .MuiFilledInput-underline:after": {
  //     borderBottomColor: 'rgb(255, 121, 97)'
  //   },
  //   // "& label.Mui-focused": {
  //   //   color: 'rgb(255, 121, 97)'
  //   // },
  // })

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
            <TextField
              label="Search student / mob group"
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
                    active={orderBy === 'first_name'}
                    direction={order}
                    onClick={() => handleSort('first_name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'mob_name'}
                    direction={order}
                    onClick={() => handleSort('mob_name')}
                  >
                    Mob Group
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={order}
                    onClick={() => handleSort('name')}
                  >
                    Course
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRows.map((row: UserDetails) => (
                <>
                  <TableRow key={row.first_name}>
                    <TableCell>{row.first_name}</TableCell>
                    <TableCell>{row.mob_name}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell style={{width: '140px'}}><Button variant='contained' onClick={() => handleOpen(row.first_name)} style={{backgroundColor: 'rgb(255, 121, 97)'}}>Edit</Button></TableCell>
                  </TableRow>

                  <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                        {modalFirstName}
                      </Typography>
                      <TextField></TextField>
                      {/* <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ wordWrap: "break-word" }}>
                        {row.mob_name}
                      </Typography> */}
                    </Box>
                  </Modal>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default InstructorPage;