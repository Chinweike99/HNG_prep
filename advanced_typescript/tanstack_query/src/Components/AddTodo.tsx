// Mutation (Creating/Updating Data)
'use client';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";



async function addTodo(newTodo: {title: string; userId: number}){
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    if(!response.ok) throw new Error("Failed to add todo");
    return response.json();
}

export function AddTodo({userId}: {userId: number}){
    const querClient = useQueryClient();
    const [title, setTitle] = useState('');

    const mutation = useMutation({
        mutationFn: addTodo,
        onSuccess: () =>{
            <div>Todo Added</div>
            querClient.invalidateQueries({queryKey: ['todos', userId]});
            setTitle('')
        }
    })

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        mutation.mutate({title, userId});
    }

    return (
        <form action="" onSubmit={handleSubmit}>
            <input type="text" 
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder="Create todo"
            />

            <button>
                {mutation.isPending ? "Adding todo ..." : "Add todo"}
            </button>
            {mutation.isError && <div>Error: {mutation.error.message}</div>}
        </form>
    )
}



