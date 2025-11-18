// UpdateRoomDialog.jsx
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
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function UpdateRoomDialog({ open, onClose, room, onUpdate }) {
  // Capitalize first letter
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  // Initialize state lazily using room prop
  const [form, setForm] = useState(() => ({
    id: room?.id ?? null,
    roomNo: room?.roomNo ?? "",
    floorLevel: room?.floorLevel ?? 0,
    roomType: room?.roomType ?? "",
    totalBeds: room?.totalBeds ?? 0,
    size: room?.size ?? 0,
    status: capitalize(room?.status ?? "Available"),
  }));

  // Update form if room changes while dialog is open
  useEffect(() => {
    if (!room) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm({
      id: room.id ?? null,
      roomNo: room.roomNo ?? "",
      floorLevel: room.floorLevel ?? 0,
      roomType: room.roomType ?? "",
      totalBeds: room.totalBeds ?? 0,
      size: room.size ?? 0,
      status: capitalize(room.status ?? "Available"),
    });
  }, [room]);

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Convert numbers and prevent negative
    if (e.target.type === "number")
      value = Number(value) < 0 ? 0 : Number(value);

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (!form.roomNo || !form.roomType)
      return alert("Please fill all required fields.");
    onUpdate(form);
    handleClose();
  };

  const handleClose = () => {
    // Reset form
    setForm({
      id: null,
      roomNo: "",
      floorLevel: 0,
      roomType: "",
      totalBeds: 0,
      size: 0,
      status: "Available",
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
      {/* Header */}
      <DialogTitle
        sx={{ fontWeight: 700, fontSize: "1.5rem", pb: 1, px: 4, pt: 3 }}
      >
        Update Room
      </DialogTitle>
      <Typography sx={{ px: 4, pb: 2, color: "gray" }}>
        Update the details of this room.
      </Typography>

      {/* Content */}
      <DialogContent
        dividers
        sx={{ backgroundColor: "#fafafa", borderRadius: 3, px: 4, py: 4 }}
      >
        <Grid container spacing={3}>
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

          <Grid item xs={12} md={4}>
            <TextField
              label="Floor Level"
              name="floorLevel"
              type="number"
              fullWidth
              inputProps={{ min: 0 }}
              value={form.floorLevel}
              onChange={handleChange}
              sx={{ bgcolor: "white", borderRadius: 2 }}
            />
          </Grid>

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
                onChange={handleChange}
                label="Room Type"
              >
                <MenuItem value="Master Bedroom">Master Bedroom</MenuItem>
                <MenuItem value="Single Room">Single Room</MenuItem>
                <MenuItem value="Twin Sharing">Twin Sharing</MenuItem>
                <MenuItem value="Small Room">Small Room</MenuItem>
              </Select>
            </FormControl>
          </Grid>

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

          <Grid item xs={12} md={4}>
            <FormControl fullWidth sx={{ bgcolor: "white", borderRadius: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={form.status}
                onChange={handleChange}
                label="Status"
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

      {/* Actions */}
      <DialogActions sx={{ px: 4, py: 3 }}>
        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{
            borderColor: "black",
            color: "black",
            px: 3,
            py: 1,
            borderRadius: "10px",
            "&:hover": { borderColor: "black", backgroundColor: "#eee" },
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
            "&:hover": { backgroundColor: "#333" },
          }}
        >
          Update Room
        </Button>
      </DialogActions>
    </Dialog>
  );
}
