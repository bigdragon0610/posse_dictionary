import { useState, createContext } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Menu from "./components/Menu";

export const AddContentContext = createContext();

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState({
    title: "タイトル",
    reading: "読み",
    meanings: ["意味1", "意味2"],
  });
  const [canAddContent, setCanAddContent] = useState(false);
  const [themeToAddContext, setThemeToAddContext] = useState({
    id: "",
    name: "",
  });
  const value = {
    canAddContent,
    setCanAddContent,
    themeToAddContext,
    setThemeToAddContext,
  };

  return (
    <div className='bg-blue-50 w-screen h-screen font-sans overflow-scroll pb-10'>
      <Header setIsOpen={setIsOpen} />
      <AddContentContext.Provider value={value}>
        <Main content={content} setContent={setContent} />
        <Menu isOpen={isOpen} setIsOpen={setIsOpen} setContent={setContent} />
      </AddContentContext.Provider>
    </div>
  );
};

export default App;
