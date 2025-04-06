"use client"

import { UserTodos } from '@/Components/UserTodos'
import React from 'react'

const page = () => {
  return (
    <div>
      <UserTodos userId={2}/>
    </div>
  )
}

export default page
