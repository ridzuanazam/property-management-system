import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function PropertyCard({
  photo,
  name,
  city,
  state,
  levels,
  rooms,
  sizeSqft,
  status,
  onClick,
}) {
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
    <div
      onClick={onClick}
      className="cursor-pointer bg-white w-full shadow-sm hover:shadow-md transition rounded-xl p-5 flex justify-between items-start"
    >
      <div className="flex gap-5">
        <img
          src={photo}
          alt="property photo"
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div className="flex flex-col gap-3">
          {/* Name */}
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>

          {/* Property Facts */}
          <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
            <div className="flex items-center gap-1.5">
              <LayersOutlinedIcon fontSize="small" />
              <span>
                {levels} {levels > 1 ? "Levels" : "Level"}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <MeetingRoomOutlinedIcon fontSize="small" />
              <span>
                {rooms} {rooms > 1 ? "Rooms" : "Room"}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <ViewInArOutlinedIcon fontSize="small" />
              <span>{sizeSqft} sqft</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-gray-600 text-sm">
            <LocationOnIcon fontSize="small" />
            <span>
              {city}, {state}
            </span>
          </div>
        </div>
      </div>

      {/* Status */}

      <span
        className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${getStatusClasses(
          status
        )}`}
      >
        {status}
      </span>
    </div>
  );
}
