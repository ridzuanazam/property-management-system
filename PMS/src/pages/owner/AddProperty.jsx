import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useProperties } from "./PropertyContext";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Chip,
  OutlinedInput,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
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

export default function AddProperty() {
  const { addProperty } = useProperties();
  /* -------------------- PROPERTY STATE -------------------- */
  const [property, setProperty] = useState({
    unitName: "",
    unitType: "",
    rentingType: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    sizeSqft: "",
    floorLevel: "",
    totalBathroom: "",
    status: "",
    facilities: [],
    photo: [],
  });

  /* -------------------- ROOM STATE -------------------- */
  const [roomForm, setRoomForm] = useState({
    roomNo: "",
    floorLevel: "",
    type: "",
    totalBeds: "",
    size: "",
    status: "available",
  });

  const [rooms, setRooms] = useState([]);

  /* -------------------- FORM HANDLERS -------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleFacilitiesChange = (event) => {
    const { value } = event.target;
    setProperty({
      ...property,
      facilities: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setProperty({ ...property, photo: files });
  };

  const handleDeletePhoto = (index) => {
    const updated = property.photo.filter((_, i) => i !== index);
    setProperty({ ...property, photo: updated });
  };

  /* -------------------- ROOM HANDLERS -------------------- */
  const handleRoomChange = (e) => {
    const { name, value } = e.target;
    setRoomForm({ ...roomForm, [name]: value });
  };

  const handleAddRoom = () => {
    if (!roomForm.roomNo || !roomForm.type) {
      alert("Please fill required fields: Room No & Room Type.");
      return;
    }

    setRooms([...rooms, { id: rooms.length + 1, ...roomForm }]);

    setRoomForm({
      roomNo: "",
      floorLevel: "",
      type: "",
      totalBeds: "",
      size: "",
      status: "available",
    });
  };

  const handleDeleteRoom = (id) => {
    setRooms(rooms.filter((room) => room.id !== id));
  };

  /* -------------------- VALIDATION -------------------- */
  const preventMinus = (e) => {
    if (e.key === "-" || e.key === "e") {
      e.preventDefault();
    }
  };

  const isFormValid = () => {
    const requiredFields = [
      "unitName",
      "unitType",
      "rentingType",
      "address",
      "city",
      "state",
      "postcode",
      "sizeSqft",
      "floorLevel",
      "totalBathroom",
      "status",
    ];

    const allFieldsFilled = requiredFields.every(
      (field) => property[field] && property[field] !== ""
    );

    const hasPhoto = property.photo.length > 0;
    const hasRoom = rooms.length > 0;

    return allFieldsFilled && hasPhoto && hasRoom;
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert(
        "Please fill all required fields, upload a photo, and add at least 1 room."
      );
      return;
    }

    const newProperty = { ...property, rooms: rooms };

    // SAVE PROPERTY TO CONTEXT
    addProperty(newProperty);

    // Navigate to Next Page
    navigate("/owner/properties");

    console.log("Submitting Property:", property);
    console.log("Rooms:", rooms);
  };

  /* -------------------- ROOM TABLE COLUMNS -------------------- */
  const roomColumns = [
    { field: "roomNo", headerName: "Room No", flex: 1 },
    { field: "floorLevel", headerName: "Floor", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "totalBeds", headerName: "Beds", flex: 1 },
    { field: "size", headerName: "Size (m²)", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <span className="capitalize">{params.row.status}</span>
      ),
    },
    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="text"
          color="error"
          onClick={() => handleDeleteRoom(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  /* ==============================================================
     RENDER
  ============================================================== */
  return (
    <div className="h-full px-10 pt-10">
      {/* HEADER */}
      <div className="mb-5">
        <div className="flex gap-2">
          <Link
            to="/owner/properties"
            className="text-gray-400 text-lg hover:underline"
          >
            Properties
          </Link>
          <span className="text-gray-400 text-lg">/</span>
          <span className="text-gray-500 text-lg font-medium">
            Add New Property
          </span>
        </div>
      </div>

      {/* MAIN CARD */}
      <Paper elevation={2} className="p-10">
        <div className="flex justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Add New Property Unit</h2>
            <p className="text-gray-500 text-sm mt-3">
              Register new property unit here. Click next when you're done.
            </p>
          </div>
          <Link
            to="/owner/properties"
            className="text-gray-400 text-lg hover:underline"
          >
            <CloseIcon />
          </Link>
        </div>

        {/* PROPERTY FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-x-20 gap-y-10"
        >
          <TextField
            label="Unit Name"
            name="unitName"
            fullWidth
            required
            value={property.unitName}
            onChange={handleChange}
          />
          <TextField
            label="Address"
            name="address"
            fullWidth
            required
            value={property.address}
            onChange={handleChange}
          />

          <FormControl fullWidth required>
            <InputLabel>Unit Type</InputLabel>
            <Select
              name="unitType"
              label="Unit Type"
              value={property.unitType}
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
            value={property.city}
            onChange={handleChange}
          />

          <FormControl fullWidth required>
            <InputLabel>Renting Type</InputLabel>
            <Select
              name="rentingType"
              label="Renting Type"
              value={property.rentType}
              onChange={handleChange}
            >
              <MenuItem value="whole">Whole House</MenuItem>
              <MenuItem value="rooms">By Rooms</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="State"
            name="state"
            fullWidth
            required
            value={property.state}
            onChange={handleChange}
          />
          <TextField
            label="Size (sqft)"
            name="sizeSqft"
            fullWidth
            required
            type="number"
            inputProps={{ min: 0 }}
            onKeyDown={preventMinus}
            value={property.sizeSqft}
            onChange={handleChange}
          />
          <TextField
            label="Postcode"
            name="postcode"
            fullWidth
            required
            inputProps={{ min: 0 }}
            onKeyDown={preventMinus}
            value={property.postcode}
            onChange={handleChange}
          />
          <TextField
            label="Floor Level"
            name="floorLevel"
            fullWidth
            required
            type="number"
            inputProps={{ min: 0 }}
            onKeyDown={preventMinus}
            value={property.floorLevel}
            onChange={handleChange}
          />
          <TextField
            label="Total Bathrooms"
            name="totalBathroom"
            fullWidth
            required
            type="number"
            inputProps={{ min: 0 }}
            onKeyDown={preventMinus}
            value={property.totalBathrooms}
            onChange={handleChange}
          />

          <FormControl fullWidth required>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              label="Status"
              value={property.status}
              onChange={handleChange}
            >
              <MenuItem value="Available">Available</MenuItem>

              <MenuItem value="Renovation">Renovation</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          {/* Facilities */}
          <FormControl fullWidth>
            <InputLabel>Facilities</InputLabel>
            <Select
              multiple
              input={<OutlinedInput label="Facilities" />}
              value={property.facilities}
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
          </FormControl>

          {/* Photos */}
          <div className="col-span-2">
            <p className="font-medium mb-2">Property Image (1 Photo)</p>
            <div className="flex gap-4 items-center">
              {property.photo.map((photo, idx) => (
                <div
                  key={idx}
                  className="relative w-24 h-24 border rounded overflow-hidden"
                >
                  <img
                    src={URL.createObjectURL(photo)}
                    className="object-cover w-full h-full"
                  />
                  <button
                    onClick={() => handleDeletePhoto(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded flex justify-center items-center cursor-pointer text-gray-400">
                +
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* NEXT BUTTON */}
          <div className="col-span-2 flex justify-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={!isFormValid()}
            >
              Add New Property
            </Button>
          </div>
        </form>

        {/* -------------------- ROOM SECTION -------------------- */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-6">Add New Room</h3>

          {/* ROOM FORM */}
          <Paper elevation={1} className="p-6 grid grid-cols-5 gap-6 mb-10">
            <TextField
              label="Room No."
              name="roomNo"
              value={roomForm.roomNo}
              onChange={handleRoomChange}
              fullWidth
              required
            />
            <TextField
              label="Floor Level"
              name="floorLevel"
              type="number"
              inputProps={{ min: 0 }}
              onKeyDown={preventMinus}
              value={roomForm.floorLevel}
              onChange={handleRoomChange}
              fullWidth
            />
            <FormControl fullWidth required>
              <InputLabel>Room Type</InputLabel>
              <Select
                label="Room Type"
                name="type"
                value={roomForm.type}
                onChange={handleRoomChange}
              >
                <MenuItem value="Master Bedroom">Master Bedroom</MenuItem>
                <MenuItem value="Single Room">Single Room</MenuItem>
                <MenuItem value="Twin Sharing">Twin Sharing</MenuItem>
                <MenuItem value="Small Room">Small Room</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Total Beds"
              name="totalBeds"
              type="number"
              inputProps={{ min: 0 }}
              onKeyDown={preventMinus}
              value={roomForm.totalBeds}
              onChange={handleRoomChange}
              fullWidth
            />
            <TextField
              label="Size (m²)"
              name="size"
              type="number"
              inputProps={{ min: 0 }}
              onKeyDown={preventMinus}
              value={roomForm.size}
              onChange={handleRoomChange}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                label="Status"
                value={roomForm.status}
                onChange={handleRoomChange}
              >
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="occupied">Occupied</MenuItem>
                <MenuItem value="renovation">Renovation</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>

            <div className="col-span-5 flex justify-end">
              <Button variant="contained" color="info" onClick={handleAddRoom}>
                Add Room
              </Button>
            </div>
          </Paper>

          {/* ROOM TABLE */}
          {rooms.length > 0 && (
            <Paper elevation={1} className="p-4">
              <h4 className="text-lg font-medium mb-3">Added Rooms</h4>
              <div style={{ height: 400 }}>
                <DataGrid
                  rows={rooms}
                  columns={roomColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "#fff",
                  }}
                />
              </div>
            </Paper>
          )}
        </div>
      </Paper>
    </div>
  );
}
