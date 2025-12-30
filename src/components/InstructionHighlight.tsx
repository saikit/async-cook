import { twColors } from "@/lib/constants"
import { ReactNode } from "react"

function InstructionHighlights({
  children,
  searchWords
}: {
  children: ReactNode
  searchWords: Array<string[]>
}) {

  const wholeMatchIndex = searchWords.findIndex(terms => {
        const regex = new RegExp(`^${terms.join(" ").replace(/[*()]/g, '')}$`, "i")
        return regex.test(children ? children.toString() : "")
  })

  if(wholeMatchIndex > -1) {
    return <strong className={twColors[wholeMatchIndex]}>{children}</strong>
  } else {
    const partialatchIndex = searchWords.findIndex(terms =>
        terms.some(term => {
            const regex = new RegExp(`\\b${term.replace(/[*()]/g, '')}.*`, "i")
            return regex.test(children ? children.toString() : "")
        })
    )
    return <strong className={partialatchIndex > -1 ? twColors[partialatchIndex] : ""}>{children}</strong>
 }
}

export default InstructionHighlights