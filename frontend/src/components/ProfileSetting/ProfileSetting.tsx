import React from "react";
import "./ProfileSetting.scss";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Footer from "../Footer/Footer";
import Navbar from "../NavBar/NavBar";

const ProfileSetting = () => {
  const [image, setImage] = React.useState(localStorage.getItem('picture'));
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.substring(0, 5) === "image") {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    } else {
      setImage("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="main-profile-div">
        <div className="profile-container">
          <div className="top-part">
            <div className="user-profile-bg-image">
              <img id="prf-bg-img" src="Image/SALT.jpg" alt="salt" />
            </div>
            <div className="user-profile-image">
              <img id="prf-img" src={image!} alt="" srcSet="" />
              <input
                type="file"
                accept="/image/*"
                onChange={handleFileChange}
                className="file-upload"
              />
            </div>
          </div>
          <Card sx={{ marginTop: "4px" }}>
            <CardContent className="CardContent">
              <TextField
                className="TextField"
                required
                id="outlined-required"
                label="Name"
                defaultValue={localStorage.getItem('name')}
                color="warning"
              />
              <TextField
                className="TextField"
                required
                id="outlined-required"
                label="Last name"
                defaultValue={localStorage.getItem('lastName')}
                color="warning"
              />
              <TextField
                className="TextField"
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                color="warning"
              />
              <TextField
                className="TextField"
                disabled
                id="outlined-disabled"
                label="BootCamp"
                defaultValue="JavaScript-fullStack-Winter"
                color="warning"
              />
              <TextField
                className="TextField"
                disabled
                id="outlined-disabled"
                label="GroupName"
                defaultValue="Pasta"
              />
              <TextField
                className="TextField"
                disabled
                id="outlined-disabled"
                label="Instructors"
                defaultValue="Wietse,Dasha"
              />
              <TextField
                className="TextField"
                disabled
                id="outlined-disabled"
                label="MobMembers"
                defaultValue="Rob,Ariano"
                color="warning"
              />
            </CardContent>
            <CardActions className="button-container">
              <Button variant="outlined" color="error" className="button">
                Update
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileSetting;
