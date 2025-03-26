type Prop = {
    name: string,
    children: React.ReactNode,
    status: "ready" | "active" | "complete"
}

const Ingredient = ({name, status, children} : Prop) => {

  const content = (
    (status === "active") ?
      <li key={name} className={status}><b>{children}</b></li>
    :
    (status === "complete") ?
      <li key={name} className={status}><s>{children}</s></li>
    :
      <li key={name} className={status}>{children}</li>
  )

  return content
}

export default Ingredient