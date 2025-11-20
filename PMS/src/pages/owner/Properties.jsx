import { useState } from "react";
import { Link } from "react-router-dom";
import { useProperties } from "../../context/PropertiesContext";
import PropertyCard from "../../components/cards/PropertyCard";
import PropertyInfoCard from "../../components/cards/PropertyInfoCard";

export default function Properties() {
  const { properties, loading } = useProperties();
  if (loading) {
    return <div>Loading...</div>;
  }

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpen = (propertyData) => {
    setSelectedProperty(propertyData);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // 🔍 SEARCH LOGIC
  const filteredProperties = properties.filter((prop) => {
    const query = searchQuery.toLowerCase();

    return (
      prop.unit_name.toLowerCase().includes(query) ||
      prop.city.toLowerCase().includes(query) ||
      prop.state.toLowerCase().includes(query) ||
      prop.status.toLowerCase().includes(query)
    );
  });

  return (
    <>
      {/* Header */}
      <nav className="h-[22%] flex flex-col justify-center gap-4 p-4 w-full bg-white shadow-md overflow-hidden">
        {/* Top Section */}
        <div className="flex justify-between items-center px-6 pt-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Properties</h2>
            <p className="text-gray-500 pt-1">List of Properties</p>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3 mr-10">
            <img
              src="https://picsum.photos/150"
              className="w-10 h-10 rounded-full "
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                John Doe
              </span>
              <span className="text-xs text-gray-500">Owner</span>
            </div>
          </div>
        </div>

        {/* Search & Action */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          {/* 🔍 NEW SEARCH BAR */}
          <div className="w-full md:w-1/2 relative ml-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, city, state..."
              className="w-full px-4 py-2 pl-10 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />

            {/* Search Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>

          {/* Add New Property Button */}
          <div>
            <Link to="add-property">
              <button className="mr-10 px-4 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
                Add New Property
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <section className="flex w-full h-[82%] pb-5 transition-all duration-300">
        {/* Left: Property List */}
        <div
          className={`flex flex-col gap-3 mx-5 mt-3 transition-all duration-300 overflow-y-auto no-scrollbar h-full ${
            isOpen ? "w-1/2" : "w-full"
          }`}
        >
          {filteredProperties.length === 0 ? (
            <p className="text-gray-500 ml-6 mt-6">No properties found.</p>
          ) : (
            filteredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                id={prop.id}
                photo={prop.photo?.[0]} // fixed
                name={prop.unit_name}
                city={prop.city}
                state={prop.state}
                levels={prop.floorLevel}
                status={prop.status}
                sizeSqft={prop.sizeSqft}
                rooms={prop.rooms ? prop.rooms.length : 0}
                onClick={() => handleOpen(prop)}
              />
            ))
          )}
        </div>

        {/* Right: Slide-in Card */}
        <div
          className={`mt-3 transition-all duration-300 overflow-y-auto no-scrollbar h-full ${
            isOpen ? "w-1/2" : "w-0"
          }`}
        >
          <div className="h-auto">
            <PropertyInfoCard
              isOpen={isOpen}
              onClose={handleClose}
              data={selectedProperty}
            />
          </div>
        </div>
      </section>
    </>
  );
}
