import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import Sidebar from "./Sidebar";

export default function App() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
