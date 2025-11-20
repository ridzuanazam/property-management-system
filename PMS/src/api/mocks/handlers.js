// THIS FILE ACT AS A BACKEND SYSTEM AND SENT API RESPONSES TO THE FRONTEND REQUESTS USING MOCK DATA

import { rest } from "msw";
import usersRaw from "../data/users.json";
import propertiesRaw from "../data/properties.json";
import roomsRaw from "../data/rooms.json";

let users = [...usersRaw];
let properties = [...propertiesRaw];
let rooms = [...roomsRaw];

export const handlers = [
  // GET /api/users
  rest.get("/api/users", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(users));
  }),
  // POST /api/users
  rest.post("/api/users", async (req, res, ctx) => {
    const newUser = await req.json();
    newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
    users.push(newUser);
    return res(ctx.status(201), ctx.json(newUser));
  }),
  // PUT /api/users/:id
  rest.put("/api/users/:id", async (req, res, ctx) => {
    const { id } = req.params;
    const updatedData = await req.json();
    const index = users.findIndex((u) => u.id === Number(id));
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedData };
      return res(ctx.status(200), ctx.json(users[index]));
    }
    return res(ctx.status(404));
  }),
  // DELETE /api/users/:id
  rest.delete("/api/users/:id", (req, res, ctx) => {
    const { id } = req.params;
    users = users.filter((u) => u.id !== Number(id));
    return res(ctx.status(200), ctx.json({ success: true }));
  }),
  // GET /api/properties
  rest.get("/api/properties", (req, res, ctx) => {
    const result = properties.map((p) => {
      const owner = users.find((u) => u.id === p.owner_id) || null;
      const propRooms = rooms.filter(
        (r) => Number(r.properties_id_) === Number(p.id)
      );
      // normalize key for client if you want (optiaonal
      return { ...p, owner, rooms: propRooms };
    });

    return res(ctx.status(200), ctx.json(result));
  }),
  // POST /api/properties
  rest.post("/api/properties", async (req, res, ctx) => {
    const newProperty = await req.json();
    newProperty.id = properties.length
      ? properties[properties.length - 1].id + 1
      : 1;
    properties.push(newProperty);
    return res(ctx.status(201), ctx.json(newProperty));
  }),
  // PUT /api/properties/:id
  rest.put("/api/properties/:id", async (req, res, ctx) => {
    const { id } = req.params;
    const updatedData = await req.json();
    const index = properties.findIndex((p) => p.id === Number(id));
    if (index !== -1) {
      properties[index] = { ...properties[index], ...updatedData };
      return res(ctx.status(200), ctx.json(properties[index]));
    }
    return res(ctx.status(404));
  }),
  // DELETE /api/properties/:id
  rest.delete("/api/properties/:id", (req, res, ctx) => {
    const { id } = req.params;
    properties = properties.filter((p) => p.id !== Number(id));
    return res(ctx.status(200), ctx.json({ success: true }));
  }),
  // GET /api/rooms
  rest.get("/api/rooms", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(rooms));
  }),
  // POST /api/rooms
  rest.post("/api/rooms", async (req, res, ctx) => {
    const newRoom = await req.json();
    newRoom.id = rooms.length ? rooms[rooms.length - 1].id + 1 : 1;
    rooms.push(newRoom);
    return res(ctx.status(201), ctx.json(newRoom));
  }),
  // PUT /api/rooms/:id
  rest.put("/api/rooms/:id", async (req, res, ctx) => {
    const { id } = req.params;
    const updatedData = await req.json();
    const index = rooms.findIndex((r) => r.id === Number(id));
    if (index !== -1) {
      rooms[index] = { ...rooms[index], ...updatedData };
      return res(ctx.status(200), ctx.json(rooms[index]));
    }
    return res(ctx.status(404));
  }),
  // DELETE /api/rooms/:id
  rest.delete("/api/rooms/:id", (req, res, ctx) => {
    const { id } = req.params;
    rooms = rooms.filter((r) => r.id !== Number(id));
    return res(ctx.status(200), ctx.json({ success: true }));
  }),
];
