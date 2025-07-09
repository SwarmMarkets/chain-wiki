import Tab from './Tab'

export type Tab = {
  name: string
  path: string
}

export interface TabsProps {
  tabs: Tab[]
  className?: string
}

const Tabs: React.FC<TabsProps> = ({ tabs, className }) => {
  return (
    <nav className={`flex space-x-2 ${className}`}>
      {tabs.map(tab => (
        <Tab key={tab.path} to={tab.path} label={tab.name} />
      ))}
    </nav>
  )
}

export default Tabs
