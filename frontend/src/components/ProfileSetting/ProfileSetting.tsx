
import * as React from 'react';
import './ProfileSetting.scss';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '10px', transform: 'scale(0.8)' }}
//   >
//     •
//   </Box>
// );

const ProfileSetting = () => {
  const [image,setImage]=React.useState("")
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.substring(0, 5) === "image") {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    } else {
      setImage("");
    }
  }
  return (
<div className='main-profile-div'>
  <div className='profile-container'>
    <div className='top-part'>
      <div className='user-profile-bg-image'>
        <img id='prf-bg-img' src='Image/SALT.jpg' alt='salt'/>
      </div>
      <div className='user-profile-image'>
      <img id='prf-img' src={image} alt='' srcSet=''/>

      <input type='file' accept='/image/*' onChange={handleFileChange} className="file-upload"/>
      </div>
    </div>
    <Card sx={{ marginTop:'4px' }}>
      <CardContent className='CardContent'>
      <TextField
      className='TextField'
          required
          id="outlined-required"
          label="Name"
          defaultValue="Yalda"
          color='warning'
        />
       <TextField
       className='TextField'
          required
          id="outlined-required"
          label="Last name"
          defaultValue="Lavi"
          color='warning'
        />
        <TextField
        className='TextField'
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          color='warning'
        />
       <TextField
       className='TextField'
          disabled
          id="outlined-disabled"
          label="BootCamp"
          defaultValue="JavaScript-fullStack-Winter"
          color='warning'
        />
         <TextField
         className='TextField'
          disabled
          id="outlined-disabled"
          label="GroupName"
          defaultValue="Pasta"
        />
         <TextField
         className='TextField'
          disabled
          id="outlined-disabled"
          label="Instructors"
          defaultValue="Wietse,Dasha"
        />
         <TextField
         className='TextField'
          disabled
          id="outlined-disabled"
          label="MobMembers"
          defaultValue="Rob,Ariano"
          color='warning'
        />
      </CardContent>
      <CardActions className='button-container' >
      <Button variant="outlined" color="error" className='button' >
      Update
      </Button> 
      </CardActions>
    </Card>
  </div>
</div>
  )
}

export default ProfileSetting;
