import React from "react"
import { Spin } from "antd"

const LoadingOverlay: React.FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <Spin size="large" tip="Loading..." />
    </div>
  )
}

export default LoadingOverlay
