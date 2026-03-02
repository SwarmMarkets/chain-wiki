'use client'

import SwitchNetworkAlert from '../SwitchNetworkAlert'
import SideBar from './SideBar'
import { MultiBackend, getBackendOptions } from '@minoru/react-dnd-treeview'
import { DndProvider } from 'react-dnd'
import TopNavBar from './TopNavBar'
import { PropsWithChildren, useEffect, useState } from 'react'
import Drawer from 'src/components/ui-kit/Drawer'
import useBreakpoint from 'src/hooks/ui/useBreakpoint'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isMobile = useBreakpoint('md')

  useEffect(() => {
    if (!isMobile) {
      setIsSidebarOpen(false)
    }
  }, [isMobile])

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <div className='fixed inset-0 flex flex-col'>
        <TopNavBar onMenuClick={() => setIsSidebarOpen(prev => !prev)} />
        <div className='flex flex-1 overflow-hidden'>
          <div className='hidden md:block'>
            <SideBar />
          </div>
          <Drawer
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            position='left'
            className='w-full max-w-xs !bg-gray-100'
          >
            <SideBar
              className='w-full h-full border-r-0'
              onNavigate={() => setIsSidebarOpen(false)}
            />
          </Drawer>
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
