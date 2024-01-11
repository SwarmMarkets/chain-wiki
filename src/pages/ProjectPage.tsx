import RoutePaths from "@src/shared/enums/routes-paths"
import { useId } from "react"
import { Link, generatePath, useNavigate, useParams } from "react-router-dom"


const ProjectPage = () => {
  const { projectId } = useParams()
  const uniqId = useId()
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(generatePath(RoutePaths.PROJECT + RoutePaths.ARTICLE, { articleId: uniqId, projectId }));
  }

  return <>
    <h1>Project Page ID: {projectId}
    <Link to={generatePath(RoutePaths.PROJECT + RoutePaths.ARTICLE, { articleId: uniqId, projectId })}>Go to Article with random id {projectId}</Link>
      <button onClick={handleClick}>Go to Article with random id {projectId}</button>
    </h1>
  </>
}

export default ProjectPage