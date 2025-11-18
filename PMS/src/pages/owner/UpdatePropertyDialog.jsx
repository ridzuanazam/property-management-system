// UpdatePropertyDialog.jsx
import React, { useEffect, useState } from "react";
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
  Box,
  Avatar,
  IconButton,
  Stack,
  Divider,
  Tooltip,
  Typography,
  Chip,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useProperties } from "./PropertyContext";

const facilitiesOptions = [
  "Free WIFI",
  "Gym",
  "Parking Space",
  "Washing Machine",
  "Air conditioning",
  "Swimming Pool",
  "Security guard",
  "BBQ area",
  "Playground",
  "Sauna",
  "Cafe",
  "Private Garden",
  "Sky Deck",
  "Lounge",
  "Private Lift",
];

export default function UpdatePropertyDialog({
  open,
  onClose,
  property,
  onSave, // optional — parent handler
}) {
  const navigate = useNavigate();
  const { updateProperty, deleteProperty } = useProperties();

  const emptyForm = {
    unitName: "",
    address: "",
    unitType: "",
    city: "",
    rentingType: "",
    state: "",
    postcode: "",
    sizeSqft: "",
    floorLevel: "",
    totalBathroom: "",
    status: "",
    facilities: [],
    // photo stored as array to be consistent with AddProperty
    photo: [],
  };

  const [form, setForm] = useState(emptyForm);
  const [previewUrl, setPreviewUrl] = useState(null); // preview for single photo

  // Sync incoming property -> form
  useEffect(() => {
    if (!property) {
      setForm(emptyForm);
      setPreviewUrl(null);
      return;
    }

    const merged = { ...emptyForm, ...property };

    merged.unitType = merged.unitType?.trim();

    // Normalize facilities to match dropdown
    merged.facilities = (merged.facilities || []).map((f) => f.trim());

    // FIX 2 — normalize status text
    if (merged.status) merged.status = merged.status.trim();

    // Set form
    setForm(merged);

    // FIX 4 — photo preview logic
    if (merged.photo && merged.photo.length > 0) {
      const p = merged.photo[0];
      if (typeof p === "string") {
        setPreviewUrl(p);
      } else {
        const blobUrl = URL.createObjectURL(p);
        setPreviewUrl(blobUrl);
      }
    } else {
      setPreviewUrl(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property]);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Keep dialog silent when closed
  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleFacilitiesChange = (e) => {
    const { value } = e.target;
    setForm((s) => ({
      ...s,
      facilities: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handlePhotoReplace = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // update preview and set as single-photo array
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setForm((s) => ({ ...s, photo: file }));
  };

  const handlePhotoRemove = () => {
    // remove current photo
    setPreviewUrl(null);
    setForm((s) => ({ ...s, photo: [] }));
  };

  const handleDelete = async () => {
    if (!property?.id) {
      alert("Property id missing. Cannot delete.");
      return;
    }
    const ok = window.confirm(
      `Delete property "${property.unitName}"? This will permanently remove the property and its rooms.`
    );
    if (!ok) return;

    // call context delete
    try {
      deleteProperty(property.id);
    } catch (err) {
      // still navigate back to list so UX isn't stuck
      console.error("Error deleting property:", err);
    }
    // close dialog and navigate back to list
    onClose?.();
    navigate("/owner/properties");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Normalize numeric fields if they are strings
    const normalized = {
      ...form,
      floorLevel:
        form.floorLevel === "" ? 0 : Number(form.floorLevel) || form.floorLevel,
      sizeSqft:
        form.sizeSqft === "" ? 0 : Number(form.sizeSqft) || form.sizeSqft,
      totalBathroom:
        form.totalBathroom === ""
          ? 0
          : Number(form.totalBathroom) || form.totalBathroom,
      postcode: form.postcode === "" ? "" : form.postcode,
    };

    // prefer provided onSave (parent), otherwise use context directly
    if (onSave && typeof onSave === "function") {
      onSave(normalized);
    } else {
      if (property?.id) {
        updateProperty(property.id, normalized);
      }
    }

    onClose?.();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle sx={{ fontWeight: 700 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <EditIcon />
          <Box>
            <Typography variant="h6">Edit Property</Typography>
            <Typography variant="body2" color="text.secondary">
              Update details, replace main photo, or delete this property.
            </Typography>
          </Box>
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-x-8 gap-y-4"
        >
          {/* LEFT COLUMN */}
          <div>
            <TextField
              label="Unit Name"
              name="unitName"
              fullWidth
              required
              value={form.unitName || ""}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Address"
              name="address"
              fullWidth
              required
              value={form.address || ""}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth required sx={{ mb: 2 }}>
              <InputLabel>Unit Type</InputLabel>
              <Select
                name="unitType"
                label="Unit Type"
                value={form.unitType || ""}
                onChange={handleChange}
              >
                <MenuItem value="Landed House">Landed House</MenuItem>
                <MenuItem value="Apartment">Apartment</MenuItem>
                <MenuItem value="Condominium">Condominium</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="City"
              name="city"
              fullWidth
              required
              value={form.city || ""}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth required sx={{ mb: 2 }}>
              <InputLabel>Renting Type</InputLabel>
              <Select
                name="rentingType"
                label="Renting Type"
                value={form.rentingType || ""}
                onChange={handleChange}
              >
                <MenuItem value="Whole House">Whole House</MenuItem>
                <MenuItem value="By Rooms">By Rooms</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="State"
              name="state"
              fullWidth
              required
              value={form.state || ""}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Size (sqft)"
              name="sizeSqft"
              fullWidth
              required
              type="number"
              value={form.sizeSqft ?? ""}
              onChange={handleChange}
              sx={{ mb: 2 }}
              inputProps={{ min: 0 }}
            />
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <TextField
              label="Postcode"
              name="postcode"
              fullWidth
              required
              value={form.postcode ?? ""}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            <TextField
              label="Floor Level"
              name="floorLevel"
              fullWidth
              required
              type="number"
              value={form.floorLevel ?? ""}
              onChange={handleChange}
              sx={{ mb: 2 }}
              inputProps={{ min: 0 }}
            />

            <TextField
              label="Total Bathroom"
              name="totalBathroom"
              fullWidth
              required
              type="number"
              value={form.totalBathroom ?? ""}
              onChange={handleChange}
              sx={{ mb: 2 }}
              inputProps={{ min: 0 }}
            />

            <FormControl fullWidth required sx={{ mb: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                label="Status"
                value={form.status || ""}
                onChange={handleChange}
              >
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Renovation">Renovation</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>

            {/* Photo preview + upload */}
            <Box sx={{ mt: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Main Photo
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  variant="rounded"
                  alt={form.unitName || "property"}
                  src={previewUrl || ""}
                  sx={{ width: 120, height: 90, bgcolor: "#f3f3f3" }}
                >
                  {!previewUrl && (
                    <Box sx={{ p: 1, textAlign: "center" }}>
                      <PhotoCameraIcon />
                      <Typography variant="caption" display="block">
                        No photo
                      </Typography>
                    </Box>
                  )}
                </Avatar>

                <Stack spacing={1}>
                  <label htmlFor="photo-upload">
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoReplace}
                      style={{ display: "none" }}
                    />
                    <Button
                      component="span"
                      variant="outlined"
                      startIcon={<PhotoCameraIcon />}
                      size="small"
                    >
                      Replace Photo
                    </Button>
                  </label>

                  <Tooltip title="Remove photo">
                    <Button
                      variant="text"
                      color="error"
                      startIcon={<DeleteForeverIcon />}
                      size="small"
                      onClick={handlePhotoRemove}
                    >
                      Remove
                    </Button>
                  </Tooltip>

                  <Typography variant="caption" color="text.secondary">
                    Recommended: JPG/PNG. Max 5MB.
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </div>

          {/* full width row: facilities (simple comma separated) */}
          <div className="col-span-1">
            <FormControl fullWidth>
              <InputLabel>Facilities</InputLabel>
              <Select
                multiple
                name="facilities"
                value={form.facilities || []}
                onChange={handleFacilitiesChange}
                renderValue={(selected) => (
                  <div className="flex flex-wrap gap-1">
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </div>
                )}
              >
                {facilitiesOptions.map((f, i) => (
                  <MenuItem key={i} value={f}>
                    {f}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="caption" color="text.secondary">
                Select all facilities available
              </Typography>
            </FormControl>
          </div>

          {/* actions row */}
          <div className="col-span-2" style={{ marginTop: 16 }}>
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteForeverIcon />}
                  onClick={handleDelete}
                >
                  Delete Property
                </Button>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Button variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Save Changes
                </Button>
              </Stack>
            </Stack>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
