import { useRef, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import Theme from "./Theme";
import CloseBtn from "../assets/images/close.svg";
import AddBtn from "../assets/images/add.svg";

const Menu = ({ isOpen, setIsOpen, setContent }) => {
  const [themes, setThemes] = useState([]);
  const [canAddTheme, setCanAddTheme] = useState(false);
  const inputRef = useRef();

  const addTheme = async () => {
    const name = inputRef.current.value;
    const created_at = Date.now();
    const themesCollectionRef = collection(db, "themes");
    const docRef = await addDoc(themesCollectionRef, {
      name: name,
      created_at: created_at,
    });
    setThemes((prevThemes) => {
      return [
        ...prevThemes,
        {
          name: name,
          created_at: created_at,
          id: docRef.id,
        },
      ];
    });
    inputRef.current.value = "";
    setCanAddTheme(false);
  };

  useEffect(() => {
    const themesCollectionRef = collection(db, "themes");
    const getThemes = async () => {
      const q = query(themesCollectionRef, orderBy("created_at", "asc"));
      const data = await getDocs(q);
      setThemes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getThemes();
  }, []);

  return (
    <section className={!isOpen ? "hidden" : ""}>
      <div
        className='bg-black opacity-10 w-full h-screen absolute top-0 '
        onClick={() => setIsOpen(false)}
      ></div>
      <section className='bg-blue-50 w-2/3 h-screen absolute top-0 right-0 px-7'>
        <img
          src={CloseBtn}
          alt='close'
          width={24}
          className='mt-5 ml-auto'
          onClick={() => setIsOpen(false)}
        />
        <div className='mt-8'>
          <button className='flex' onClick={() => setCanAddTheme(true)}>
            <img src={AddBtn} alt='add' width={20} />
            <span className='ml-1 leading-5 text-blue-400'>テーマを追加</span>
          </button>
          <div className='mt-2 flex flex-col gap-1'>
            <input
              type='text'
              className={
                (!canAddTheme ? "hidden" : "") +
                " border-2 border-blue-100 rounded-md p-1 outline-none focus:border-blue-400"
              }
              placeholder='テーマ名を入力'
              ref={inputRef}
            />
            <div className={!canAddTheme ? "hidden" : ""}>
              <button
                className='bg-blue-500 text-white px-2 py-1 rounded-md shadow-md'
                onClick={addTheme}
              >
                OK
              </button>
            </div>
          </div>
        </div>
        <ul className='flex flex-col gap-5 mt-5'>
          {themes.map((theme) => {
            return (
              <Theme
                key={theme.id}
                theme={theme}
                setContent={setContent}
                setMenuIsOpen={setIsOpen}
              />
            );
          })}
        </ul>
      </section>
    </section>
  );
};

export default Menu;
