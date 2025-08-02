import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { DailyData, StorageData } from "../types";

// Load Firebase config from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Single document since only one user
const COLLECTION = "nutrition-tracker";
const DOC_ID = "single-user";

export const loadData = async (): Promise<StorageData> => {
  try {
    const docRef = doc(db, COLLECTION, DOC_ID);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? (snapshot.data() as StorageData) : {};
  } catch (error) {
    console.error("Error loading data:", error);
    return {};
  }
};

export const saveData = async (data: StorageData): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION, DOC_ID);
    await setDoc(docRef, data);
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

export const saveDailyData = async (date: string, dayData: DailyData): Promise<void> => {
  const allData = await loadData();
  allData[date] = dayData;
  await saveData(allData);
};

export const getDailyData = async (date: string): Promise<DailyData> => {
  const allData = await loadData();
  return allData[date] || {
    date,
    foods: [],
    activities: [],
    summary: "",
  };
};
