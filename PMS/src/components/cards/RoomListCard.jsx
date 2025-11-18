import NightShelterRoundedIcon from "@mui/icons-material/NightShelterRounded";
export default function RoomListCard({ room }) {
  const getStatusClasses = (status) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-700";
      case "renovation":
        return "bg-gray-200 text-gray-700";
      case "occupied":
        return "bg-purple-100 text-purple-700";
      case "inactive":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="w-full h-10 my-3 bg-white shadow-md flex justify-between">
      {/* Room Name and Pic */}

      <div className="flex">
        <div className="w-8 h-8 rounded-full mx-4">
          <NightShelterRoundedIcon />
        </div>
        <p>{room.roomNo || "No . 101-A"}</p>
      </div>

      {/* Room Status */}

      <div>
        <span
          className={`px-3 py-1 mx-3 text-sm font-medium rounded-full capitalize ${getStatusClasses(
            room.status
          )}`}
        >
          {room.status || "N/A"}
        </span>
      </div>
    </div>
  );
}
