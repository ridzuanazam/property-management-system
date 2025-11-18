import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import UpdateRoomDialog from "./UpdateRoomDialog";
import AddRoomDialog from "./AddRoomDialog";
import UpdatePropertyDialog from "./UpdatePropertyDialog";
import { useProperties } from "./PropertyContext"; // Adjust path if needed

export default function PropertyDetails() {
  const { id } = useParams(); // property ID from route
  const { properties, updateProperty, addRoom, updateRoom, deleteRoom } =
    useProperties();

  const property = properties.find((p) => p.id === Number(id));

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [roomToUpdate, setRoomToUpdate] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  if (!property) return <p className="p-10">Property not found</p>;

  const statusColors = {
    Available: "bg-green-100 text-green-700",
    Occupied: "bg-purple-100 text-purple-600",
    Renovation: "bg-yellow-100 text-yellow-700",
    Inactive: "bg-red-100 text-red-600",
  };

  // ──────────────────────────────
  // ADD ROOM HANDLER
  // ──────────────────────────────
  const handleSaveRoom = (roomData) => {
    addRoom(property.id, roomData);
  };

  // ──────────────────────────────
  // DELETE ROOM HANDLER
  // ──────────────────────────────
  const handleDeleteClick = (room) => {
    setSelectedRoom(room);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    deleteRoom(property.id, selectedRoom.id);
    setDeleteOpen(false);
  };

  // ______________________________
  // UPDATE ROOM HANDLER
  // _____________________________
  const handleUpdateClick = (room) => {
    setRoomToUpdate(room);
    setOpenUpdateDialog(true);
  };

  const handleUpdateRoom = (updatedRoom) => {
    updateRoom(property.id, updatedRoom.id, updatedRoom);
  };
  // ______________________________
  // UPDATE PROPERTY HANDLER
  // _____________________________

  const handleUpdateProperty = (updatedData) => {
    updateProperty(property.id, updatedData);
  };
  // ──────────────────────────────
  // DATAGRID COLUMNS
  // ──────────────────────────────
  const columns = [
    { field: "roomNo", headerName: "Room No", flex: 1 },
    { field: "floorLevel", headerName: "Floor", flex: 1 },
    { field: "roomType", headerName: "Type", flex: 1 },
    { field: "totalBeds", headerName: "Beds", flex: 1 },
    { field: "size", headerName: "Size (m²)", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <span
          className={`capitalize px-3 py-1 rounded-full text-sm ${
            statusColors[params.row.status] || "bg-gray-200 text-gray-600"
          }`}
        >
          {params.row.status}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-3">
          <Button
            variant="outlined"
            size="small"
            color="info"
            onClick={() => handleUpdateClick(params.row)}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => handleDeleteClick(params.row)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="w-full bg-white shadow-md px-10 py-8">
        <div className="mb-6">
          <div className="flex gap-2">
            <Link
              to="/owner/properties"
              className="text-gray-400 text-lg hover:underline"
            >
              Properties
            </Link>
            <span className="text-gray-400 text-lg">/</span>
            <span className="text-gray-500 text-lg font-medium">
              {property.unitName}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-start">
          <div className="w-[50%]">
            {/* NAME */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={property.photo}
                className="w-15 h-15 rounded-full object-cover"
              />
              <h1 className="text-xl font-bold">{property.unitName}</h1>
            </div>

            {/* PROPERTY FACTS */}
            <div className="flex flex-wrap gap-6 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <LayersOutlinedIcon fontSize="small" />
                <span>
                  {property.floorLevel}{" "}
                  {property.floorLevel > 1 ? "Levels" : "Level"}{" "}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MeetingRoomOutlinedIcon fontSize="small" />
                <span>
                  {property.rooms.length}{" "}
                  {property.rooms.length > 1 ? "Rooms" : "Room"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ViewInArOutlinedIcon fontSize="small" />
                <span>{property.sizeSqft} sqft</span>
              </div>
              <div className="flex items-center gap-2">
                <BathtubOutlinedIcon fontSize="small" />
                <span>
                  {property.totalBathroom}{" "}
                  {property.totalBathroom > 1 ? "Bathrooms" : "Bathroom"}{" "}
                </span>
              </div>
            </div>

            {/* EXTRA DETAILS */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-10 text-gray-700 text-base">
              <p>
                <b>Unit Type:</b> {property.unitType}
              </p>

              <p>
                <b>Status: </b>
                <span
                  className={`px-3 py-1 rounded-full text-sm capitalize ${
                    statusColors[property.status] || "bg-gray-200 text-gray-600"
                  }`}
                >
                  {property.status}
                </span>
              </p>

              <p className="col-span-2">
                <b>Address:</b> <span className="ml-2">{property.address}</span>
              </p>

              <p>
                <b>Renting Type:</b> {property.rentingType}
              </p>

              <div className="col-span-2">
                <b>Facilities:</b>
                <div className="flex flex-wrap gap-2 mt-2">
                  {property.facilities.map((fc, idx) => (
                    <Chip
                      key={idx}
                      label={fc}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* EDIT BUTTON */}
          <div>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "black",
                minWidth: 48,
                width: 48,
                height: 48,
                borderRadius: "50%",
                boxShadow: 3,
                padding: 0,
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  boxShadow: 6,
                },
              }}
              onClick={() => setOpenEditDialog(true)}
            >
              <EditOutlinedIcon sx={{ color: "white" }} />
            </Button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="px-10 pb-10">
        <div className="flex justify-end mt-6">
          <Button
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "black",
              "&:hover": {
                boxShadow: 6,
              },
            }}
            onClick={() => setOpenAddDialog(true)}
          >
            Add New Room
          </Button>
        </div>

        <Paper elevation={2} className="p-4 rounded-xl mt-6">
          <div style={{ height: 520 }}>
            <DataGrid
              rows={property.rooms.map((r) => ({ ...r, id: r.id }))}
              columns={columns}
              pageSize={7}
              rowsPerPageOptions={[7]}
              disableSelectionOnClick
              sx={{
                borderRadius: "12px",
                backgroundColor: "#fff",
              }}
            />
          </div>
        </Paper>
      </div>

      {/* DELETE CONFIRMATION */}
      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            overflow: "hidden",
          },
        }}
      >
        {/* Header */}
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: "1.5rem",
            color: "error.main",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          Delete Room
        </DialogTitle>

        {/* Content */}
        <DialogContent
          dividers
          sx={{
            backgroundColor: "#fafafa",
            borderRadius: 2,
            py: 3,
            px: 4,
          }}
        >
          {selectedRoom && (
            <div className="text-gray-700 text-sm leading-relaxed space-y-2">
              <p>
                <b>Room No:</b>{" "}
                <span className="text-gray-900">{selectedRoom.roomNo}</span>
              </p>
              <p>
                <b>Type:</b>{" "}
                <span className="text-gray-900">{selectedRoom.roomType}</span>
              </p>
              <p>
                <b>Floor:</b>{" "}
                <span className="text-gray-900">{selectedRoom.floorLevel}</span>
              </p>
              <p>
                <b>Beds:</b>{" "}
                <span className="text-gray-900">{selectedRoom.totalBeds}</span>
              </p>
              <p>
                <b>Size:</b>{" "}
                <span className="text-gray-900">{selectedRoom.size} m²</span>
              </p>
              <p>
                <b>Status:</b>{" "}
                <span
                  className={`px-2 py-1 rounded-full ${
                    statusColors[selectedRoom.status]
                  }`}
                >
                  {selectedRoom.status}
                </span>
              </p>
            </div>
          )}
        </DialogContent>

        {/* Actions */}
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            px: 4,
            py: 3,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => setDeleteOpen(false)}
            sx={{
              borderRadius: "10px",
              px: 3,
              py: 1,
              borderColor: "gray.300",
              color: "gray.700",
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={confirmDelete}
            sx={{
              borderRadius: "10px",
              px: 4,
              py: 1.2,
              fontWeight: 600,
              boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
              "&:hover": { backgroundColor: "#d32f2f" },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* ADD ROOM POP-UP */}
      <AddRoomDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSave={handleSaveRoom}
      />

      {/* UPDATE ROOM DIALOG */}
      <UpdateRoomDialog
        open={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
        room={roomToUpdate}
        onUpdate={handleUpdateRoom}
      />

      {/* UPDATE PROPERTY DIALOG */}
      <UpdatePropertyDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        property={property}
        onSave={handleUpdateProperty}
      />
    </div>
  );
}
