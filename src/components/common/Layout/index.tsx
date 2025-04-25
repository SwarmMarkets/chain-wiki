import { Outlet } from 'react-router-dom'

// import Header from './Header'
import SwitchNetworkAlert from '../SwitchNetworkAlert'
import SideBar from './SideBar'
import { MultiBackend, getBackendOptions } from '@minoru/react-dnd-treeview'
import { DndProvider } from 'react-dnd'

const Layout = () => {
  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <div className='flex h-screen'>
        <SideBar />

        <div className='flex flex-col flex-1'>
          <SwitchNetworkAlert />

          <main className='flex-1 overflow-auto'>
            <Outlet />
          </main>
        </div>
      </div>
    </DndProvider>
  )
}

export default Layout
