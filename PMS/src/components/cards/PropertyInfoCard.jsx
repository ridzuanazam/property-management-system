import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import RoomListCard from "./RoomListCard";
import { Link } from "react-router-dom";

export default function PropertyInfoCard({ isOpen, onClose, data }) {
  if (!data) {
    return (
      <aside
        className={`h-full w-full bg-white rounded-2xl shadow-xl p-6 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <p className="text-gray-500 mt-8">Select a property...</p>
      </aside>
    );
  }

  const getStatusClasses = (status) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-700";
      case "renovation":
        return "bg-gray-200 text-gray-700";
      case "inactive":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <aside
      className={`
        relative h-full w-full bg-white rounded-2xl shadow-xl p-6 
        transition-transform duration-300 overflow-hidden
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-semibold">Property Details</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
      </div>

      {/* Property Name */}
      <h2 className="text-2xl font-bold">{data.unitName}</h2>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-gray-600 text-sm my-2 pb-2">
        <LocationOnIcon fontSize="small" />
        <span>{`${data.city}, ${data.state}`}</span>
      </div>

      {/* Property Image */}
      <img
        src={data.photo}
        className="w-full h-60 rounded-2xl mb-6 object-cover "
      />

      {/* Property Facts */}
      <div className="flex flex-wrap gap-6 text-gray-600 text-sm mb-7">
        <div className="flex items-center gap-1.5">
          <LayersOutlinedIcon fontSize="small" />
          <span>
            {data.floorLevel || "N/A"}{" "}
            {data.floorLevel > 1 ? "Levels" : "Level"}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <MeetingRoomOutlinedIcon fontSize="small" />
          <span>
            {data.rooms.length || "N/A"}{" "}
            {data.rooms.length > 1 ? "Rooms" : "Room"}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <ViewInArOutlinedIcon fontSize="small" />
          <span>{data.sizeSqft || "N/A"} sqft </span>
        </div>

        <div className="flex items-center gap-1.5">
          <BathtubOutlinedIcon fontSize="small" />
          <span>
            {data.totalBathroom || "N/A"}{" "}
            {data.totalBathroom > 1 ? "Bathrooms" : "Bathroom"}
          </span>
        </div>
      </div>

      {/* Availability */}
      <div className="p-4 bg-gray-100 rounded-lg mb-6">
        <p className="text-gray-800 text-sm">
          Availability:{" "}
          <b>{`${
            data.rooms.filter((r) => ["Available"].includes(r.status)).length
          } / ${data.rooms.length}`}</b>{" "}
          rooms
        </p>
      </div>

      {/* Extra Details */}
      <div className="grid grid-cols-2 gap-y-5 gap-x-5">
        <p className="text-gray-800 text-base">
          <b>Unit Type:</b> {data.unitType || "N/A"}
        </p>

        <p className="text-gray-800 text-base">
          <b>Status:</b>{" "}
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${getStatusClasses(
              data.status
            )}`}
          >
            {data.status || "N/A"}
          </span>
        </p>

        <div className="flex text-gray-800 text-base">
          <b>Address:</b>
          <p className="pl-2">{data.address || "N/A"}</p>
        </div>

        <p className="text-gray-800 text-base">
          <b>Renting Type:</b> {data.rentingType || "N/A"}
        </p>

        {/* Facilities */}
        <div className="col-span-2 text-gray-800 text-base mb-8">
          <b>Facilities:</b>
          <div className="flex flex-wrap gap-2 mt-2 pl-6">
            {(data.facilities || []).map((prop, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
              >
                {prop}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Rooms List */}
      <div className="col-span-2 flex items-center justify-between pb-3 mb-6">
        <p className="text-lg font-bold text-gray-800">List of Rooms</p>
        <Link to={`property-details/${data.id}`}>
          <span className="flex items-center text-sm text-gray-600 hover:text-teal-600 ">
            <span>View Details</span>
            <ChevronRightOutlinedIcon
              fontSize="small"
              className="-ml-0.5" // move icon slightly left
            />
          </span>
        </Link>
      </div>

      {(data.rooms || []).map((room) => (
        <RoomListCard key={room.id} room={room} />
      ))}
    </aside>
  );
}
