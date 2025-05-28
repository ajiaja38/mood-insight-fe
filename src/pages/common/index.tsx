import React, { type JSX } from "react"
import { Button } from "antd"
import { RadiusUprightOutlined } from "@ant-design/icons"
import { useNotification } from "../../hooks/useNotification"

const LandingPage: React.FC = (): JSX.Element => {
  const { openNotification } = useNotification()

  return (
    <div className="w-full p-4">
      <Button
        icon={<RadiusUprightOutlined />}
        type="primary"
        onClick={(): void =>
          openNotification({
            message: "Hello World",
            description: "This is a notification message",
            type: "success",
          })
        }
      >
        Primary
      </Button>
    </div>
  )
}

export default LandingPage
