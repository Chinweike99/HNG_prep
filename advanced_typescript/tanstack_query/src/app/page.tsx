// import Image from "next/image";
// import { TodoList } from "@/Components/TodoList";
// import { UserTodos } from "@/Components/UserTodos";

import { AddTodo } from "@/Components/AddTodo";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* <TodoList /> */}
      {/* <UserTodos userId={1}/> */}
      <AddTodo userId={2}/>
    </div>
  );
}
