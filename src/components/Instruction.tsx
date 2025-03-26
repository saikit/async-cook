import { ReactElement } from "react"

type ChildrenType = { children?: ReactElement | ReactElement[] }

function Instruction({children} : ChildrenType) {
  return (
    <>{children}</>
  )
}

export default Instruction