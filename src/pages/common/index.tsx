import React, { type JSX } from "react"
import Jumbotron from "../../components/Jumbotron"
import Statistic from "../../components/Statistic"

const LandingPage: React.FC = (): JSX.Element => {
  return (
    <div>
      <Jumbotron />
      <Statistic />
    </div>
  )
}

export default LandingPage
