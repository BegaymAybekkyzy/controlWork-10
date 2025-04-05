import Layout from "./components/Layout/Layout.tsx";
import { Route, Routes } from "react-router-dom";
import News from "./features/news/News.tsx";
import AddNews from "./features/news/AddNews.tsx";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/news" element={<News />} />
        <Route path="/add-new-post" element={<AddNews />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </Layout>
  );
};

export default App;
