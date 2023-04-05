import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, Button, TableBody, TableSortLabel, FormControl, Select, MenuItem, InputLabel, TextField, SelectChangeEvent, Grid, styled, Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from "react";
import './StudentInfo.scss';

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

type TestData = {
  id: number,
  name: string,
  repo_name: string,
  repo_url: string,
  course_ids: string[],
  ongoing: boolean
}

type UserFeedback = {
  id: number,
  name: string,
  user_id: number,
  test_id: number,
  feedback: string,
  result: string
}

type Order = 'asc' | 'desc';

const InstructorPage = () => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof UserDetails>('first_name');
  const [searchTerm, setSearchTerm] = useState('');
  const [userDetails, setUserDetails] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [modalFirstName, setModalFirstName] = useState('');
  const [modalLastName, setModalLastName] = useState('');
  const [modalMobName, setModalMobName] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [courseTest, setCourseTest] = useState('');
  const [testSelect, setTestSelect] = useState([])
  const [chosenSelect, setChosenSelect] = useState('');
  const [userFeedback, setUserFeedback] = useState([]);

  const handleOpen = (first_name: string, last_name: string, mob_name: string) => {
    setOpen(true);
    setModalFirstName(first_name);
    setModalLastName(last_name);
    setModalMobName(mob_name);
  }

  useEffect(() => {
    const getAllUserDetails = async () => {
      const response = await fetch(`http://localhost:8080/api/alluserdetails`)
      const data = await response.json();
      setUserDetails(data);
    };
    getAllUserDetails();
  }, []);

  useEffect(() => {
    const getUserByEmail = async () => {
      const response = await fetch(`http://localhost:8080/api/getuserbyemail/${'ariano.wongsosetro@appliedtechnology.se'}`);
      const data = await response.json();
      const courseName = data[0].name;
      const courseId = data[0].id;
      const courseIdString = String(courseId);
      setCourseFilter(courseName.toLowerCase());
      setCourseTest(courseIdString);
    };
    getUserByEmail();
  }, [])

  useEffect(() => {
    const getTestByCourseId = async () => {
      const response = await fetch(`http://localhost:8080/api/weekendtestcourse/${courseTest}`)
      const data = await response.json();
      setTestSelect(data);
    };
    getTestByCourseId();
  }, [courseTest]);

  useEffect(() => {
    const getUserFeedback = async () => {
      const response = await fetch(`http://localhost:8080/api/previoustests/100`)
      const data = await response.json();
      setUserFeedback(data);
      console.log(data);
    };
    getUserFeedback();
  }, []);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    padding: '20px 50px 20px 50px',
    width: '1000px'
  };

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

  const handleCourseTest = (event: SelectChangeEvent<string>) => {
    setCourseTest(event.target.value);
  };

  const handleTest = (event: SelectChangeEvent<string>) => {
    setChosenSelect(event.target.value);
  };

  const filteredRows = userDetails.filter((item: UserDetails) =>
    (item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.mob_name.toLowerCase().includes(searchTerm.toLowerCase())) &&
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

  // This doesn't work for some reason
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
                    <TableCell>{row.first_name} {row.last_name}</TableCell>
                    <TableCell>{row.mob_name}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell style={{width: '200px'}}><Button variant='contained' onClick={() => handleOpen(row.first_name, row.last_name, row.mob_name)} style={{backgroundColor: 'rgb(255, 121, 97)'}}>Add Feedback</Button></TableCell>
                  </TableRow>

                  <Modal
                    open={open}
                    // onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h5" component="h2" style={{textAlign: 'center'}}>
                        {modalFirstName} {modalLastName} | {modalMobName}
                      </Typography>
                      <IconButton style={{position: 'absolute', left: '960px', bottom: '435px'}} onClick={handleClose}>
                        <CloseIcon/>
                      </IconButton>
                      <br />
                      <hr />
                      <br />
                      <br />
                      <Grid container spacing={2}>
                        <Grid xs={6} style={{paddingRight: '20px'}}>
                          <Typography id="modal-modal-title" variant="h6" component="h2" style={{position: 'relative', left: '-14px'}}>
                            Add Feedback
                          </Typography>
                          <br />
                          <Grid container spacing={2}>
                            <Grid xs={4} style={{paddingRight: '10px'}}>
                              <SaltSelect variant="filled" style={{ width: '100%'}}>
                                <InputLabel>Course</InputLabel>
                                <Select
                                  value={courseTest}
                                  onChange={handleCourseTest}
                                  label="Course"
                                >
                                  <MenuItem value="">All</MenuItem>
                                  <MenuItem value="500">JSFS</MenuItem>
                                  <MenuItem value="501">JFS</MenuItem>
                                  <MenuItem value="502">DNFS</MenuItem>
                                </Select>
                              </SaltSelect>
                            </Grid>

                            <Grid xs={8}>
                              <SaltSelect variant="filled" style={{ width: '100%'}}>
                                <InputLabel>Weekend test</InputLabel>
                                <Select
                                  value={chosenSelect}
                                  onChange={handleTest}
                                  label="Weekend Test"
                                >
                                  {testSelect.map((item: TestData) => (
                                    <MenuItem value={item.repo_name}>{item.name} / {item.repo_name}</MenuItem>
                                  ))}
                                </Select>
                              </SaltSelect>
                            </Grid>

                            <Grid xs={12} style={{paddingTop: '10px'}}>
                            <SaltSelect variant="filled" style={{ width: '100%'}}>
                                <InputLabel id="course-filter-label">Result</InputLabel>
                                <Select
                                  label="Result"
                                >
                                  <MenuItem value="green">Green</MenuItem>
                                  <MenuItem value="red">Red</MenuItem>
                                </Select>
                              </SaltSelect>
                            </Grid>

                            <Grid xs={12} style={{paddingTop: '10px'}}>
                              <TextField
                                variant="filled"
                                label="Feedback"
                                rows={4}
                                multiline
                                style={{ width: '100%'}}
                              />
                            </Grid>

                            <Grid xs={4} style={{paddingTop: '10px'}}>
                              <Button variant='contained' onClick={() => handleOpen(row.first_name, row.last_name, row.mob_name)} style={{backgroundColor: 'rgb(255, 121, 97)'}}>Add</Button>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid xs={6}>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                            Latest Feedback
                          </Typography>

                          <Typography>
                            {/* No feedback yet */}
                            {userFeedback.map((item: UserFeedback) => (
                              <Button>{item.name}</Button>
                            ))}
                          </Typography>
                        </Grid>
                      </Grid>
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