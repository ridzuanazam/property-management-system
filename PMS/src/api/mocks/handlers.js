import { http, HttpResponse, delay } from "msw";
import users from "./data/users.json";
import properties from "./data/properties.json";
import rooms from "./data/rooms.json";
import tenancies from "./data/tenancies.json";
import rents from "./data/rents.json";
import payments from "./data/payments.json";
// import tenantInvitations from "../data/tenant_invitations.json";
import maintenanceRequests from "./data/maintenance_requests.json";
import notifications from "./data/notifications.json";
// import systemLogs from "../data/system_logs.json";

// In-memory stores for mutations
let usersStore = [...users];
let propertiesStore = [...properties];
let roomsStore = [...rooms];
let tenanciesStore = [...tenancies];
let rentsStore = [...rents];
let paymentsStore = [...payments];
// let invitationsStore = [...tenantInvitations];
let maintenanceStore = [...maintenanceRequests];
let notificationsStore = [...notifications];
// let logsStore = [...systemLogs];

// Helper functions
const paginate = (data, page = 1, limit = 10) => {
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    data: data.slice(start, end),
    meta: {
      total: data.length,
      page,
      limit,
    },
  };
};

const findById = (store, id) => store.find((item) => item.id === id);

// Delay simulation
const simulateDelay = () => delay(300 + Math.random() * 700);

