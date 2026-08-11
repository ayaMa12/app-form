// Dashbord.jsx
import { Box } from "@mui/material";
import axios from "axios";
import { memo, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Material UI imports
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

// Dialog imports
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import { useLocation } from "react-router-dom";
// ✅ Dialog Component
function SimpleDialog({ onClose, open, users, user, setUser, setUsers }) {
  // console.log("Avatar users", users);
  const [selectedUser, setSelectedUser] = useState(null);
  console.log("selectedUser", selectedUser);
  // const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const handleSelect = (user) => {
    onClose(user);
  };
  function switchAccount() {
    localStorage.removeItem("currentUser");
    localStorage.setItem("isLoggedIn", "false");
    navigate("/login");
  }
  // فتح اختيار الصورة
  // function handleOpenFile() {
  //   fileInputRef.current.click();
  // }

  // تغيير الصورة
  // function handleFileChange(e) {
  //   // console.log("Selected file:", e);
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
  //         ...selectedUser,
  //         image: compressedBase64,
  //       };

  //       // تحديث كل اليوزرز دايمًا
  //       setUsers((prev) =>
  //         prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
  //       );

  //       // لو المستخدم الحالي هو اللي اتغير
  //       if (selectedUser.id === user?.id) {
  //         setUser(updatedUser);

  //         localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  //       }
  //       // تحديث db.json

  //       if (selectedUser?.id) {
  //         try {
  //           await axios.patch(
  //             `http://localhost:5000/users/${selectedUser.id}`,
  //             {
  //               image: compressedBase64,
  //             },
  //           );
  //         } catch (err) {
  //           console.log(err);
  //         }
  //       }
  //     };
  //   };

  //   reader.readAsDataURL(file);
  // }

  return (
    <>
      {/* hidden file input */}
      {/* <input
        type="file"
        accept=".png,.jpg,.jpeg"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />*/}
      <Dialog onClose={() => onClose(null)} open={open}>
        <DialogTitle>Set backup account</DialogTitle>

        <List>
          {users.map((user) => (
            <ListItem disablePadding key={user.id}>
              <ListItemButton
                onClick={() => {
                  handleSelect(user);
                }}
              >
                <ListItemAvatar>
                  <Tooltip title={user?.userName}>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();

                        setSelectedUser(user);

                        // setTimeout(() => {
                        //     handleOpenFile();
                        // }, 0);
                      }}
                    >
                      <Badge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        // badgeContent={<AddAPhotoIcon />}
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
                </ListItemAvatar>
                <ListItemText
                  primary={user.email}
                  secondary={user.userName
                    ?.split(" ")
                    .map(
                      (n) =>
                        n.charAt(0).toUpperCase() + n.slice(1).toLowerCase(),
                    )
                    .join(" ")}
                />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                onClose(null);
                switchAccount();
              }}
            >
              {" "}
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Add account" />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    </>
  );
}

// ✅ Main Component
function Dashbord() {
  const location = useLocation();
  console.log("location", location.state);

  const state = location.state?.user;

  // user الحالي
  const [user, setUser] = useState(state);

  // كل اليوزرز
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [open, setOpen] = useState(false);

  // console.log("Current User", user);
  // console.log("All Users", users);

  // فتح الـ Dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // غلق الـ Dialog
  const handleClose = (value) => {
    setOpen(false);

    if (value) {
      setUser(value);
      console.log("value", value);
      localStorage.setItem("currentUser", JSON.stringify(value));
    }

    // console.log("Selected User:", value);
  };

  // جلب اليوزر الحالي
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (currentUser && isLoggedIn === "true") {
      setUser(currentUser);
    } else {
      navigate("/");
    }
  }, [navigate]);

  // جلب كل اليوزرز
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => setUsers(res.data))
      .catch(console.log);
  }, []);

  // حذف الحساب
  function Delete() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      axios
        .delete(`http://localhost:5000/users/${currentUser.id}`)
        .then(() => {
          localStorage.removeItem("currentUser");
          localStorage.removeItem("isLoggedIn");

          navigate("/");
        })
        .catch(console.log);
    }
  }

  // Logout
  function Logout() {
    localStorage.setItem("isLoggedIn", "false");

    navigate("/");
  }

  // فتح اختيار الصورة
  function handleOpenFile() {
    fileInputRef.current.click();
  }

  // تغيير الصورة
  function handleFileChange(e) {
    console.log("Selected file:", e);
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.src = event.target.result;

      img.onload = async () => {
        // إنشاء canvas
        const canvas = document.createElement("canvas");

        const MAX_WIDTH = 200;

        const scaleSize = MAX_WIDTH / img.width;

        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext("2d");

        // رسم الصورة بحجم أصغر
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // تحويلها لـ base64 مضغوط
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);

        const updatedUser = {
          ...user,
          image: compressedBase64,
        };

        // تحديث اليوزر الحالي
        setUser(updatedUser);

        // تحديث localStorage
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        // تحديث users
        setUsers((prev) =>
          prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
        );

        // تحديث db.json
        try {
          await axios.patch(`http://localhost:5000/users/${user.id}`, {
            image: compressedBase64,
          });

          console.log("Image Saved ✅");
        } catch (err) {
          console.log(err);
        }
      };
    };

    reader.readAsDataURL(file);
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
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
        onChange={handleFileChange}
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
                    
                      <AddAPhotoIcon
                        sx={{ color: "#fff" }}
                        onClick={(e) => {
                          e.stopPropagation();

                          handleOpenFile();
                        }}
                      />
                    
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
      <h1
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
      </h1>

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

export default memo(Dashbord);
