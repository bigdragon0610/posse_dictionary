import { AddContentContext } from "../App";
import { useContext, useState, useEffect } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import AddBtn from "../assets/images/add.svg";

const AddContent = ({ setContent }) => {
  const { setCanAddContent, themeToAddContext, setThemeToAddContext } =
    useContext(AddContentContext);
  const [themes, setThemes] = useState([
    {
      name: themeToAddContext.name,
      id: themeToAddContext.id,
    },
  ]);
  const [title, setTitle] = useState("");
  const [reading, setReading] = useState("");
  const [meanings, setMeanings] = useState([""]);

  const addContent = async () => {
    const contentCollectionRef = collection(db, "contents");
    const now = new Date();
    console.log(now);

    const docRef = await addDoc(contentCollectionRef, {
      theme_id: themeToAddContext.id,
      title: title,
      reading: reading,
      created_at: now.getTime(),
    });

    const meaningsCollectionRef = collection(
      db,
      "contents",
      docRef.id,
      "meanings"
    );
    meanings.forEach((meaning, i) => {
      now.setSeconds(now.getSeconds() + 1);
      addDoc(meaningsCollectionRef, {
        meaning: meaning,
        created_at: now.getTime(),
      });
      console.log(now);
    });

    setContent({
      title: title,
      reading: reading,
      meanings: meanings,
    });
  };

  useEffect(() => {
    const themesCollectionRef = collection(db, "themes");
    const getThemes = async () => {
      const q = query(themesCollectionRef, orderBy("created_at", "asc"));
      const data = await getDocs(q);
      setThemes(
        data.docs.map((doc) => ({ name: doc.data().name, id: doc.id }))
      );
    };
    getThemes();
  }, []);

  return (
    <div>
      <section className='bg-white rounded-md shadow-sm py-5 px-5 text-zinc-800'>
        <h2 className='font-bold'>
          <span className='mr-2'>テーマ:</span>
          <select
            className='outline-none w-56 bg-blue-100 p-1 rounded-md'
            defaultValue={themeToAddContext.id}
            onChange={(e) =>
              setThemeToAddContext({
                name: e.target.selectedOptions[0].innerHTML,
                id: e.target.selectedOptions[0].value,
              })
            }
          >
            {themes.map((theme) => {
              return (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              );
            })}
          </select>
        </h2>
        <p className='mt-5'>
          <span className='font-bold mr-2'>タイトル:</span>
          <input
            type='text'
            placeholder='タイトル'
            className='outline-none bg-blue-100 rounded-md p-1 border-2 border-blue-100 focus:border-blue-200 w-52'
            onChange={(e) => setTitle(e.target.value)}
          />
        </p>
        <p className='mt-5'>
          <span className='font-bold mr-2'>読み:</span>
          <input
            type='text'
            placeholder='読み'
            className='outline-none bg-blue-100 rounded-md p-1 border-2 border-blue-100 focus:border-blue-200 w-60'
            onChange={(e) => setReading(e.target.value)}
          />
        </p>

        {meanings.map((meaning, i) => {
          return (
            <p key={i} className='mt-5'>
              <span className='font-bold mr-2'>意味{i + 1}:</span>
              <textarea
                defaultValue={meaning}
                className='outline-none bg-blue-100 rounded-md p-1 border-2 border-blue-100 focus:border-blue-200 resize-none w-full h-24'
                onChange={(e) =>
                  setMeanings((prevMeanings) =>
                    prevMeanings.map((prevMeaning, index) => {
                      return index === i ? e.target.value : prevMeaning;
                    })
                  )
                }
              />
            </p>
          );
        })}
        <button
          className='flex mt-2'
          onClick={() => setMeanings((prevMeanings) => [...prevMeanings, ""])}
        >
          <img src={AddBtn} alt='add' width={16} />
          <span className='text-blue-400 leading-4'>意味を追加</span>
        </button>
      </section>
      {title && meanings[0] ? (
        <button
          className='mt-3 block ml-auto mr-5 bg-blue-500 text-white font-bold text-lg outline-none rounded-md shadow-md px-3 py-2'
          onClick={() => {
            addContent();
            setCanAddContent(false);
          }}
        >
          OK
        </button>
      ) : (
        <button
          className='mt-3 block ml-auto mr-5 bg-gray-500 text-white font-bold text-lg outline-none rounded-md shadow-md px-3 py-2'
          onClick={() => alert("タイトル、読み、意味1を入力して下さい")}
        >
          OK
        </button>
      )}
    </div>
  );
};

export default AddContent;
