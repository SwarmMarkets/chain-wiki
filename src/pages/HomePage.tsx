import RoutePaths from "@src/shared/enums/routes-paths";
import { useId } from "react";
import { generatePath, useNavigate } from "react-router-dom";

const HomePage = () => {
  const id = useId()
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(generatePath(RoutePaths.PROJECT, { projectId: id }));
  }

  return <>
    <h1>Home Page
      <button onClick={handleClick}>Go to Project with random id {id}</button>
    </h1>
  </>
}

export default HomePage