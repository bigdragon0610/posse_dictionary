import { AddContentContext } from "../App";
import { useState, useEffect, useContext } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const Title = ({ id, title, reading, setContent }) => {
  const [meanings, setMeanings] = useState([]);
  const { setCanAddContent } = useContext(AddContentContext);

  useEffect(() => {
    const getMeanings = async () => {
      const meaningsCollectionRef = collection(db, "contents", id, "meanings");
      const q = query(meaningsCollectionRef, orderBy("created_at", "asc"));
      const data = await getDocs(q);
      setMeanings(
        data.docs.map((doc) => {
          return doc.data().meaning;
        })
      );
    };
    getMeanings();
  }, []);

  return (
    <li
      className='mt-3'
      onClick={() => {
        setContent({
          title: title,
          reading: reading,
          meanings: [...meanings],
        });
        setCanAddContent(false);
      }}
    >
      {title}
    </li>
  );
};

export default Title;
