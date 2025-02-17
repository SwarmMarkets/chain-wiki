import { Outlet } from 'react-router-dom'

// import Header from './Header'
import SwitchNetworkAlert from '../SwitchNetworkAlert'
import SideBar from './SideBar'

const Layout = () => {
  return (
    <div className='flex h-screen'>
      <SideBar />

      <div className='flex flex-col flex-1'>
        <SwitchNetworkAlert />

        {/* <Header /> */}

        <main className='flex-1 p-4 overflow-auto bg-gray-50'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