export const handlers = [
  // ========== USERS ==========
  http.get("/api/users", async ({ request }) => {
    await simulateDelay();
    const url = new URL(request.url);
    const role = url.searchParams.get("role");
    const isActive = url.searchParams.get("is_active");
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    let filtered = [...usersStore];

    if (role) filtered = filtered.filter((u) => u.role === role);
    if (isActive !== null)
      filtered = filtered.filter((u) => u.is_active === (isActive === "true"));

    return HttpResponse.json(paginate(filtered, page, limit));
  }),

  http.get("/api/users/:id", async ({ params }) => {
    await simulateDelay();
    const user = findById(usersStore, Number(params.id));
    if (!user)
      return HttpResponse.json({ message: "User not found" }, { status: 404 });
    return HttpResponse.json(user);
  }),

  http.post("/api/users", async ({ request }) => {
    await simulateDelay();
    const newUser = await request.json();
    const user = {
      ...newUser,
      id: Math.max(...usersStore.map((u) => u.id)) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    usersStore.push(user);
    return HttpResponse.json(user, { status: 201 });
  }),

  http.put("/api/users/:id", async ({ params, request }) => {
    await simulateDelay();
    const id = Number(params.id);
    const index = usersStore.findIndex((u) => u.id === id);
    if (index === -1)
      return HttpResponse.json({ message: "User not found" }, { status: 404 });

    usersStore[index] = {
      ...usersStore[index],
      ...(await request.json()),
      id,
      updated_at: new Date().toISOString(),
    };
    return HttpResponse.json(usersStore[index]);
  }),

  http.delete("/api/users/:id", async ({ params }) => {
    await simulateDelay();
    const id = Number(params.id);
    usersStore = usersStore.filter((u) => u.id !== id);
    return HttpResponse.json({ message: "User deleted" });
  }),

  // ========== PROPERTIES ==========
  http.get("/api/properties", async ({ request }) => {
    await simulateDelay();
    const url = new URL(request.url);
    const ownerId = url.searchParams.get("owner_user_id");
    const status = url.searchParams.get("status");
    const city = url.searchParams.get("city");
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    let filtered = [...propertiesStore];

    if (ownerId)
      filtered = filtered.filter((p) => p.owner_user_id === Number(ownerId));
    if (status) filtered = filtered.filter((p) => p.status === status);
    if (city)
      filtered = filtered.filter((p) =>
        p.city.toLowerCase().includes(city.toLowerCase())
      );

    return HttpResponse.json(paginate(filtered, page, limit));
  }),

  http.get("/api/properties/:id", async ({ params }) => {
    await simulateDelay();
    const property = findById(propertiesStore, Number(params.id));
    if (!property)
      return HttpResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );

    const propertyRooms = roomsStore.filter(
      (r) => r.property_id === property.id
    );
    return HttpResponse.json({ ...property, rooms: propertyRooms });
  }),

  http.post("/api/properties", async ({ request }) => {
    await simulateDelay();
    const newProperty = await request.json();
    const property = {
      ...newProperty,
      id: Math.max(...propertiesStore.map((p) => p.id)) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    propertiesStore.push(property);
    return HttpResponse.json(property, { status: 201 });
  }),

  http.put("/api/properties/:id", async ({ params, request }) => {
    await simulateDelay();
    const id = Number(params.id);
    const index = propertiesStore.findIndex((p) => p.id === id);
    if (index === -1)
      return HttpResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );

    propertiesStore[index] = {
      ...propertiesStore[index],
      ...(await request.json()),
      id,
      updated_at: new Date().toISOString(),
    };
    return HttpResponse.json(propertiesStore[index]);
  }),

  // ========== ROOMS ==========
  http.get("/api/rooms", async ({ request }) => {
    await simulateDelay();
    const url = new URL(request.url);
    const propertyId = url.searchParams.get("property_id");
    const status = url.searchParams.get("status");

    let filtered = [...roomsStore];

    if (propertyId)
      filtered = filtered.filter((r) => r.property_id === Number(propertyId));
    if (status) filtered = filtered.filter((r) => r.status === status);

    return HttpResponse.json(filtered);
  }),

  http.get("/api/rooms/:id", async ({ params }) => {
    await simulateDelay();
    const room = findById(roomsStore, Number(params.id));
    if (!room)
      return HttpResponse.json({ message: "Room not found" }, { status: 404 });

    const tenancy = tenanciesStore.find(
      (t) => t.room_id === room.id && t.status === "active"
    );
    return HttpResponse.json({ ...room, tenancy });
  }),

  http.post("/api/rooms", async ({ request }) => {
    await simulateDelay();
    const newRoom = await request.json();
    const room = {
      ...newRoom,
      id: Math.max(...roomsStore.map((r) => r.id)) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    roomsStore.push(room);
    return HttpResponse.json(room, { status: 201 });
  }),

  // ========== TENANCIES ==========
  http.get("/api/tenancies", async ({ request }) => {
    await simulateDelay();
    const url = new URL(request.url);
    const tenantId = url.searchParams.get("tenant_user_id");
    const propertyId = url.searchParams.get("property_id");
    const status = url.searchParams.get("status");

    let filtered = [...tenanciesStore];

    if (tenantId)
      filtered = filtered.filter((t) => t.tenant_user_id === Number(tenantId));
    if (propertyId)
      filtered = filtered.filter((t) => t.property_id === Number(propertyId));
    if (status) filtered = filtered.filter((t) => t.status === status);

    return HttpResponse.json(filtered);
  }),

  http.get("/api/tenancies/:id", async ({ params }) => {
    await simulateDelay();
    const tenancy = findById(tenanciesStore, Number(params.id));
    if (!tenancy)
      return HttpResponse.json(
        { message: "Tenancy not found" },
        { status: 404 }
      );

    const tenant = usersStore.find((u) => u.id === tenancy.tenant_user_id);
    const property = propertiesStore.find((p) => p.id === tenancy.property_id);
    const room = tenancy.room_id
      ? roomsStore.find((r) => r.id === tenancy.room_id)
      : null;

    return HttpResponse.json({
      ...tenancy,
      tenant,
      property,
      room,
    });
  }),

  http.post("/api/tenancies", async ({ request }) => {
    await simulateDelay();
    const newTenancy = await request.json();
    const tenancy = {
      ...newTenancy,
      id: Math.max(...tenanciesStore.map((t) => t.id)) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    tenanciesStore.push(tenancy);
    return HttpResponse.json(tenancy, { status: 201 });
  }),

  // ========== RENTS ==========
  http.get("/api/rents", async ({ request }) => {
    await simulateDelay();
    const url = new URL(request.url);
    const tenancyId = url.searchParams.get("tenancy_id");
    const status = url.searchParams.get("status");

    let filtered = [...rentsStore];

    if (tenancyId)
      filtered = filtered.filter((r) => r.tenancy_id === Number(tenancyId));
    if (status) filtered = filtered.filter((r) => r.status === status);

    return HttpResponse.json(filtered);
  }),

  http.get("/api/rents/:id", async ({ params }) => {
    await simulateDelay();
    const rent = findById(rentsStore, Number(params.id));
    if (!rent)
      return HttpResponse.json({ message: "Rent not found" }, { status: 404 });

    const rentPayments = paymentsStore.filter((p) => p.rent_id === rent.id);
    return HttpResponse.json({ ...rent, payments: rentPayments });
  }),

  // ========== PAYMENTS ==========
  http.get("/api/payments", async ({ request }) => {
    await simulateDelay();
    const url = new URL(request.url);
    const rentId = url.searchParams.get("rent_id");
    const userId = url.searchParams.get("paid_by_user_id");

    let filtered = [...paymentsStore];

    if (rentId) filtered = filtered.filter((p) => p.rent_id === Number(rentId));
    if (userId)
      filtered = filtered.filter((p) => p.paid_by_user_id === Number(userId));

    return HttpResponse.json(filtered);
  }),

  http.post("/api/payments", async ({ request }) => {
    await simulateDelay();
    const newPayment = await request.json();
    const payment = {
      ...newPayment,
      id: Math.max(...paymentsStore.map((p) => p.id)) + 1,
      transaction_id: `TXN${Date.now()}`,
      status: "success",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    paymentsStore.push(payment);

    // Update rent status
    const rent = rentsStore.find((r) => r.id === payment.rent_id);
    if (rent) {
      rent.status = "paid";
      rent.paid_at = new Date().toISOString();
      rent.transaction_id = payment.transaction_id;
    }

    return HttpResponse.json(payment, { status: 201 });
  }),

  // ========== MAINTENANCE REQUESTS ==========
  http.get("/api/maintenance", async ({ request }) => {
    await simulateDelay();
    const url = new URL(request.url);
    const propertyId = url.searchParams.get("property_id");
    const reportedBy = url.searchParams.get("reported_by");
    const status = url.searchParams.get("status");

    let filtered = [...maintenanceStore];

    if (propertyId)
      filtered = filtered.filter((m) => m.property_id === Number(propertyId));
    if (reportedBy)
      filtered = filtered.filter((m) => m.reported_by === Number(reportedBy));
    if (status) filtered = filtered.filter((m) => m.status === status);

    return HttpResponse.json(filtered);
  }),

  http.post("/api/maintenance", async ({ request }) => {
    await simulateDelay();
    const newRequest = await request.json();
    const requestData = {
      ...newRequest,
      id: Math.max(...maintenanceStore.map((m) => m.id)) + 1,
      status: "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    maintenanceStore.push(requestData);
    return HttpResponse.json(requestData, { status: 201 });
  }),

  http.patch("/api/maintenance/:id/status", async ({ params, request }) => {
    await simulateDelay();
    const id = Number(params.id);
    const index = maintenanceStore.findIndex((m) => m.id === id);
    if (index === -1)
      return HttpResponse.json({ message: "Not found" }, { status: 404 });

    const { status } = await request.json();
    maintenanceStore[index].status = status;
    maintenanceStore[index].updated_at = new Date().toISOString();

    return HttpResponse.json(maintenanceStore[index]);
  }),

  // ========== NOTIFICATIONS ==========
  http.get("/api/notifications", async ({ request }) => {
    await simulateDelay();
    const url = new URL(request.url);
    const userId = url.searchParams.get("user_id");
    const isRead = url.searchParams.get("is_read");

    let filtered = [...notificationsStore];

    if (userId) filtered = filtered.filter((n) => n.user_id === Number(userId));
    if (isRead !== null)
      filtered = filtered.filter((n) => n.is_read === (isRead === "true"));

    return HttpResponse.json(filtered);
  }),

  http.patch("/api/notifications/:id/read", async ({ params }) => {
    await simulateDelay();
    const id = Number(params.id);
    const notification = notificationsStore.find((n) => n.id === id);
    if (!notification)
      return HttpResponse.json({ message: "Not found" }, { status: 404 });

    notification.is_read = true;
    return HttpResponse.json(notification);
  }),

  // ========== DASHBOARD STATS ==========
  http.get("/api/dashboard/stats", async () => {
    await simulateDelay();
    return HttpResponse.json({
      total_properties: propertiesStore.length,
      active_tenancies: tenanciesStore.filter((t) => t.status === "active")
        .length,
      pending_rents: rentsStore.filter((r) => r.status !== "paid").length,
      pending_maintenance: maintenanceStore.filter(
        (m) => m.status === "pending"
      ).length,
      total_revenue: paymentsStore.reduce(
        (sum, p) => sum + Number(p.amount),
        0
      ),
    });
  }),
];
