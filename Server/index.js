import express from "express";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import cors from "cors";
import userRoutes from "./routes/user.js";
import uploadRoutes from "./routes/upload.js";
import messageRoutes from "./routes/message.js";
import { app, http } from "./Socket/index.js";
import morgan from "morgan";
import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import authTypeDefs from "./typeDefs/auth.mjs";
import authResolver from "./resolvers/auth.mjs";
import postTypeDefs from "./typeDefs/post.mjs";
import postResolvers from "./resolvers/post.mjs";
import storyTypeDefs from "./typeDefs/story.mjs";
import storyResolvers from "./resolvers/story.mjs";
import { authenticateUser } from "./Middleware/verify.js";

const customLoggingPlugin = {
  requestDidStart(requestContext) {
    console.log("Request started! Query:\n" + requestContext.request.query);
    console.log("Variables:", requestContext.request.variables);

    return {
      willSendResponse(requestContext) {
        console.log("Response:", requestContext.response);
      },
    };
  },
};

app.use(
  cors({
    origin: [process.env.FRONTEND, "https://studio.apollographql.com"],
  })
);

const typeDefs = mergeTypeDefs([authTypeDefs, postTypeDefs, storyTypeDefs]);
const resolvers = mergeResolvers([authResolver, postResolvers, storyResolvers]);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    try {
      const authContext = await authenticateUser(req);
      const publicOperations = ["Login", "Register"];
      const operationName = req.body.operationName;
      if (!authContext && !publicOperations.includes(operationName)) {
        throw new Error("Unauthorized");
      }
      return { ...authContext, req };
    } catch (error) {
      if (error.message === "Unauthorized") {
        return { req, authError: error.message };
      }
      throw error;
    }
  },
  // plugins: [customLoggingPlugin],
});

await apolloServer.start();

apolloServer.applyMiddleware({ app });

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR => ", err));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api", userRoutes);
app.use("/api", uploadRoutes);
app.use("/api", messageRoutes);

const port = process.env.PORT || 8000;

http.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(
    `graphql server is ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
  );
});
