import Content from 'src/components/common/Layout/ReadLayout/Content'

const RightSidebar = () => {
  const contentElem = document.getElementById(
    'read-page-content'
  ) as HTMLDivElement

  return (
    <aside className='w-1/6 h-screen overflow-y-auto sticky top-24'>
      <Content contentElem={contentElem} />
    </aside>
  )
}

export default RightSidebar
