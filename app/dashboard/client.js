'use client'

import { signOut, useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function DashboardClient() {
  const { data: session, status } = useSession()

  if (!session) {
    redirect('/')
  }
  
  if (status == 'loading') return <h1>Loading...</h1>

  return (
    <>
      <h3>{session?.user.name}</h3>
      <h3>{session?.user.email}</h3>
      <button
        onClick={e => {
          e.preventDefault()
          signOut()
        }}
        className="btn btn-danger"
      >
        Logout
      </button>
    </>
  )
}