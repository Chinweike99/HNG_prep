import React from 'react'



type Status = "pending" | "in-progress" | "completed" | "archived";
type Priority = 'low' | 'medium' | 'high';

// Template literal type combining status and priority
type StatusBadge = `${Status}-${Priority}`;

const validBadge: StatusBadge = 'in-progress-high';
const invalidBadge: StatusBadge = "pending-high";



type BadgeProps = {
    status: Status,
    priority: Priority
};

const StatusBadge: React.FC<BadgeProps> = ({status, priority}) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-semibold';
    const colorClasses = {
        'pending-low': 'bg-yellow-100 text-yellow-800',
        'pending-medium': 'bg-yellow-200 text-yellow-800',
        'pending-high': 'bg-yellow-300 text-yellow-900',
        'in-progress-low': 'bg-blue-100 text-blue-800',
        'in-progress-medium': 'bg-blue-200 text-blue-800',
        'in-progress-high': 'bg-blue-300 text-blue-900',
        'completed-low': 'bg-green-100 text-green-800',
        'completed-medium': 'bg-green-200 text-green-800',
        'completed-high': 'bg-green-700 text-white',
        'archived-low': 'bg-gray-100 text-gray-800',
        'archived-medium': 'bg-gray-200 text-gray-800',
        'archived-high': 'bg-gray-300 text-gray-900',
      }[`${status}-${priority}`];
      

    return (
        <span className={`${baseClasses} ${colorClasses}`}>
            {status} {priority}
        </span>
    )
}


export const ToDoItem: React.FC<{title: string; status: Status; priority: Priority}> = 
    ({title, status, priority}) => {
        return (
            <div>
                <h3>{title}</h3>
                <StatusBadge status={status} priority={priority}/>
            </div>
        )
    }

// export const ToDoItem: React.FC<{ title: string; status: Status; priority: Priority }> = 
//     ({ title, status, priority }) => {
//         return (
//             <div>
//                 <h3>{title}</h3>
//                 <StatusBadge status={status} priority={priority} />
//             </div>
//         );
//     };
