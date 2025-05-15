import Header from "./components/Header";
import ProductView from "./components/ProductView";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header /> {/* ✅ Agora o Header está no topo */}
      <div className="flex flex-grow items-center justify-center">
        <ProductView />
      </div>
    </div>
  );
};

export default App;
