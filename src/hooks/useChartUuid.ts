import { useLocation } from "react-router-dom";
import { extractIdFromPath } from "@havena/esm-core-api";

export const usePropertyChartProperty = () => {
  const location = useLocation();
  const pathName = location.pathname;
  return extractIdFromPath(pathName, "/dashboard/properties");
};

export const useListingChartListing = () => {
  const location = useLocation();
  const pathName = location.pathname;
  return extractIdFromPath(pathName, "/dashboard/listings");
};
