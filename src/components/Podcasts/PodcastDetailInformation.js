import React from "react";

import SubscriptionButtons from "./SubscriptionButtons";

import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import { Rating } from "react-simple-star-rating";

function PodcastDetailInformation({
  currentUser,
  subscribeButtonEnabled,
  subscribedToThisPodcast,
  currentPodcast,
  setSubscribedButtonEnabled,
  handleStarRatingClick,
  starRating
}) {
  const navigate = useNavigate();
  return (
    <div>
      <Col id="podcast-main-image" className="text-center">
        <Button className="back-button" onClick={() => navigate(-1)}>
          <RiArrowLeftLine /> Back
        </Button>
        
        <br />

        <img
          src={currentPodcast.artworkUrl600}
          alt={currentPodcast.collectionName}
          width="60%"
          id="podcast-main-image"
        />
        <br />
        <br />
        <Rating onClick={handleStarRatingClick} ratingValue={starRating} />
        <br />
        <br />
        <SubscriptionButtons
          currentUser={currentUser}
          subscribeButtonEnabled={subscribeButtonEnabled}
          subscribedToThisPodcast={subscribedToThisPodcast}
          currentPodcast={currentPodcast}
          setSubscribedButtonEnabled={setSubscribedButtonEnabled}
        />
      </Col>
    </div>
  );
}

export default PodcastDetailInformation;
