"use client";

import { useQuery } from "@tanstack/react-query";

async function fetchTodos() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    if(!response.ok){
        throw new Error("Network response was not ok");
    }
    return response.json();
}


export function TodoList(){
    const {data, error, isLoading} = useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
    });

    if(isLoading) return <div>Loading ... <p>Please Wait a bit</p> </div>;
    if(error) return <div>Error: {error.message}</div>;

    return (
        <ul>
            {
                data.map((todo: {id: number; title: string}) => (
                    <li key={todo.id} className="mt-3">
                        {todo.title}
                    </li>
                ))
            }
        </ul>
    )
    
}

