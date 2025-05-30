import { useEffect } from "react"

interface props {
  title: string
}

const UseTitle: React.FC<props> = ({ title }) => {
  useEffect(() => {
    if (!title) document.title = "Mood Insight"
    else document.title = `Mood Insight | ${title}`
  }, [title])

  return null
}

export default UseTitle
