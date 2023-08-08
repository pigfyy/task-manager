import { db, auth } from "@/lib/firebase/index";
import {
  collection,
  writeBatch,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

export const editBoard = async (id, name, columns, prevColumns) => {
  try {
    await setDoc(doc(db, "users", auth.currentUser.uid, "boards", id), {
      name: name,
    });

    const batch = writeBatch(db);

    prevColumns
      .filter((column) => !columns.includes(column))
      .forEach((column) => {
        batch.delete(
          doc(db, "users", auth.currentUser.uid, "columns", column.id)
        );
      });

    columns.forEach((column, i) => {
      const columnRef = doc(
        db,
        "users",
        auth.currentUser.uid,
        "columns",
        column.id
      );
      if (column.name)
        batch.set(columnRef, {
          id: column.id,
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

export const deleteTaskAndSubtasks = async (id, subtasks) => {
  const batch = writeBatch(db);

  batch.delete(doc(db, "users", auth.currentUser.uid, "tasks", id));

  subtasks.forEach((subtask) => {
    batch.delete(
      doc(db, "users", auth.currentUser.uid, "subtasks", subtask.id)
    );
  });

  await batch.commit();
};

export const deleteBoard = async (id, columns, tasks, subtasks) => {
  try {
    const batch = writeBatch(db);

    batch.delete(doc(db, "users", auth.currentUser.uid, "boards", id));

    columns.forEach((column) => {
      batch.delete(
        doc(db, "users", auth.currentUser.uid, "columns", column.id)
      );
    });

    tasks.forEach((task) => {
      batch.delete(doc(db, "users", auth.currentUser.uid, "tasks", task.id));
    });

    subtasks.forEach((subtask) => {
      batch.delete(
        doc(db, "users", auth.currentUser.uid, "subtasks", subtask.id)
      );
    });

    await batch.commit();
    return true;
  } catch (e) {
    console.error("Error deleting document: ", e);
    return false;
  }
};
