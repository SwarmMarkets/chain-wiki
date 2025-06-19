import { Outlet } from 'react-router-dom'

// import Header from './Header'
import SwitchNetworkAlert from '../SwitchNetworkAlert'
import SideBar from './SideBar'
import { MultiBackend, getBackendOptions } from '@minoru/react-dnd-treeview'
import { DndProvider } from 'react-dnd'
import TopNavBar from './TopNavBar'

const Layout = () => {
  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <div className='fixed inset-0 flex flex-col'>
        <TopNavBar />
        <div className='flex flex-1 overflow-hidden'>
          <SideBar />
          <div className='flex-1 flex flex-col overflow-hidden'>
            <SwitchNetworkAlert />
            <main className='flex-1 overflow-y-auto'>
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

export default Layout
