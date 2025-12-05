import { Button } from "./ui/button"
import { forwardRef, ReactElement } from "react"

type ChildrenType = { children?: ReactElement | ReactElement[] }

const ActionButton = forwardRef<HTMLButtonElement, ChildrenType>(({children, ...props}, ref) => (
    <Button ref={ref} {...props} className="w-full sm:w-auto mb-2" variant="outline">{children}</Button>
));

export default ActionButton