import { CalendarEntity } from "../types/calendar";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

export class CalendarRecords implements CalendarEntity {
  allDay: boolean;
  endDate: string;
  notes?: string;
  startDate: string;
  title: string;

  constructor(obj: CalendarEntity) {
    this.allDay = obj.allDay;
    this.endDate = obj.endDate;
    this.notes = obj.notes;
    this.startDate = obj.startDate;
    this.title = obj.title;
  }

  static async createEvent(user_id: string, data: any) {
    try {
      const eventRef = collection(FIRESTORE_DB, `users/${user_id}/calendar`);
      await addDoc(eventRef, {
        ...data,
      });
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  }

  static async readEvents(user_id: string) {
    const eventsRef = collection(FIRESTORE_DB, `users/${user_id}/calendar`);
    const querySnapshot = await getDocs(eventsRef);
    const tasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return tasks;
  }

  static async updateEvent(user_id: string, updatedTask: any) {
    const eventId = Object.keys(updatedTask)[0];
    const data = updatedTask[eventId];

    const taskDocRef = doc(FIRESTORE_DB, `users/${user_id}/calendar`, eventId);
    await updateDoc(taskDocRef, { ...data });
  }

  static async deleteEvent(user_id: string, eventId: any) {
    const taskDocRef = doc(FIRESTORE_DB, `users/${user_id}/calendar`, eventId);
    await deleteDoc(taskDocRef);
    return "deleted";
  }
}
