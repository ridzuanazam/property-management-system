// AddRoomDialog.jsx (Premium UI)
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function AddRoomDialog({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    roomNo: "",
    floorLevel: "",
    roomType: "Small Room",
    totalBeds: "",
    size: "",
    status: "Available",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    // prevent negative numbers
    if (e.target.type === "number" && Number(value) < 0) {
      value = 0;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (!form.roomNo || !form.roomType)
      return alert("Please fill all required fields.");

    onSave(form);
    onClose();

    setForm({
      roomNo: "",
      floorLevel: "",
      roomType: "",
      totalBeds: "",
      size: "",
      status: "Available",
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 1,
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
        },
      }}
    >
      {/* HEADER */}
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: "1.5rem",
          pb: 1,
          px: 4,
          pt: 3,
        }}
      >
        Add New Room
      </DialogTitle>

      {/* SUBTEXT */}
      <Typography sx={{ px: 4, pb: 2, color: "gray" }}>
        Fill in the details below to add a new room to this property.
      </Typography>

      {/* CONTENT */}
      <DialogContent
        dividers
        sx={{
          backgroundColor: "#fafafa",
          borderRadius: 3,
          px: 4,
          py: 4,
        }}
      >
        <Grid container spacing={3}>
          {/* ROOM NO */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Room No."
              name="roomNo"
              fullWidth
              required
              value={form.roomNo}
              onChange={handleChange}
              sx={{ bgcolor: "white", borderRadius: 2 }}
            />
          </Grid>

          {/* FLOOR LEVEL */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Floor Level"
              name="floorLevel"
              fullWidth
              type="number"
              inputProps={{ min: 0 }}
              value={form.floorLevel}
              onChange={handleChange}
              sx={{ bgcolor: "white", borderRadius: 2 }}
            />
          </Grid>

          {/* ROOM TYPE */}
          <Grid item xs={12} md={4}>
            <FormControl
              fullWidth
              required
              sx={{ bgcolor: "white", borderRadius: 2 }}
            >
              <InputLabel>Room Type</InputLabel>
              <Select
                name="roomType"
                value={form.roomType}
                label="Room Type"
                onChange={handleChange}
              >
                <MenuItem value="Master Bedroom">Master Bedroom</MenuItem>
                <MenuItem value="Single Room">Single Room</MenuItem>
                <MenuItem value="Twin Sharing">Twin Sharing</MenuItem>
                <MenuItem value="Small Room">Small Room</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* TOTAL BEDS */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Total Beds"
              name="totalBeds"
              type="number"
              fullWidth
              inputProps={{ min: 0 }}
              value={form.totalBeds}
              onChange={handleChange}
              sx={{ bgcolor: "white", borderRadius: 2 }}
            />
          </Grid>

          {/* SIZE */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Size (m²)"
              name="size"
              type="number"
              fullWidth
              inputProps={{ min: 0 }}
              value={form.size}
              onChange={handleChange}
              sx={{ bgcolor: "white", borderRadius: 2 }}
            />
          </Grid>

          {/* STATUS */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth sx={{ bgcolor: "white", borderRadius: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={form.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Occupied">Occupied</MenuItem>
                <MenuItem value="Renovation">Renovation</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      {/* ACTION BUTTONS */}
      <DialogActions sx={{ px: 4, py: 3 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            borderColor: "black",
            color: "black",
            px: 3,
            py: 1,
            borderRadius: "10px",
            "&:hover": {
              borderColor: "black",
              backgroundColor: "#eee",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "black",
            color: "white",
            px: 4,
            py: 1.2,
            borderRadius: "10px",
            fontWeight: 600,
            boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Add Room
        </Button>
      </DialogActions>
    </Dialog>
  );
}
