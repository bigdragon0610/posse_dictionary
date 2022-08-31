import Title from "./Title";
import { AddContentContext } from "../App";
import { useState, useEffect, useContext } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import TriangleRight from "../assets/images/triangle_right.svg";
import TriangleDown from "../assets/images/triangle_down.svg";
import AddWordBtn from "../assets/images/add_word.svg";

const Theme = ({ theme, setContent, setMenuIsOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [titles, setTitles] = useState([]);
  const { setCanAddContent, setThemeToAddContext } =
    useContext(AddContentContext);

  useEffect(() => {
    if (isOpen) {
      const getTitles = async () => {
        const titlesCollectionRef = collection(db, "contents");
        const q = query(titlesCollectionRef, where("theme_id", "==", theme.id));
        const data = await getDocs(q);
        setTitles(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      };
      getTitles();
    }
  }, [isOpen]);

  const ThemeDialog = () => {
    if (!isOpen) {
      return (
        <li
          className='flex gap-3 text-zinc-800'
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className='flex gap-3' onClick={() => setIsOpen(!isOpen)}>
            <img src={TriangleRight} alt='closed' width={14} />
            <span className='font-bold text-xl'>{theme.name}</span>
          </div>
        </li>
      );
    } else {
      return (
        <li className='text-zinc-800'>
          <div className='flex gap-3' onClick={() => setIsOpen(!isOpen)}>
            <img src={TriangleDown} alt='closed' width={14} />
            <span className='font-bold text-xl'>{theme.name}</span>
          </div>
          <ul className='pl-7 font-bold pb-3'>
            {titles.map((title) => {
              return (
                <Title
                  key={title.id}
                  id={title.id}
                  title={title.title}
                  reading={title.reading}
                  setContent={setContent}
                />
              );
            })}
          </ul>
          <div className='ml-7'>
            <button
              className='flex'
              onClick={() => {
                setCanAddContent(true);
                setThemeToAddContext({
                  id: theme.id,
                  name: theme.name,
                });
                setIsOpen(false);
                setMenuIsOpen(false);
              }}
            >
              <img src={AddWordBtn} alt='add' width={24} />
              <span className='leading-6 ml-1 text-blue-400'>言葉を追加</span>
            </button>
          </div>
        </li>
      );
    }
  };

  return <ThemeDialog />;
};

export default Theme;
