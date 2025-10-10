'use client'

import SwitchNetworkAlert from '../SwitchNetworkAlert'
import SideBar from './SideBar'
import { MultiBackend, getBackendOptions } from '@minoru/react-dnd-treeview'
import { DndProvider } from 'react-dnd'
import TopNavBar from './TopNavBar'
import { PropsWithChildren } from 'react'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <div className='fixed inset-0 flex flex-col'>
        <TopNavBar />
        <div className='flex flex-1 overflow-hidden'>
          <SideBar />
          <div className='flex-1 flex flex-col overflow-hidden'>
            <SwitchNetworkAlert />
            <main className='flex-1 overflow-y-auto'>{children}</main>
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

export default Layout
