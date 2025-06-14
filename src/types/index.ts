import { z } from "zod";
import { ListingSchema } from "../utils/validation";

export interface Listing {
  id: string;
  propertyId: string;
  property: Property;
  organizationId: string;
  organization: Organization;
  tags: any[];
  status:
    | "DRAFT"
    | "PENDING"
    | "BLOCKED"
    | "APPROVED"
    | "REJECTED"
    | "UNDER_CONTRACT"
    | "SOLD"
    | "LEASED"
    | "RENTED"
    | "WITHDRAWN"
    | "EXPIRED";
  title: string;
  description: any;
  type:
    | "RENTAL"
    | "SALE"
    | "LEASE"
    | "AUCTION"
    | "RENT_TO_OWN"
    | "SHORT_TERM"
    | "CO_LIVING";
  coverimage?: string;
  price: string;
  listedDate: string;
  expiryDate: any;
  featured: boolean;
  contactPersonId: string;
  metadata: Metadata;
  views: number;
  createdBy: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
  saleDetails?: SaleDetails;
}

export interface Property {
  id: string;
  name: string;
  address?: Address;
  thumbnail: string;
  addressId: string;
  status: string;
}

export interface Address {
  id: string;
  name: string;
  ward: string;
  county: string;
  village?: string;
  landmark: string;
  latitude?: string;
  metadata?: Record<string, any>;
  longitude?: string;
  subCounty: string;
  postalCode: string;
  description: string;
}

export interface Organization {
  id: string;
  name: string;
  description: string;
}

export interface Metadata {
  amenities: string[];
  attributes: Attributes;
  categories: string[];
}

export interface Attributes {
  [attribiteNameOrId: string]: string;
}

export interface SaleDetails {
  id: string;
  listingId: string;
  downPayment?: string;
  priceNegotiable: boolean;
  titleDeedReady: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ListingFormData = z.infer<typeof ListingSchema>;
export interface OwnershipType {
  id: string;
  name: string;
  description?: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface FinancingOption {
  id: string;
  name: string;
  description?: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}
