import { db, auth } from "@/lib/firebase/index";
import {
  collection,
  addDoc,
  writeBatch,
  doc,
  onSnapshot,
  orderBy,
  query,
  getDocs,
} from "firebase/firestore";

export const createBoard = async (name, columns) => {
  try {
    const docRef = await addDoc(
      collection(db, "users", auth.currentUser.uid, "boards"),
      {
        name: name,
      }
    );

    const batch = writeBatch(db);
    columns.forEach((column, i) => {
      const columnRef = doc(
        collection(
          db,
          "users",
          auth.currentUser.uid,
          "boards",
          docRef.id,
          "columns"
        )
      );
      if (column.name)
        batch.set(columnRef, {
          name: column.name,
          color: column.color,
          position: i,
        });
    });

    await batch.commit();

    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getBoards = async (uid) => {
  let boards = [];

  const q = query(collection(db, "users", uid, "boards"));
  const unsub = onSnapshot(q, (querySnapshot) => {
    boards = [];
    querySnapshot.forEach((doc) => {
      boards.push({ id: doc.id, ...doc.data() });
    });

    return boards;
  });

  return boards;
};
