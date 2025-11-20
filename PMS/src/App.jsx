import "./index.css";
import Sidebar from "./components/sidebar/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import { PropertyProvider } from "./pages/owner/PropertyContext";
import { TenantProvider } from "./pages/owner/TenantContext";
//import pages owner
import Overview from "./pages/owner/Overview";
import Properties from "./pages/owner/Properties";
import AddProperty from "./pages/owner/AddProperty";
import PropertyDetails from "./pages/owner/PropertyDetails";
import Tenants from "./pages/owner/Tenants";
function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1  overflow-auto m-0">
        <PropertyProvider>
          <TenantProvider>
            {" "}
            <Routes>
              <Route path="/" element={<Navigate to="/owner/overview" />} />
              <Route path="/owner/overview" element={<Overview />} />
              <Route path="/owner/properties/" element={<Properties />} />
              <Route
                path="/owner/properties/add-property"
                element={<AddProperty />}
              />
              <Route
                path="/owner/properties/property-details/:id"
                element={<PropertyDetails />}
              />
              <Route path="/owner/tenants" element={<Tenants />} />
            </Routes>{" "}
          </TenantProvider>
        </PropertyProvider>
      </main>
    </div>
  );
}

export default App;
