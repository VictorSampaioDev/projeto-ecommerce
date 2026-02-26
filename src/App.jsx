import Header from "./components/Header";
import Menu from "./components/Menu";
function App() {
  return (
    <>
      <Header />
      <Menu />
      
      <main className="p-6">
        <h1 className="text-2xl font-bold">
          Conteúdo da página
        </h1>
      </main>
    </>
  );
}

export default App;