import Image from "next/image";
import { ToDoItem } from "./todo/page";
import ToDoList from "./recursive_type/page";
// iimport  ToDoItem  from "./todo/page";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <ToDoItem 
        title="Welcome to Status"
        status="completed"       // ✅ valid Status
        priority="high"        // ✅ valid Priority
      />

      <ToDoList />
    </div>
  );
}
