import { Layout } from "./components";
import { GlobalStyle } from "./GlobalStyle";
import { AppRouter } from "./router";

function App() {
  return (
    <div>
      <GlobalStyle />
      <Layout>
        <AppRouter></AppRouter>
      </Layout>
    </div>
  );
}

export default App;
