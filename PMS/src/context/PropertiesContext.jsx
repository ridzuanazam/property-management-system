import { createContext, useContext, useState, useEffect } from "react";
import { getProperties } from "../api/services/properties";

// Create Context
const PropertiesContext = createContext();

// Provider Component
export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch mock data
    getProperties()
      .then((res) => {
        setProperties(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch properties:", err);
        setLoading(false);
      });
  }, []);

  // --- FUNCTIONS ---
  const addProperty = (newProperty) => {
    setProperties([...properties, { ...newProperty, id: Date.now() }]);
  };

  const updateProperty = (id, updatedData) => {
    setProperties(
      properties.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
    );
  };

  const deleteProperty = (id) => {
    setProperties(properties.filter((p) => p.id !== id));
  };

  const addRoom = (propertyId, room) => {
    setProperties(
      properties.map((p) =>
        p.id === propertyId
          ? { ...p, rooms: [...p.rooms, { ...room, id: Date.now() }] }
          : p
      )
    );
  };

  const updateRoom = (propertyId, roomId, updatedRoom) => {
    setProperties(
      properties.map((p) =>
        p.id === propertyId
          ? {
              ...p,
              rooms: p.rooms.map((r) =>
                r.id === roomId ? { ...r, ...updatedRoom } : r
              ),
            }
          : p
      )
    );
  };

  const deleteRoom = (propertyId, roomId) => {
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id === propertyId) {
          return {
            ...p,
            rooms: p.rooms.filter((r) => r.id !== roomId),
          };
        }
        return p;
      })
    );
  };

  const getPropertyById = (id) => {
    return properties.find((p) => p.id === Number(id));
  };

  return (
    <PropertiesContext.Provider
      value={{
        properties,
        setProperties,
        loading,
        addProperty,
        updateProperty,
        deleteProperty,
        addRoom,
        updateRoom,
        deleteRoom,
        getPropertyById,
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
};

// Custom hook
// eslint-disable-next-line react-refresh/only-export-components
export const useProperties = () => useContext(PropertiesContext);
