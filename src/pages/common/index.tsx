import React, { useEffect, type JSX } from "react"
import Jumbotron from "../../components/Jumbotron"
import Statistic from "../../components/Statistic"

const LandingPage: React.FC = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <Jumbotron />
      <Statistic />
    </div>
  )
}

export default LandingPage
