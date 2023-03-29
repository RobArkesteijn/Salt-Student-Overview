import React from "react";
import './Login.scss';
import { TypeAnimation } from "react-type-animation";
import { styled, TextField, Button } from "@mui/material";
import { signInWithGoogle } from "../../firebase";
import GoogleButton from "react-google-button"

const CssTextField = styled(TextField) ({
  '& label.Mui-focused': {
    color: "black",
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: "#ff7961",
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: "black",
    },
    '&.Mui-focused fieldset': {
      borderColor: "#ff7961",
    },
  },
});

const LoginButton = styled(Button) ({
  "&.MuiButton-root": {
    backgroundColor: "#ff7961"
  },
  "&.MuiButton-text": {
    color: "white"
  },
});

const Login = () => {
  const ref = React.createRef<HTMLSpanElement>();
  const CURSOR_CLASS_NAME = 'custom-type-animation-cursor';

  const showCursorAnimation = (show: boolean) => {
    if (!ref.current) {
      return;
    }
    
    const el = ref.current;

    if (show) {
      el.classList.add(CURSOR_CLASS_NAME);
    } else {
      el.classList.remove(CURSOR_CLASS_NAME);
    }
  };

  return (
    <div className='content'>
      <TypeAnimation
        ref={ref} 
        cursor={false}
        className={CURSOR_CLASS_NAME}
        sequence={[
          '<',
          100,
          '</',
          50,
          '</slat',
          200,
          '</salt',
          500,
          '</salt>',
          () => showCursorAnimation(false)
        ]}
        speed={1}
        style={{
          fontSize: '6em',
        }}
      />

      <h1 className='title'>Student Overview</h1>
      <br />
      <div className='login'>
        <GoogleButton
        onClick={signInWithGoogle}
        style={{backgroundColor: '#ff7961'}}
        />
      </div>
      <br />
    </div>
  );
};

export default Login;