// /src/data/dummyTenants.js
// tenants with a flat schema requested by the user
export const dummyTenants = [
  {
    id: "ten-001",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 234-567-8901",
    gender: "female",
    propertyId: 1,
    roomId: 101,
    leaseAgreement: null,
    leaseStart: "2024-06-01",
    leaseEnd: "2025-05-31",
    status: "active",
  },
  {
    id: "ten-002",
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+1 234-567-8902",
    gender: "male",
    propertyId: 1,
    roomId: 102,
    leaseAgreement: "agreements/michael-chen-lease.pdf",
    leaseStart: "2024-07-15",
    leaseEnd: "2025-07-14",
    status: "active",
  },
  {
    id: "ten-003",
    name: "Emma Wilson",
    email: "emma.w@email.com",
    phone: null,
    gender: "female",
    propertyId: 2,
    roomId: null,
    leaseAgreement: null,
    leaseStart: "2024-08-01",
    leaseEnd: "2025-07-31",
    status: "invited",
  },
];

// keep backward-compatible occupancy list (simpler mapping)
export const dummyOccupancies = [
  {
    id: "occ-001",
    tenantId: "ten-001",
    propertyId: 1,
    roomId: 101,
    leaseStart: "2024-06-01",
    leaseEnd: "2025-05-31",
    status: "active",
  },
  {
    id: "occ-002",
    tenantId: "ten-002",
    propertyId: 1,
    roomId: 102,
    leaseStart: "2024-07-15",
    leaseEnd: "2025-07-14",
    status: "active",
  },
  {
    id: "occ-003",
    tenantId: "ten-003",
    propertyId: 2,
    roomId: null,
    leaseStart: "2024-08-01",
    leaseEnd: "2025-07-31",
    status: "invited",
  },
];
