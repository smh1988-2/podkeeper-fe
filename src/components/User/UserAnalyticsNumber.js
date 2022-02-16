import React from 'react'
import Col from "react-bootstrap/Col";

function UserAnalyticsNumber({userActivity, type, title}) {
  return (
    <Col className="text-center">
            <span className="element" id="element-1">
              {
                userActivity.filter(
                  (act) => act.activity_type === type
                ).length
              }
            </span>
            <br />
            <span className="element" id="element-2">
              {title}
            </span>
          </Col>
  )
}

export default UserAnalyticsNumber