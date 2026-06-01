import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

export default function CustomPopup({ open, onClose, title, message }) {
  return (
  <Dialog
  open={open}
  onClose={onClose}
  PaperProps={{
    sx: {
      borderRadius: "20px",
      padding: "15px",
      minWidth: "360px",
      background: "linear-gradient(135deg, #ffffff, #f5f7fa)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      textAlign: "center",
      animation: "fadeIn 0.3s ease-in-out",
    },
  }}
>
    <DialogTitle
  sx={{
    fontWeight: "bold",
    fontSize: "20px",
    color: "#d32f2f",
    letterSpacing: "1px",
  }}
>
  {title}
</DialogTitle>

    <DialogContent>
  <Typography
    sx={{
      textAlign: "center",
      fontSize: "15px",
      color: "#555",
      lineHeight: "1.6",
      paddingX: "10px",
    }}
  >
    {message}
  </Typography>
</DialogContent>

     <DialogActions
  sx={{
    justifyContent: "center",
    paddingBottom: "15px",
  }}
>
  <Button
    onClick={onClose}
    variant="contained"
    sx={{
      borderRadius: "25px",
      paddingX: "30px",
      fontWeight: "bold",
      textTransform: "none",
      background: "linear-gradient(135deg, #1976d2, #42a5f5)",
      transition: "0.3s",
      "&:hover": {
        background: "linear-gradient(135deg, #1565c0, #1e88e5)",
        transform: "scale(1.05)",
      },
    }}
  >
    OK
  </Button>
</DialogActions>
    </Dialog>
  );
}