import { Outlet } from 'react-router-dom'
import SwitchNetworkAlert from './SwitchNetworkAlert'
import Header from './Header'

const Layout = () => {
  return (
    <div className='flex h-screen'>
      <aside className='w-64 bg-gray-100 text-white p-4 flex flex-col'>
        <div className='text-xl font-bold mb-4'>Sidebar</div>
      </aside>

      <div className='flex flex-col flex-1'>
        <SwitchNetworkAlert />

        <Header />

        <main className='flex-1 p-4 overflow-auto bg-gray-50'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
