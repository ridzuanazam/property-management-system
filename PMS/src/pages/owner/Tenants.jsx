// /src/pages/owner/tenants/index.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Home as HomeIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { dummyTenants } from "./dummyTenants";
import { dummyProperties } from "./dummyProperties";

export default function OwnerTenants() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [invitationOpen, setInvitationOpen] = useState(false);

  // Invitation form state
  const [inviteForm, setInviteForm] = useState({
    email: "",
    propertyId: "",
    roomId: "",
    monthlyRent: "",
    deposit: "",
    leaseStart: "",
    leaseEnd: "",
  });

  const filteredTenants = dummyTenants.filter((t) => {
    const prop = dummyProperties.find((p) => p.id === t.propertyId) || {};
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (prop.unitName || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || t.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleSendInvitation = () => {
    console.log("Sending invitation:", inviteForm);
    setInvitationOpen(false);
    // Reset form
    setInviteForm({
      email: "",
      propertyId: "",
      roomId: "",
      monthlyRent: "",
      deposit: "",
      leaseStart: "",
      leaseEnd: "",
    });
  };

  const columns = [
    {
      field: "name",
      headerName: "Tenant",
      flex: 2,
      renderCell: (params) => {
        const val = params.row;
        return (
          <div className="flex items-center gap-3 h-10">
            <Avatar className="bg-blue-500 flex">
              {(val.name || "")
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar>
            <div>
              <p className="font-semibold h-5 flex items-center ">{val.name}</p>
              <p className="text-sm text-gray-500">{val.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      field: "property",
      headerName: "Property",
      flex: 1.5,
      renderCell: (params) => (
        <div className="h-10">
          <p className="font-semibold h-8 flex items-center">
            {params.row.propertyName}
          </p>
          {params.row.roomId && (
            <Chip
              size="small"
              label={`Room ${params.row.roomId}`}
              className="mt-1 bg-purple-100 text-purple-700"
            />
          )}
        </div>
      ),
    },
    {
      field: "gender",
      headerName: "Gender",

      flex: 0.8,
      renderCell: (params) => (
        <div className="text-sm capitalize">{params.row.gender}</div>
      ),
    },
    {
      field: "lease",
      headerName: "Lease Period",
      flex: 1.4,
      renderCell: (params) => (
        <div className="text-sm">
          <div>
            {params.row.leaseStart} → {params.row.leaseEnd}
          </div>
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,

      renderCell: (params) => (
        <div className="h-8 flex items-center">
          <Chip
            label={params.row.status.toUpperCase()}
            color={
              params.row.status === "active"
                ? "success"
                : params.row.status === "invited"
                ? "warning"
                : "default"
            }
          />
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-3">
          <Button variant="outlined" size="small" color="info">
            Update
          </Button>
          <Button variant="outlined" size="small" color="error">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <Box className="mb-6">
        <Typography variant="h4" className="text-gray-800 font-bold mb-2">
          Tenant Management
        </Typography>
        <Typography variant="body2" className="text-gray-600">
          Manage your tenants, send invitations, and view lease details
        </Typography>
      </Box>

      {/* Action Bar */}
      <Card className="mb-6 shadow-sm">
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search tenants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="invited">Invited</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={5} className="flex justify-end">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setInvitationOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 normal-case"
              >
                Invite New Tenant
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Table Copy from Property */}
      <Paper elevation={2} className="p-4 rounded-xl mt-6">
        <div style={{ height: 520 }}>
          <DataGrid
            rows={filteredTenants.map((t) => {
              const prop =
                dummyProperties.find((p) => p.id === t.propertyId) || {};
              return {
                id: t.id,
                name: t.name,
                email: t.email,
                phone: t.phone,
                gender: t.gender,
                propertyName: prop.unitName || prop.unitName || prop.unitName,
                propertyId: t.propertyId,
                roomId: t.roomId,
                leaseStart: t.leaseStart,
                leaseEnd: t.leaseEnd,
                leaseAgreement: t.leaseAgreement,
                status: t.status,
              };
            })}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7]}
            disableSelectionOnClick
            rowHeight={50} // sets each row height (px)
            headerHeight={56} // header height
            density="comfortable" // 'compact' | 'standard' | 'comfortable'
            sx={{
              borderRadius: "12px",
              backgroundColor: "#fff",
              "& .MuiDataGrid-cell": {
                py: "12px", // vertical padding inside cells

                whiteSpace: "normal", // allow wrapping
              },
              "& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader": {
                py: "10px",
              },
            }}
          />
        </div>
      </Paper>

      {/* Tenants table shown above using DataGrid for consistent design */}

      {/* Invitation Modal */}
      <Dialog
        open={invitationOpen}
        onClose={() => setInvitationOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className="bg-blue-50 text-blue-800">
          Invite New Tenant
        </DialogTitle>
        <DialogContent className="mt-4">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tenant Email"
                type="email"
                value={inviteForm.email}
                onChange={(e) =>
                  setInviteForm({ ...inviteForm, email: e.target.value })
                }
                required
                helperText="Invitation will be sent to this email"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Property</InputLabel>
                <Select
                  value={inviteForm.propertyId}
                  onChange={(e) =>
                    setInviteForm({ ...inviteForm, propertyId: e.target.value })
                  }
                  label="Property"
                >
                  <MenuItem value="prop-001">Sunset Apartments</MenuItem>
                  <MenuItem value="prop-002">Downtown Condo</MenuItem>
                  <MenuItem value="prop-003">Garden Villa</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Room (Optional)</InputLabel>
                <Select
                  value={inviteForm.roomId}
                  onChange={(e) =>
                    setInviteForm({ ...inviteForm, roomId: e.target.value })
                  }
                  label="Room (Optional)"
                >
                  <MenuItem value="">Whole Property</MenuItem>
                  <MenuItem value="room-101">Room 101</MenuItem>
                  <MenuItem value="room-205">Room 205</MenuItem>
                  <MenuItem value="room-302">Room 302</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Monthly Rent ($)"
                type="number"
                value={inviteForm.monthlyRent}
                onChange={(e) =>
                  setInviteForm({ ...inviteForm, monthlyRent: e.target.value })
                }
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Security Deposit ($)"
                type="number"
                value={inviteForm.deposit}
                onChange={(e) =>
                  setInviteForm({ ...inviteForm, deposit: e.target.value })
                }
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Lease Start Date"
                type="date"
                value={inviteForm.leaseStart}
                onChange={(e) =>
                  setInviteForm({ ...inviteForm, leaseStart: e.target.value })
                }
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Lease End Date"
                type="date"
                value={inviteForm.leaseEnd}
                onChange={(e) =>
                  setInviteForm({ ...inviteForm, leaseEnd: e.target.value })
                }
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="p-4">
          <Button
            onClick={() => setInvitationOpen(false)}
            className="normal-case"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSendInvitation}
            disabled={
              !inviteForm.email ||
              !inviteForm.propertyId ||
              !inviteForm.monthlyRent
            }
            className="bg-blue-600 hover:bg-blue-700 normal-case"
          >
            Send Invitation
          </Button>
        </DialogActions>
      </Dialog>

      {/* no leftover delete dialog here - tenant delete handled via DataGrid actions */}
    </Box>
  );
}
