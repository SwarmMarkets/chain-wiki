interface PageProps {
  params: {
    nftSlugOrId: string
  }
}

const Page = ({ params }: PageProps) => {
  return <h1 className='text-primary'>Hello, Next.js {params.nftSlugOrId}</h1>
}

export default Page
