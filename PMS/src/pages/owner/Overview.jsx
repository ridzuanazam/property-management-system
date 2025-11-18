import SparkLineCard from "../../components/mui-components/SparkLineCard";
import IncomeTrendsChart from "../../components/mui-components/IncomeTrendsChart";
import propertyData from "../../components/mui-components/property-registrations.json";
import SemiDonutChart from "../../components/mui-components/SemiDonutApexChart";
import {
  Home,
  Users,
  Landmark,
  TrendingUp,
  Wallet,
  DollarSign,
} from "lucide-react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function Overview() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome Azam!</h1>
      <p className="text-gray-500 mb-4">
        explore information about your properties
      </p>
      {/* grid 4 columns */}
      <div className="grid grid-cols-4 gap-4">
        {/* Total Property Card */}
        <SparkLineCard
          title="Total Property"
          data={propertyData}
          color="#8B5CF6" // purple
          icon={Landmark}
        />
        {/* Renting Units Card */}
        <SparkLineCard
          title="Renting Units"
          data={propertyData}
          color="#06B6D4" // purple
          icon={Home}
        />
        {/* Active Users Card */}
        <SparkLineCard
          title="Active Users"
          data={propertyData}
          color="#F59E0B" // amber
          icon={Users}
        />
        {/* Revenue Card */}
        <SparkLineCard
          title="Revenue"
          data={propertyData}
          color="#22C55E" // amber
          icon={DollarSign}
        />
        {/* Income Chart */}
        <div className="col-span-3">
          <IncomeTrendsChart />
        </div>
        {/* Semi Donat Chart */}
        <div className="col-span-1">
          <SemiDonutChart />
        </div>
        {/* Maintenance Status Table */}
        <Paper sx={{ height: 400, width: "100%" }} className="col-span-4">
          <h2 className="text-xl font-bold text-gray-800 m-8">Tenant List</h2>

          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </div>
    </div>
  );
}
