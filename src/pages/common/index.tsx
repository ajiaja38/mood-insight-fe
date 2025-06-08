import React, { useEffect, type JSX } from "react"
import Jumbotron from "../../components/Jumbotron"
import Statistic from "../../components/Statistic"
import CallToAction from "../../components/CallToAction"
import WhyChooseUs from "../../components/WhyChooseUs"
import InnerPeace from "../../components/InnerPeace"

const LandingPage: React.FC = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Jumbotron />
      <Statistic />
      <WhyChooseUs />
      <InnerPeace />
      <CallToAction />
    </>
  )
}

export default LandingPage
