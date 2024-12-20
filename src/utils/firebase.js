import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBEDXqueTvghBZC72Kp4WP9vj62OdwaiG0",
  authDomain: "food-villa-a1627.firebaseapp.com",
  projectId: "food-villa-a1627",
  storageBucket: "food-villa-a1627.firebasestorage.app",
  messagingSenderId: "98648703733",
  appId: "1:98648703733:web:89d86086e466cfea3abbbc",
  measurementId: "G-WCEXJ8VV04",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

export default app;
