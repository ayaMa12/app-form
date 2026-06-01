import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ConfirmPass() {
  const [confirmPass, setConfirmPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Confirm Function
  function Confirm() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      alert("لا يوجد مستخدم مسجل");
      return;
    }

    if (currentUser.password === confirmPass) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      localStorage.setItem("isLoggedIn", "true");

      navigate("/Home", {
        state: { user: currentUser },
      });
    } else {
      alert("كلمة المرور غير صحيحة");
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        margin: "50px auto",
        gap: "20px ",
        padding: "20px",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextField
        fullWidth
        label="Confirm Password"
        type={showPassword ? "text" : "password"}
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            Confirm();
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <a href=" /ForgotPassword" style={{ color: "#1976d2" }}>
        Forgot Password?
      </a>
      <Button variant="contained" color="success" onClick={Confirm} fullWidth>
        Confirm Password
      </Button>
    </Box>
  );
}
