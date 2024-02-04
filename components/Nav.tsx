"use client"
import { finaceContext } from '@/app/FinanceProvider';
import { userContext } from '@/app/UserProvider';
import { BarChart3Icon, LogOut } from 'lucide-react'
import React, { useContext } from 'react'

const Nav = () => {
  const { loading, user,logout } = useContext(userContext);

  return (
    <div>
      {
        loading ? "loading..."
          :
          <header className="flex justify-between mx-auto my-4">
            <div className="flex gap-4 p-2 items-center">
              <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
                <img className="object-cover w-full h-full" src={user?.photoURL + ""} alt="man" />

              </div>
              <small>Hi! {user?.displayName}</small>
            </div>

            <nav className="flex gap-4 px-2 mt-2">
              <button>
                <BarChart3Icon />
              </button>
              <button onClick={(e) => logout()} className="flex gap-2 items-center btn btn-danger">
                <LogOut size={20} />
                <p>logout</p>
              </button>
            </nav>
          </header>

      }

    </div>
  )
}

export default Nav
