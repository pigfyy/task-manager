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
  setDoc,
} from "firebase/firestore";

export const editBoard = async (id, name, columns) => {
  try {
    await setDoc(doc(db, "users", auth.currentUser.uid, "boards", id), {
      name: name,
    });

    const batch = writeBatch(db);
    columns.forEach((column, i) => {
      const columnRef = doc(
        collection(db, "users", auth.currentUser.uid, "boards", id, "columns")
      );
      if (column.name)
        batch.set(columnRef, {
          name: column.name,
          color: column.color,
          position: i,
        });
    });

    await batch.commit();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const editTask = async (id, name, description, subtasks, column) => {
  try {
    await setDoc(doc(db, "users", auth.currentUser.uid, "tasks", id), {
      name: name,
      description: description,
      column: column,
    });

    const batch = writeBatch(db);
    subtasks.forEach((subtask, i) => {
      const subtaskRef = doc(
        collection(db, "users", auth.currentUser.uid, "tasks", id, "subtasks")
      );
      if (subtask)
        batch.set(subtaskRef, {
          name: subtask,
          position: i,
        });
    });

    await batch.commit();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
