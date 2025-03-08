import React from 'react'

export const test = () => {

    useEffect(() => {
        fetch("/api/hello")  // Calls /pages/api/hello.ts
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(err => console.error("Error:", err));
    }, []);
    
  return (
    <div>test</div>
  )
}
