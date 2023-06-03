import { db, auth } from "@/lib/firebase/index";
import { collection, addDoc, writeBatch, doc } from "firebase/firestore";

export const createBoard = async (data) => {
  try {
    const docRef = await addDoc(
      collection(db, "users", auth.currentUser.uid, "boards"),
      {
        name: data.name,
      }
    );

    const batch = writeBatch(db);
    data.columns.forEach((column) => {
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
      batch.set(columnRef, {
        name: column.name,
        color: column.color,
        position: column.position,
      });
    });

    await batch.commit();

    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
