import React, {useState, useEffect} from "react";
import "./ProfileSetting.scss";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Footer from "../Footer/Footer";
import Navbar from "../NavBar/NavBar";
import axios from "axios";

type UserData = {
  id: number,
  email: string,
  first_name: string,
  last_name:string,
  Role:string,
  mob_id:number,
  course_id:number,
};

type MobUsers = {
  id: number,
  email: string,
  first_name: string,
  last_name:string,
  Role:string,
  mob_name: string,
  mob_id: number
};

const ProfileSetting = () => {
  const [image, setImage] = useState(localStorage.getItem('picture'));
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.substring(0, 5) === "image") {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    } else {
      setImage("");
    }
  };

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobNumber, setMobNumber] = useState('');
  const [mobName, setMobName] = useState('');
  const [momMembers, setMobMembers] = useState([]);
  const [courseNumber, setCourseNumber] = useState('');
  const [courseName, setCourseName] = useState('');

  useEffect(() => {
    async function getUserData() {
      axios.get('http://localhost:8080/api/users')
        .then((data) => {
          const user = data.data.filter((user: UserData) => {
            return user.email === localStorage.getItem('email');
          });
          setName(user[0].first_name);
          setLastName(user[0].last_name);
          setEmail(user[0].email);
          setMobNumber(user[0].mob_id);
          setCourseNumber(user[0].course_id);
        })
    }
    getUserData();
  }, []);

  useEffect(() => {
    async function getMobData() {
      if (mobNumber !== '') {
        axios.get(`http://localhost:8080/api/mobusers/${mobNumber}`)
        .then((data) => {
          const mobMembers = data.data.map((member: MobUsers) => {
            return `${member.first_name} ${member.last_name}`;
          })
          setMobName(data.data[0].mob_name);
          setMobMembers(mobMembers);
        })
      }
    };
    getMobData();
  }, [mobNumber]);

  useEffect(() => {
    async function getClassData() {
      if (courseNumber !== '') {
        axios.get(`http://localhost:8080/api/courseusers/${courseNumber}`)
        .then((data) => {
          setCourseName(data.data[0].name);
        })
      }
    }
    getClassData();
  }, [courseNumber])

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
              <input
                className="TextField"
                required
                id="outlined-required"
                defaultValue={name}
                color="warning"
              />
              <input
                className="TextField"
                required
                id="outlined-required"
                defaultValue={lastName}
                color="warning"
              />
              <input
                className="TextField"
                id="outlined-email-input"
                type="email"
                defaultValue={email}
                autoComplete="current-email"
                color="warning"
              />
              <input
                className="TextField"
                disabled
                id="outlined-disabled"
                defaultValue={courseName}
                color="warning"
              />
              <input
                className="TextField"
                disabled
                id="outlined-disabled"
                defaultValue={mobName}
              />
              <input
                className="TextField"
                disabled
                id="outlined-disabled"
                defaultValue="Wietse,Dasha"
              />
              <input
                className="TextField"
                disabled
                id="outlined-disabled"
                defaultValue={momMembers.join(' - ')}
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
