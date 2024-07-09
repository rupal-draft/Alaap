// ApolloProviderWrapper.js
"use client";
import { ApolloProvider } from "@apollo/client";
import { getClient } from "./graphql";

export default function ApolloProviderWrapper({ children }) {
  return <ApolloProvider client={getClient()}>{children}</ApolloProvider>;
}
