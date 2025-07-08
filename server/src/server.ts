import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { fastifyCors } from "@fastify/cors";
import { env } from "./env.ts";
import { getRoomsRoute } from "./http/routes/get-routes.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", () => {
  return 'OK';
});

app.register(getRoomsRoute);

app.listen({ port: env.PORT }).then(() => {
  console.clear();
  console.log(env.PORT);
  console.log("Server is running...");
  console.log(`HTTP server running on http://localhost:${env.PORT}`);
});