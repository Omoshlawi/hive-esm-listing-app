import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import { ListingFormData } from "../../types";
type Props = {
  onNext?: () => void;
  onPrev?: () => void;
};
const RentalListingFormStep: FC<Props> = ({ onNext, onPrev }) => {
  const form = useFormContext<ListingFormData>();
  return <div>RentalListingFormStep</div>;
};

export default RentalListingFormStep;
