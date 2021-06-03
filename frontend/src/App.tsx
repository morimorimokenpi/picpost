import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Post from "./Post";
import CssBaseline from "@material-ui/core/CssBaseline";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <CssBaseline />
        <Post />
      </div>
    </ApolloProvider>
  );
};

export default App;
