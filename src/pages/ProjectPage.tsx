import RoutePaths from "@src/shared/enums/routes-paths"
import { useId } from "react"
import { Link, generatePath, useNavigate, useParams } from "react-router-dom"


const ProjectPage = () => {
  const { id } = useParams()
  const uniqId = useId()
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(generatePath(RoutePaths.ARTICLE, { id: uniqId }));
  }

  return <>
    <h1>Project Page ID: {id}
    <Link to={generatePath(RoutePaths.ARTICLE, { id: uniqId })}>Go to Article with random id {id}</Link>
      <button onClick={handleClick}>Go to Article with random id {id}</button>
    </h1>
  </>
}

export default ProjectPage