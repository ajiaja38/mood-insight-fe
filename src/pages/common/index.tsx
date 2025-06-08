import React, { useEffect, type JSX } from "react"
import Jumbotron from "../../components/Jumbotron"
import Statistic from "../../components/Statistic"
import CallToAction from "../../components/CallToAction"
import WhyChooseUs from "../../components/WhyChooseUs"
import InnerPeace from "../../components/InnerPeace"
import { useLocation } from "react-router-dom"

const LandingPage: React.FC = (): JSX.Element => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (location.state?.scrollTo === "statistic") {
      const target: HTMLElement | null = document.getElementById("statistic")
      if (target) {
        const yOffset: number = -100
        const y: number =
          target.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: "smooth" })
      }
    }
  }, [location.state])

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
