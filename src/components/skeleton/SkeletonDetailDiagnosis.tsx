import React, { type JSX } from "react"
import Container from "../Content/Container"
import { Divider, Skeleton } from "antd"

const SkeletonDetailDiagnosis: React.FC = (): JSX.Element => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Container>
        <Skeleton active />
      </Container>
      <Container>
        <Skeleton active />
      </Container>
      <div className="lg:col-span-2">
        <Container>
          <Skeleton active />
          <Divider />
          <div className="flex flex-col gap-y-1.5">
            <Skeleton.Input
              active
              size="small"
              style={{
                width: "100%",
              }}
            />
            <Skeleton.Input
              active
              size="small"
              style={{
                width: "100%",
              }}
            />
            <Skeleton.Input
              active
              size="small"
              style={{
                width: "100%",
              }}
            />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default SkeletonDetailDiagnosis
