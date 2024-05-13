import "@/styles/globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, from } from "@apollo/client";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
})

const client = new ApolloClient({
  link: from([httpLink]),
  cache: new InMemoryCache()
})


function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
