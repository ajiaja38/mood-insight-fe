import { theme } from "antd"
import { Content } from "antd/es/layout/layout"
import React, { type JSX } from "react"

const Container: React.FC<{ children: React.ReactNode }> = ({
  children,
}): JSX.Element => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <Content
      style={{
        padding: 24,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        maxWidth: "100%",
        overflow: "auto",
        border: "1px solid #d9d9d9",
      }}
    >
      {children}
    </Content>
  )
}

export default Container
