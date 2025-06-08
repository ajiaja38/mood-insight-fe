import React, { useEffect, type JSX } from "react"
import Jumbotron from "../../components/Jumbotron"
import Statistic from "../../components/Statistic"
import CallToAction from "../../components/CallToAction"

const LandingPage: React.FC = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Jumbotron />
      <Statistic />
      <CallToAction />
    </>
  )
}

export default LandingPage
