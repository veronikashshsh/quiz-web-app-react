'use client'

import React from 'react'
import NavBar from '../components/Navbar'
import { StatsData } from '../../data/statsData';
import { StatCard } from './components/StatsCard';
import { useStats } from '../../hooks/useStats';

function StatsPage() {
    const stats = useStats()
  return (
    <div  className="flex h-screen bg-gray-100">
        <NavBar/>
         <div className=' max-w-5xl mx-auto px-6 py-8'>
           <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Statistics & Progress
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Here's an overview of your learning progress
          </p>
        </div>

         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {StatsData.map((stat) => {
                    const Icon = stat.icon;
                     return (
                     <StatCard
                        key={stat.key}
                        label={stat.label}
                        value={stats[stat.key]}
                        icon={Icon}
                        color={stat.color}
                        bg={stat.bg}
                    />
                    );
                  })}
           </div>
       </div>
       </div>
  )
}

export default StatsPage

