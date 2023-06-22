import { db, auth } from "@/lib/firebase/index";
import {
  collection,
  writeBatch,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

export const editBoard = async (id, name, columns) => {
  try {
    await setDoc(doc(db, "users", auth.currentUser.uid, "boards", id), {
      name: name,
    });

    const batch = writeBatch(db);
    columns.forEach((column, i) => {
      const columnRef = doc(
        collection(db, "users", auth.currentUser.uid, "columns")
      );
      if (column.name)
        batch.set(columnRef, {
          name: column.name,
          color: column.color,
          position: i,
          board: id,
        });
    });

    await batch.commit();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const editTask = async (id, name, description, subtasks, column) => {
  if (name === "") return;

  try {
    await setDoc(doc(db, "users", auth.currentUser.uid, "tasks", id), {
      name: name,
      description: description,
      column: column,
    });

    const batch = writeBatch(db);
    subtasks.forEach((subtask, i) => {
      const subtaskRef = doc(
        db,
        "users",
        auth.currentUser.uid,
        "subtasks",
        subtask.id
      );
      if (subtask.name)
        batch.set(subtaskRef, {
          name: subtask.name,
          position: i,
          isDone: subtask.isDone,
          task: id,
        });
    });

    await batch.commit();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const deleteSubtask = async (id) => {
  await deleteDoc(doc(db, "users", auth.currentUser.uid, "subtasks", id));
};
