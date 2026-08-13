// components/Layout.jsx
import { Box } from "@mui/material";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Avatar,
  Badge,
} from "@mui/material";

// icons imports
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import axios from "axios";
import { memo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SimpleDialog from "./Dashbord";
function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // user الحالي
  const [user, setUser] = useState(null);

  // كل اليوزرز
  const [users, setUsers] = useState([]);

  const fileInputRef = useRef(null);
  function Delete() {
    console.log("Delete clicked");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log("currentUser:", currentUser);
    if (!currentUser) return;
    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }
    console.log("User confirmed");
    axios
      .delete(`http://localhost:5000/users/${currentUser.id}`)
      .then(() => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("isLoggedIn");
        navigate("/");
      })
      .catch((error) => console.log(error));
  }
  // Logout
  function Logout() {
    localStorage.setItem("isLoggedIn", "false");

    navigate("/");
  }
  // غلق الـ Dialog
  const handleClose = (value) => {
    setOpen(false);
  };
  // فتح الـ Dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // فتح اختيار الصورة
  // function handleOpenFile() {
  //   fileInputRef.current.click();
  // }

  // // تغيير الصورة
  // function handleFileChange(e) {
  //   console.log("Selected file:", e);
  //   const file = e.target.files[0];

  //   if (!file) return;

  //   const reader = new FileReader();

  //   reader.onload = (event) => {
  //     const img = new Image();

  //     img.src = event.target.result;

  //     img.onload = async () => {
  //       // إنشاء canvas
  //       const canvas = document.createElement("canvas");

  //       const MAX_WIDTH = 200;

  //       const scaleSize = MAX_WIDTH / img.width;

  //       canvas.width = MAX_WIDTH;
  //       canvas.height = img.height * scaleSize;

  //       const ctx = canvas.getContext("2d");

  //       // رسم الصورة بحجم أصغر
  //       ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  //       // تحويلها لـ base64 مضغوط
  //       const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);

  //       const updatedUser = {
  //         ...user,
  //         image: compressedBase64,
  //       };

  //       // تحديث اليوزر الحالي
  //       setUser(updatedUser);

  //       // تحديث localStorage
  //       localStorage.setItem("currentUser", JSON.stringify(updatedUser));

  //       // تحديث users
  //       setUsers((prev) =>
  //         prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
  //       );

  //       // تحديث db.json
  //       try {
  //         await axios.patch(`http://localhost:5000/users/${user.id}`, {
  //           image: compressedBase64,
  //         });

  //         console.log("Image Saved ✅");
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //   };

  //   reader.readAsDataURL(file);
  // }
  // فتح اختيار الصورة
  function handleOpenFile() {
    fileInputRef.current.click();
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "0vh",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        gap: "30px",
        paddingTop: "80px",
      }}
    >
      {/* hidden file input */}
      <input
        type="file"
        accept=".png,.jpg,.jpeg"
        ref={fileInputRef}
        style={{ display: "none" }}
        // onChange={handleFileChange}
      />

      {/* Navbar */}
      <AppBar position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Dashboard</Typography>

          <div>
            {/* Delete */}
            <Tooltip title="Delete">
              <IconButton onClick={Delete} sx={{ color: "red" }}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>

            {/* Logout */}
            <Tooltip title="Logout">
              <IconButton onClick={Logout}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>

            {/* Avatar */}
            <Tooltip title={user?.userName}>
              <IconButton>
                <Badge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={
                    !user?.image && (
                      <AddAPhotoIcon
                        sx={{ color: "#fff" }}
                        onClick={(e) => {
                          e.stopPropagation();

                          handleOpenFile();
                        }}
                      />
                    )
                  }
                >
                  <Avatar
                    src={user?.image || ""}
                    sx={{
                      bgcolor: "#0097a7",
                      width: 40,
                      height: 40,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();

                      handleClickOpen();
                    }}
                  >
                    {!user?.image &&
                      user?.userName
                        ?.split(" ")
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                  </Avatar>
                </Badge>
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>

      {/* Hello */}
      {/* <h1
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        Hello{" "}
        {user?.userName
          ?.split(" ")
          .map((n) => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase())
          .join(" ")}{" "}
        👋
      </h1> */}

      {/* Dialog */}
      <SimpleDialog
        open={open}
        onClose={handleClose}
        users={users}
        user={user}
        setUser={setUser}
        setUsers={setUsers}
      />
    </Box>
  );
}
export default memo(Navbar);
