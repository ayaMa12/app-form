import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function LogIn() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://6a7f227b3183f5fd884ae93f.mockapi.io/api/v1/users")
      .then((res) => setUsers(res.data))
      .catch(console.log);
  }, []);

function Log() {
  console.log("users:", users);
  console.log("users length:", users.length);

  if (users.length === 0) {
    console.log("Going to Login");
    navigate("/Login");
  } else {
    console.log("Going to AllAccount");
    navigate("/AllAccount");
  }
}

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Circle 1 */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          top: "10%",
          left: "5%",
          filter: "blur(20px)",
        }}
      />

      {/* Circle 2 */}
      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          top: "20%",
          right: "10%",
          filter: "blur(15px)",
        }}
      />

      {/* Circle 3 */}
      <motion.div
        animate={{
          y: [0, -60, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          bottom: "-100px",
          left: "35%",
          filter: "blur(30px)",
        }}
      />

      {/* Circle 4 */}
      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          bottom: "100px",
          left: "35%",
          width: "100px",
          border: "2px solid red",
          height: "100px",
          borderRadius: "50%",
          filter: "blur(4px)",
        }}
      />
      {/* Circle 5 */}
      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          top: "100px",
          right: "35%",
          width: "50px",
          border: "2px solid yellow",
          height: "50px",
          borderRadius: "50%",
          filter: "blur(4px)",
        }}
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box
          sx={{
            background: "rgba(255,255,255,0.95)",
            padding: "40px",
            borderRadius: "20px",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,.2)",
            width: "350px",
            position: "relative",
            zIndex: 10,
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: "bold",
            }}
          >
            Welcome 👋
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: "gray",
            }}
          >
            Authentication System
          </Typography>

          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={Log}
              sx={{
                borderRadius: "12px",
                py: 1.2,
              }}
            >
              Login
            </Button>
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
}
