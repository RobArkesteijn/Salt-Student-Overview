import React from 'react';
import './TestResults.scss';
// import { CopyBlock, atomOneDark } from "react-code-blocks";
import { Box, Button, Card, CardActions, CardContent, Modal, Paper, styled, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Unstable_Grid2';
import { Masonry } from '@mui/lab';
import { useState, useEffect } from 'react';
import PrimarySearchAppBar from "../NavBar/NavBar";

const TestResults = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [catData, setCatData] = useState('');

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/danchou-san/cat-website/main/README.md')
      .then(response => response.text())
      .then(data => setCatData(data))
      .catch(error => console.error(error));
  }, []);

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

  const mockResults = [
    { name: 'winter23-jsfs-test-callbackCalculator', repoName: 'Callback Calculator', result: 'green'},
    { name: 'winter23-jsfs-test-recreateGoogle', repoName: 'Recreate Google' ,result: 'red'},
    { name: 'winter23-jsfs-test-simpleFunctions', repoName: 'Simple Functions', result: 'green'},
    { name: 'winter23-jsfs-test-simpleCalculator', repoName: 'Simple Calculator' ,result: 'green'},
    { name: 'winter23-jsfs-test-landingCodeForNasa', repoName: 'Landing Code For Nasa', result: 'red'},
    { name: 'winter23-jsfs-test-hackingThePentagon', repoName: 'Hacking The Pentagon', result: 'green'},
  ]

  var showdown  = require('showdown')

  const markdown = () => {
    const converter = new showdown.Converter();
    const text = '# &lt;/salt&gt;\n## React - Salt Instructors & Developers\nUs instructors have so much to do so we need help keeping track on all developers. Your task is to create a simple UI for us to add & remove developers in different bootcamps and to be able to filter them by bootcamp in the UI.';
    const html = converter.makeHtml(catData);
    return html
  };

  let danger = 0;
  for (let i = 0; i < mockResults.length; i++) {
    if (i >= 1 && mockResults[i-1].result === 'red' && mockResults[i].result === 'red') {
        danger = 2;
    }

    if (danger > 0 && mockResults[i].result === 'green') {
      danger--;
    }
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const PreviousTestButton = styled(Button)({
    color: 'rgb(255, 121, 97)',
  });

  const resultsPerWeek = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div">
          Progress
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Weekend results per week
        </Typography>
        <Typography variant="body2">
          <div className='progressDiv'>
           {mockResults.map(item => (
             <div className={'resultCircle ' + item.result}></div>
           ))}
          </div>
        </Typography>
        
        <br />
        <hr />
        <br />
        <div>
          {danger === 2
          ? 
            <div>
              <Typography>Warning! You have 2 reds in a row</Typography>
              <Button size='small'>What does this mean?</Button>
            </div>
          :
            <div>
              <Typography>You'e doing great</Typography>
              <Typography>Keep it up!</Typography>
            </div>
          }
          </div>
      </CardContent>

      <CardActions>
        
      </CardActions>
    </React.Fragment>
  );

  const previousTestsCard = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div">
          Previous Tests
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          All previous weekend tests
        </Typography>
        <hr />
        <br />
        <Typography variant="body2">
        <Grid container spacing={2}>
          {mockResults.map(item => (
            <Grid xs={6}>
              <div className='test'>
                <PreviousTestButton onClick={handleOpen} className={item.result + 'Text'}>{item.repoName}</PreviousTestButton>
                {item.result === 'green' ?
                  <CheckIcon></CheckIcon>
                : <CloseIcon></CloseIcon>
                }
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Callback Calculator
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ wordWrap: "break-word" }}>
                    Hi Ariano,
                    Thank you for handing in a good weekend test! You clearly understand Express and databases. As always we have feedback.
                    For the most part, your code is situated in both of the db.ts files. While this is not a bad practice it would be better to split the business logic to a different file. In this test the business logic could've been placed in the index.ts files. Why, you ask? Because it adheres to the seperation of concerns. The db function should be responsible for handling data in the database.
                    /products/db.ts
                    Line 28 is not necessary, why did you use this here?
                    The validation in the updateCart function is slightly verbose, but we like it because this makes sure data is available and (for example) not overwritten.
                    Overall you did a good job. Keep it up!
                  </Typography>
                </Box>
              </Modal>
            </Grid>
          ))}
        </Grid>
        
        </Typography>
      </CardContent>

      <CardActions>
        
      </CardActions>
    </React.Fragment>
  );

  const currentTest = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div">
          Current test
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Current test for the weekend
        </Typography>
        <hr />
        <br />
        <Typography variant="h5">
          For Loops / winter23-jsfs-test-forLoops
        </Typography>
        <br />
        <Typography variant="body2">
          <Card>

          </Card>
          <div className='markdownDisplay' dangerouslySetInnerHTML={{ __html: markdown() }}></div>
        </Typography>
      </CardContent>

      <CardActions>
        
      </CardActions>
    </React.Fragment>
  );

  return (
    <>
    <PrimarySearchAppBar/>
    <div className='weekendTest'>
        <Masonry columns={2} spacing={2}>
          <Item>{resultsPerWeek}</Item>
          <Item>{currentTest}</Item>
          <Item>{previousTestsCard}</Item>
        </Masonry>
    </div>
  </>
  );
};

export default TestResults;