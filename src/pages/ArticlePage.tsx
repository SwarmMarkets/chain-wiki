import { useParams } from "react-router-dom"

const ArticlePage = () => {
  const { id } = useParams()

  return <>
    <h1>
      Article Page ID: {id}
    </h1>
  </>
}

export default ArticlePage