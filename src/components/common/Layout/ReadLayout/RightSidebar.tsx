import Content from 'src/components/common/Layout/ReadLayout/Content'

const RightSidebar = () => {
  const contentElem = document.getElementById(
    'read-page-content'
  ) as HTMLDivElement

  return (
    <aside className='col-span-2'>
      <Content contentElem={contentElem} />
    </aside>
  )
}

export default RightSidebar
