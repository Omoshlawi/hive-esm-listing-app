import React, { FC } from "react";
type Props = {
  onNext?: () => void;
  onPrev?: () => void;
};
const LeaseListingFormStep: FC<Props> = ({ onNext, onPrev }) => {
  return <div>LeaseListingFormStep</div>;
};

export default LeaseListingFormStep;
