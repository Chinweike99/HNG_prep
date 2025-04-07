'use client'

import { useQuery } from "@tanstack/react-query";
// import { error } from "console";

async function fetchUser(userId: number){
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if(!response.ok){
        throw new Error ("Error getting user");
        // console.log("Error getting user")
    }
    return response.json();
}


async function fetchUserTodos(userId: number){
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
    if(!response.ok) throw new Error ("Unable to fetch todo");
    return response.json();
}


//Tanstack
export function UserTodos({userId}: {userId: number}){
    //First fetch the user
    const {data: user} = useQuery({
        queryKey: ['user', userId],
        queryFn: ()=> fetchUser(userId)
    });

    //Then Fetch the user's todo's (depends on thne user being loaded)
    const {data: todos} = useQuery({
        queryKey: ['todos', userId],
        queryFn: ()=>fetchUserTodos(userId),
        enabled: !!user, // Only fetch when user exists
    })

    if(!user) return <div>Loading user ...</div>;
    if(!todos) return <div>Loading todos</div>

    return (
        <div>
            <h2>{user.name}</h2>
            <ul>
                {
                    todos.map((todo: {id: number; title: string}) => (
                        <li key={todo.id}>
                            {todo.title}
                        </li>
                    ))
                }
            </ul>
        </div>
    )


}






