import { useContext } from "react";
import { AddContentContext } from "../App";
import Content from "./Content";
import AddContent from "./AddContent";

const Main = ({ content, setContent }) => {
  const { canAddContent } = useContext(AddContentContext);

  return (
    <main className='pt-16 px-10'>
      {!canAddContent ? (
        <Content content={content} />
      ) : (
        <AddContent setContent={setContent} />
      )}
    </main>
  );
};

export default Main;
