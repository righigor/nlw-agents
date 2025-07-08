import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
import z from "zod/v4";

export const createRoomRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/rooms",
    {
      schema: {
        body: z.object({
          name: z.string().min(1).max(100),
          description: z.string().max(500).optional(),
        }),
      },
    },
    async (request, reply) => {
      const { name, description } = request.body;

      const [room] = await db
        .insert(schema.rooms)
        .values({
          name,
          description,
        })
        .returning({
          id: schema.rooms.id,
        });
      
      if (!room) {
        throw new Error("Failed to create room");
      }
      return reply.status(201).send({
        roomId: room.id,
      });
    }
  );
};
