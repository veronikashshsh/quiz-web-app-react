'use client';

import React from 'react'
import SignOutBtn from './_components/SignOutBtn';

function Dashboard() {
  return (
    <div>page
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <SignOutBtn />
      <p>Here you can manage your quizzes, view statistics, and more.</p>
    </div>
  )
}

export default Dashboard