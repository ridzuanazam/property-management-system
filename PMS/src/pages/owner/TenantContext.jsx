// /src/context/TenantContext.jsx

import React, { createContext, useContext, useState } from "react";
import { dummyTenants, dummyOccupancies } from "./dummyTenants";
import { dummyProperties } from "./dummyProperties"; // adjust path if your properties file is elsewhere

const TenantContext = createContext();

export const TenantProvider = ({ children }) => {
  const [tenants, setTenants] = useState(dummyTenants);
  const [occupancies, setOccupancies] = useState(dummyOccupancies);

  // Invite tenant: create tenant record (if needed) and an occupancy with 'invited' status
  const inviteTenant = (inviteData) => {
    const newTenantId = inviteData.tenantId || `ten-${Date.now()}`;

    // create or update tenant
    setTenants((prev) => {
      const exists = prev.find((t) => t.id === newTenantId);
      if (exists) return prev;
      const nt = {
        id: newTenantId,
        name: inviteData.fullName || inviteData.email || "Pending Tenant",
        email: inviteData.email || "",
        phone: inviteData.phone || null,
        gender: inviteData.gender || null,
        propertyId: inviteData.propertyId
          ? Number(inviteData.propertyId)
          : null,
        roomId: inviteData.roomId || null,
        leaseAgreement: inviteData.leaseAgreement || null,
        leaseStart: inviteData.leaseStart || null,
        leaseEnd: inviteData.leaseEnd || null,
        status: "invited",
      };
      return [nt, ...prev];
    });

    // create occupancy record
    const newOcc = {
      id: `occ-${Date.now()}`,
      tenantId: newTenantId,
      propertyId: inviteData.propertyId ? Number(inviteData.propertyId) : null,
      roomId: inviteData.roomId || null,
      leaseStart: inviteData.leaseStart || null,
      leaseEnd: inviteData.leaseEnd || null,
      status: "invited",
      createdAt: new Date().toISOString(),
    };

    setOccupancies((prev) => [newOcc, ...prev]);
  };

  // Terminate lease by setting occupancy status to 'inactive'
  const terminateLease = (occId) => {
    setOccupancies((prev) =>
      prev.map((o) => (o.id === occId ? { ...o, status: "inactive" } : o))
    );
  };

  // Update occupancy (merge patch into occupancy)
  const updateOccupancy = (occId, patch) => {
    setOccupancies((prev) =>
      prev.map((o) => (o.id === occId ? { ...o, ...patch } : o))
    );
  };

  // Joined view: attach tenant and property details for UI convenience
  const occupanciesWithDetails = occupancies.map((o) => {
    const tenant = tenants.find((t) => t.id === o.tenantId) || null;
    const property = dummyProperties.find((p) => p.id === o.propertyId) || null;
    const room =
      property && property.rooms
        ? property.rooms.find((r) => r.id === o.roomId) || null
        : null;

    return {
      ...o,
      tenant,
      property,
      room,
    };
  });

  return (
    <TenantContext.Provider
      value={{
        tenants,
        occupancies: occupanciesWithDetails,
        rawTenants: tenants,
        rawOccupancies: occupancies,
        inviteTenant,
        terminateLease,
        updateOccupancy,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTenants = () => {
  const ctx = useContext(TenantContext);
  if (!ctx) throw new Error("useTenants must be used inside TenantProvider");
  return ctx;
};
