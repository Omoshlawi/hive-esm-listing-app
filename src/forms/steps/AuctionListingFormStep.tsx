import React, { FC } from "react";
type Props = {
  onNext?: () => void;
  onPrev?: () => void;
};
const AuctionListingFormStep: FC<Props> = ({ onNext, onPrev }) => {
  return <div>AuctionListingFormStep</div>;
};

export default AuctionListingFormStep;
