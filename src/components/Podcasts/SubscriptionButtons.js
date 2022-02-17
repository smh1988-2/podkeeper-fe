import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function SubscriptionButtons({
  currentUser,
  subscribeButtonEnabled,
  subscribedToThisPodcast,
  handleSubscribeClick,
  currentPodcast,
  setSubscribedButtonEnabled,
}) {
  
  function handleSubscribeClick() {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_API_URL}/user_subscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: currentUser.user.id,
        podcast_id: currentPodcast.id,
        activity_type: "subscription",
      }),
    })
      .then((r) => r.json())
      .then(() => {
        console.log("subscribed")
        setSubscribedButtonEnabled(false);
      });
  }

  return (
    <>
      <Row>
        <Col></Col>
        <Col>
          {currentUser.user &&
          subscribeButtonEnabled &&
          !subscribedToThisPodcast ? (
            <Button className="global-button" onClick={handleSubscribeClick}>
              Subscribe
            </Button>
          ) : (
            <Button
              disabled
              className="global-button"
              // change this to handleUnsubscribeClick and enable the button????
              onClick={handleSubscribeClick}
            >
              Subscribed
            </Button>
          )}
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}

export default SubscriptionButtons;
