import React, { FC } from "react";

type Props = {
  onNext?: () => void;
  onPrev?: () => void;
};

const SalesListingFormStep: FC<Props> = ({ onNext, onPrev }) => {
  return <div>SalesListingFormStep</div>;
};

export default SalesListingFormStep;
