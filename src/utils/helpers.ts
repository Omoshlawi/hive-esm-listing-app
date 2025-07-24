import { DeepPartial } from "react-hook-form";
import { Listing, ListingFormData } from "../types";

// Enhanced status color mapping with better visual hierarchy
export const getStatusColor = (status: string) => {
  switch (status) {
    case "BLOCKED":
      return "red";
    case "DRAFT":
      return "blue";
    case "ARCHIVED":
      return "gray";
    case "APPROVED":
      return "green";
    case "REJECTED":
      return "red";
    case "PAUSED":
      return "yellow";
    case "PENDING":
      return "orange";
    default:
      return "gray";
  }
};

// const getStatusColor = (status: string) => {
//   const colors = {
//     DRAFT: "gray",
//     PENDING: "yellow",
//     APPROVED: "green",
//     REJECTED: "red",
//     SOLD: "blue",
//     UNDER_CONTRACT: "orange",
//     LEASED: "teal",
//     RENTED: "cyan",
//     WITHDRAWN: "red",
//     EXPIRED: "orange",
//   };
//   return colors[status as keyof typeof colors] || "gray";
// };
// Enhanced status variant for better visibility
export const getStatusVariant = (status: string, colorScheme: string) => {
  switch (status) {
    case "BLOCKED":
    case "REJECTED":
      return "filled";
    case "APPROVED":
      return "filled";
    case "PENDING":
      return colorScheme === "dark" ? "light" : "outline";
    case "PAUSED":
      return "light";
    case "DRAFT":
      return colorScheme === "dark" ? "light" : "outline";
    case "ARCHIVED":
      return "light";
    default:
      return colorScheme === "dark" ? "light" : "outline";
  }
};

export const getListingTypeColor = (type: Listing["type"]) => {
  switch (type) {
    case "RENTAL":
      return "teal";
    case "SALE":
      return "blue";
    case "LEASE":
      return "purple";
    case "AUCTION":
      return "orange";
    case "RENT_TO_OWN":
      return "cyan";
    case "SHORT_TERM":
      return "pink";
    case "CO_LIVING":
      return "green";
    default:
      return "gray";
  }
};

export const getListingFormDefaultValues = (
  listing?: Listing
): DeepPartial<ListingFormData> => {
  return {
    title: listing?.title ?? undefined,
    description: listing?.description ?? undefined,
    expiryDate: listing?.expiryDate ?? undefined,
    featured: listing?.featured ?? undefined,
    tags: listing?.tags ?? [],
    price: listing?.price ? Number(listing.price) : undefined,
    type: listing?.type ?? undefined,
    contactPersonId: listing?.contactPersonId ?? undefined,
    propertyId: listing?.propertyId,
    saleDetails: listing?.saleDetails
      ? {
          downPayment: listing.saleDetails.downPayment
            ? parseFloat(listing.saleDetails.downPayment)
            : undefined,
          priceNegotiable: listing.saleDetails.priceNegotiable,
          titleDeedReady: listing.saleDetails.titleDeedReady,
          ownershipTypeId: listing.saleDetails?.ownershipType?.id ?? undefined,
          financingOptions: listing?.saleDetails?.financingOptions ?? [],
        }
      : undefined,
    auctionDetails: listing?.auctionDetails
      ? {
          auctionEnd: listing?.auctionDetails
            ? new Date(listing?.auctionDetails?.auctionEnd)
            : undefined,
          auctionStart: listing?.auctionDetails
            ? new Date(listing?.auctionDetails?.auctionStart)
            : undefined,

          bidIncrement: listing?.auctionDetails
            ? parseFloat(listing?.auctionDetails?.bidIncrement)
            : undefined,
          reservePrice: listing?.auctionDetails
            ? parseFloat(listing?.auctionDetails?.reservePrice)
            : undefined,
          startingBid: listing?.auctionDetails
            ? parseFloat(listing?.auctionDetails?.startingBid)
            : undefined,
          requireBidderApproval:
            listing?.auctionDetails?.requireBidderApproval ?? undefined,
          requirePreRegistration:
            listing?.auctionDetails?.requirePreRegistration ?? undefined,
        }
      : undefined,
    leaseDetails: listing?.leaseDetails
      ? {
          allowedUses: listing?.leaseDetails?.allowedUses,
          leaseTermInMoths:
            listing?.leaseDetails?.leaseTermInMoths ?? undefined,
          renewalAllowed: listing?.leaseDetails?.renewalAllowed,
          securityDeposit: listing?.leaseDetails?.securityDeposit
            ? parseFloat(listing?.leaseDetails?.securityDeposit)
            : undefined,
        }
      : undefined,
    rentalDetails: listing?.rentalDetails
      ? {
          furnished: listing?.rentalDetails?.furnished,
          availableFrom: listing?.rentalDetails?.availableFrom
            ? new Date(listing?.rentalDetails?.availableFrom)
            : undefined,
          minimumStay: listing?.rentalDetails?.minimumStay ?? undefined,
          rentPeriod: listing.rentalDetails?.rentPeriod ?? undefined,
          utilities: listing.rentalDetails?.utilities ?? undefined,
          securityDeposit: listing?.rentalDetails?.securityDeposit
            ? parseFloat(listing?.rentalDetails?.securityDeposit)
            : undefined,
        }
      : undefined,
  };
};
