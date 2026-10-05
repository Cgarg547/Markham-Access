import {
  cert,
  getApps,
  initializeApp,
} from "firebase-admin/app";

import {
  getFirestore,
  Timestamp,
} from "firebase-admin/firestore";

import serviceAccount from "../firebase-service-account.json";

/* =========================================================
 * FIREBASE INITIALIZATION
 * ======================================================= */

const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert(
          serviceAccount as any
        ),
      });

const db = getFirestore(app);

/* =========================================================
 * RESOURCE TYPE
 * ======================================================= */

interface Resource {
  id: string;

  name: string;
  category: string;
  subcategory: string;

  city: string;
  district: string;
  region: string;
  province: string;

  address: string;
  postalCode: string;

  description: string;

  services: string[];
  tags: string[];

  languages: string[];

  transportation: string[];

  eligibility: string;

  phone: string;
  email: string;
  website: string;

  hours: string;

  cost: string;

  appointmentRequired: boolean;
  walkInsAccepted: boolean;
  referralRequired: boolean;
  onlineServices: boolean;

  servesNewcomers: boolean;
  servesLowIncome: boolean;
  servesFamilies: boolean;
  servesSeniors: boolean;
  servesYouth: boolean;
  servesPeopleWithDisabilities: boolean;

  verified: boolean;
  source: string;
}

/* =========================================================
 * GTA RESOURCE BATCH 3
 *
 * Stable IDs are intentionally used.
 *
 * DO NOT use:
 *
 * db.collection("resources").add(...)
 *
 * because that creates random Firestore IDs.
 * ======================================================= */

const resources: Resource[] = [

  /* =======================================================
   * TORONTO — HOUSING
   * ======================================================= */

  {
    id: "toronto-housing-help-support",
    name: "City of Toronto - Housing Help & Support Services",
    category: "Housing",
    subcategory: "Housing Support",

    city: "Toronto",
    district: "",
    region: "Toronto",
    province: "Ontario",

    address: "Toronto, Ontario",
    postalCode: "",

    description:
      "Housing support and referral services for Toronto residents who need help finding or keeping housing, preventing eviction, accessing legal support, or connecting with housing services.",

    services: [
      "Housing Support",
      "Housing Help",
      "Eviction Prevention",
      "Housing Referrals",
      "Tenant Support",
      "Legal Referrals",
      "Affordable Housing Information",
    ],

    tags: [
      "housing",
      "rent",
      "eviction",
      "tenant",
      "homeless",
      "affordable housing",
      "housing help",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
      "TTC",
    ],

    eligibility:
      "Toronto residents and people seeking housing support in Toronto; eligibility varies by program.",

    phone:
      "416-338-4766",

    email: "",

    website:
      "https://www.toronto.ca/community-people/housing-shelter/housing-help-support-services/",

    hours:
      "Varies by service. Emergency shelter Central Intake is available 24/7.",

    cost:
      "Free",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "City of Toronto",
  },

  {
    id: "toronto-central-intake-shelter",
    name: "Toronto Central Intake - Emergency Shelter",
    category: "Housing",
    subcategory: "Emergency Shelter",

    city: "Toronto",
    district: "",
    region: "Toronto",
    province: "Ontario",

    address: "Toronto, Ontario",
    postalCode: "",

    description:
      "24-hour centralized access point for emergency shelter and homelessness services in Toronto.",

    services: [
      "Emergency Shelter",
      "Homelessness Support",
      "Shelter Referral",
      "Housing Referral",
      "Emergency Housing",
    ],

    tags: [
      "shelter",
      "homeless",
      "emergency shelter",
      "housing",
      "sleeping",
      "emergency housing",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
      "TTC",
    ],

    eligibility:
      "People experiencing homelessness or requiring emergency shelter in Toronto.",

    phone:
      "416-338-4766",

    email: "",

    website:
      "https://www.toronto.ca/community-people/community-partners/emergency-shelter-operations/",

    hours:
      "24 hours",

    cost:
      "Free",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: false,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "City of Toronto",
  },

  /* =======================================================
   * TORONTO — LEGAL / TENANT
   * ======================================================= */

  {
    id: "legal-aid-ontario",
    name: "Legal Aid Ontario",
    category: "Legal",
    subcategory: "Legal Assistance",

    city: "Toronto",
    district: "",
    region: "Toronto",
    province: "Ontario",

    address: "Toronto, Ontario",
    postalCode: "",

    description:
      "Legal assistance and information for eligible low-income Ontarians across a range of legal matters.",

    services: [
      "Legal Assistance",
      "Legal Advice",
      "Legal Information",
      "Tenant Legal Support",
      "Family Law Support",
      "Criminal Law Support",
    ],

    tags: [
      "legal",
      "lawyer",
      "legal aid",
      "tenant",
      "eviction",
      "family law",
      "low income",
    ],

    languages: [
      "English",
      "French",
    ],

    transportation: [
      "Public Transit",
      "TTC",
    ],

    eligibility:
      "Eligibility depends on income, legal issue and other Legal Aid Ontario criteria.",

    phone:
      "1-800-668-8258",

    email: "",

    website:
      "https://www.legalaid.on.ca/",

    hours:
      "Varies",

    cost:
      "Free or subsidized depending on eligibility",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "Legal Aid Ontario",
  },

  {
    id: "federation-metro-tenants-associations",
    name: "Federation of Metro Tenants' Associations",
    category: "Legal",
    subcategory: "Tenant Support",

    city: "Toronto",
    district: "",
    region: "Toronto",
    province: "Ontario",

    address: "Toronto, Ontario",
    postalCode: "",

    description:
      "Tenant-focused information, education and support related to rental housing and tenant rights.",

    services: [
      "Tenant Support",
      "Tenant Rights",
      "Housing Information",
      "Eviction Information",
      "Landlord-Tenant Information",
    ],

    tags: [
      "tenant",
      "rent",
      "eviction",
      "landlord",
      "tenant rights",
      "housing",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
      "TTC",
    ],

    eligibility:
      "Tenants and community members seeking information about rental housing and tenant rights.",

    phone:
      "416-921-9494",

    email: "",

    website:
      "https://www.torontotenants.org/",

    hours:
      "Varies",

    cost:
      "Free",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "Federation of Metro Tenants' Associations",
  },

  /* =======================================================
   * TORONTO — HEALTH
   * ======================================================= */

  {
    id: "healthcare-connect-ontario",
    name: "Health811 Ontario",
    category: "Health",
    subcategory: "Health Information",

    city: "Toronto",
    district: "",
    region: "GTA",
    province: "Ontario",

    address: "Ontario",
    postalCode: "",

    description:
      "Ontario health information and navigation service that helps residents connect with health care information and services.",

    services: [
      "Health Information",
      "Health Navigation",
      "Nurse Advice",
      "Health Service Referrals",
    ],

    tags: [
      "health",
      "doctor",
      "nurse",
      "medical",
      "healthcare",
      "clinic",
    ],

    languages: [
      "English",
      "French",
    ],

    transportation: [
      "Phone",
      "Online",
    ],

    eligibility:
      "Ontario residents seeking health information and navigation support.",

    phone:
      "811",

    email: "",

    website:
      "https://www.ontario.ca/page/health811",

    hours:
      "24/7",

    cost:
      "Free",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "Government of Ontario",
  },

  /* =======================================================
   * TORONTO — MENTAL HEALTH
   * ======================================================= */

  {
    id: "camh-toronto",
    name: "CAMH - Centre for Addiction and Mental Health",
    category: "Mental Health",
    subcategory: "Mental Health Services",

    city: "Toronto",
    district: "",
    region: "Toronto",
    province: "Ontario",

    address:
      "1001 Queen Street West, Toronto, ON",

    postalCode:
      "M6J 1H4",

    description:
      "Mental health and addiction services, education, assessment, treatment and community programs.",

    services: [
      "Mental Health Support",
      "Addiction Services",
      "Counselling",
      "Assessment",
      "Treatment",
      "Community Programs",
    ],

    tags: [
      "mental health",
      "addiction",
      "counselling",
      "counseling",
      "depression",
      "anxiety",
      "crisis",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "TTC",
      "Public Transit",
    ],

    eligibility:
      "Eligibility varies by program and service.",

    phone:
      "416-535-8501",

    email: "",

    website:
      "https://www.camh.ca/",

    hours:
      "Varies by service",

    cost:
      "Varies by service",

    appointmentRequired: true,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "CAMH",
  },

  /* =======================================================
   * TORONTO — NEWCOMERS
   * ======================================================= */

  {
    id: "access-alliance-toronto",
    name: "Access Alliance Multicultural Health and Community Services",
    category: "Newcomer Services",
    subcategory: "Multicultural Community Services",

    city: "Toronto",
    district: "",
    region: "Toronto",
    province: "Ontario",

    address:
      "340 College Street, Toronto, ON",

    postalCode:
      "M5T 3A9",

    description:
      "Community health and social services supporting immigrants, refugees and underserved communities.",

    services: [
      "Newcomer Support",
      "Health Services",
      "Settlement Services",
      "Community Support",
      "Social Services",
      "Interpretation",
    ],

    tags: [
      "newcomer",
      "immigrant",
      "refugee",
      "settlement",
      "health",
      "multicultural",
      "community",
    ],

    languages: [
      "English",
      "Multiple Languages",
    ],

    transportation: [
      "TTC",
      "Public Transit",
    ],

    eligibility:
      "Services vary by program and eligibility requirements.",

    phone:
      "416-324-8677",

    email: "",

    website:
      "https://accessalliance.ca/",

    hours:
      "Varies",

    cost:
      "Free or varies by service",

    appointmentRequired: true,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "Access Alliance",
  },

  {
    id: "woodgreen-community-services",
    name: "WoodGreen Community Services",
    category: "Community Services",
    subcategory: "Community Support",

    city: "Toronto",
    district: "East York",
    region: "Toronto",
    province: "Ontario",

    address:
      "815 Danforth Avenue, Toronto, ON",

    postalCode:
      "M4J 1L2",

    description:
      "Community services supporting housing, employment, newcomers, seniors, families, youth and people facing financial challenges.",

    services: [
      "Housing Support",
      "Employment",
      "Newcomer Services",
      "Senior Services",
      "Youth Services",
      "Family Services",
      "Financial Support",
    ],

    tags: [
      "community",
      "newcomer",
      "housing",
      "employment",
      "senior",
      "youth",
      "family",
    ],

    languages: [
      "English",
      "Multiple Languages",
    ],

    transportation: [
      "TTC",
      "Public Transit",
    ],

    eligibility:
      "Eligibility varies by program.",

    phone:
      "416-645-6000",

    email: "",

    website:
      "https://www.woodgreen.org/",

    hours:
      "Varies",

    cost:
      "Free or varies by program",

    appointmentRequired: true,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "WoodGreen Community Services",
  },

  /* =======================================================
   * TORONTO — YOUTH
   * ======================================================= */

  {
    id: "360kids-youth-toronto-gta",
    name: "360°kids",
    category: "Youth Support",
    subcategory: "Youth Housing and Support",

    city: "Richmond Hill",
    district: "",
    region: "York Region",
    province: "Ontario",

    address:
      "Richmond Hill, Ontario",

    postalCode: "",

    description:
      "Youth-focused housing, homelessness prevention and support services serving young people in York Region.",

    services: [
      "Youth Housing",
      "Emergency Housing",
      "Homelessness Support",
      "Youth Counselling",
      "Education Support",
      "Employment Support",
    ],

    tags: [
      "youth",
      "young person",
      "homeless",
      "shelter",
      "housing",
      "education",
      "employment",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
      "YRT",
    ],

    eligibility:
      "Youth eligibility varies by program.",

    phone:
      "905-475-6694",

    email: "",

    website:
      "https://www.360kids.ca/",

    hours:
      "Varies",

    cost:
      "Free",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: false,
    servesSeniors: false,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "360°kids",
  },

  /* =======================================================
   * YORK REGION — HOUSING
   * ======================================================= */

  {
    id: "york-region-housing-services",
    name: "York Region Housing Services",
    category: "Housing",
    subcategory: "Affordable and Subsidized Housing",

    city: "Newmarket",
    district: "",
    region: "York Region",
    province: "Ontario",

    address:
      "17250 Yonge Street, Newmarket, ON",

    postalCode:
      "L3Y 6Z1",

    description:
      "York Region housing services including subsidized housing, affordable housing information, housing supports and homelessness services.",

    services: [
      "Subsidized Housing",
      "Affordable Housing",
      "Housing Applications",
      "Housing Support",
      "Homelessness Support",
      "Emergency Housing",
    ],

    tags: [
      "housing",
      "rent",
      "affordable housing",
      "subsidized housing",
      "homeless",
      "shelter",
    ],

    languages: [
      "English",
      "French",
    ],

    transportation: [
      "YRT",
      "Public Transit",
    ],

    eligibility:
      "Eligibility varies by housing program and household circumstances.",

    phone:
      "1-877-464-9675",

    email: "",

    website:
      "https://www.york.ca/support/housing",

    hours:
      "Varies",

    cost:
      "Free to apply",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "York Region",
  },

  {
    id: "york-region-emergency-housing",
    name: "York Region Emergency Housing Central Intake",
    category: "Housing",
    subcategory: "Emergency Housing",

    city: "Newmarket",
    district: "",
    region: "York Region",
    province: "Ontario",

    address:
      "York Region, Ontario",

    postalCode: "",

    description:
      "24-hour intake service for York Region residents experiencing or at risk of homelessness who need emergency or transitional housing support.",

    services: [
      "Emergency Housing",
      "Emergency Shelter",
      "Transitional Housing",
      "Homelessness Support",
      "Housing Referrals",
    ],

    tags: [
      "emergency shelter",
      "homeless",
      "housing",
      "transitional housing",
      "crisis",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "YRT",
      "Public Transit",
    ],

    eligibility:
      "People experiencing homelessness or at risk of homelessness in York Region.",

    phone:
      "1-877-464-9675",

    email: "",

    website:
      "https://www.york.ca/support/housing/emergency-and-transitional-housing",

    hours:
      "24/7",

    cost:
      "Free",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: false,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "York Region",
  },

  /* =======================================================
   * YORK REGION — FINANCIAL / COMMUNITY
   * ======================================================= */

  {
    id: "york-region-community-support",
    name: "York Region Community Support",
    category: "Financial Assistance",
    subcategory: "Community Support",

    city: "Newmarket",
    district: "",
    region: "York Region",
    province: "Ontario",

    address:
      "17250 Yonge Street, Newmarket, ON",

    postalCode:
      "L3Y 6Z1",

    description:
      "York Region community support information covering financial assistance, housing, childcare, seniors services, newcomer services and Ontario Works.",

    services: [
      "Financial Assistance",
      "Ontario Works",
      "Housing Support",
      "Childcare Support",
      "Senior Services",
      "Newcomer Services",
      "Community Referrals",
    ],

    tags: [
      "financial assistance",
      "Ontario Works",
      "housing",
      "childcare",
      "senior",
      "newcomer",
      "community",
    ],

    languages: [
      "English",
      "French",
    ],

    transportation: [
      "YRT",
      "Public Transit",
    ],

    eligibility:
      "Eligibility varies by program.",

    phone:
      "1-877-464-9675",

    email: "",

    website:
      "https://www.york.ca/support",

    hours:
      "Varies",

    cost:
      "Free",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "York Region",
  },

  /* =======================================================
   * YORK REGION — SENIORS
   * ======================================================= */

  {
    id: "york-region-seniors-services",
    name: "York Region Seniors Services",
    category: "Senior Support",
    subcategory: "Senior Services",

    city: "Newmarket",
    district: "",
    region: "York Region",
    province: "Ontario",

    address:
      "York Region, Ontario",

    postalCode: "",

    description:
      "Programs and support for older adults in York Region including community services, housing-related support and long-term care information.",

    services: [
      "Senior Support",
      "Community Programs",
      "Housing Support",
      "Long-Term Care Information",
      "Community Referrals",
    ],

    tags: [
      "senior",
      "elderly",
      "older adult",
      "long term care",
      "community",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "YRT",
      "Public Transit",
    ],

    eligibility:
      "Programs vary by age and individual circumstances.",

    phone:
      "1-877-464-9675",

    email: "",

    website:
      "https://www.york.ca/support/seniors",

    hours:
      "Varies",

    cost:
      "Free or program dependent",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: false,
    servesSeniors: true,
    servesYouth: false,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "York Region",
  },

  /* =======================================================
   * PEEL — HOUSING
   * ======================================================= */

  {
    id: "peel-region-housing-services",
    name: "Peel Region Housing Services",
    category: "Housing",
    subcategory: "Housing Support",

    city: "Brampton",
    district: "",
    region: "Peel Region",
    province: "Ontario",

    address:
      "10 Peel Centre Drive, Brampton, ON",

    postalCode: "",

    description:
      "Peel Region housing services including affordable housing, community housing, housing applications, homelessness support and housing subsidies.",

    services: [
      "Housing Support",
      "Affordable Housing",
      "Community Housing",
      "Housing Subsidy",
      "Housing Applications",
      "Homelessness Support",
    ],

    tags: [
      "housing",
      "rent",
      "affordable housing",
      "subsidized housing",
      "homeless",
      "eviction",
    ],

    languages: [
      "English",
      "French",
    ],

    transportation: [
      "Brampton Transit",
      "MiWay",
      "Public Transit",
    ],

    eligibility:
      "Eligibility varies according to housing program and household circumstances.",

    phone:
      "905-453-1300",

    email: "",

    website:
      "https://peelregion.ca/housing-social-support/",

    hours:
      "Varies",

    cost:
      "Free to apply",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "Peel Region",
  },

  {
    id: "peel-region-homeless-support",
    name: "Peel Region Homeless Support",
    category: "Housing",
    subcategory: "Homelessness Support",

    city: "Brampton",
    district: "",
    region: "Peel Region",
    province: "Ontario",

    address:
      "Peel Region, Ontario",

    postalCode: "",

    description:
      "Peel Region homelessness support including shelters, transitional housing, street outreach, drop-in programs and housing assistance.",

    services: [
      "Homelessness Support",
      "Emergency Shelter",
      "Street Outreach",
      "Transitional Housing",
      "Drop-In Support",
      "Food Programs",
      "Housing Support",
    ],

    tags: [
      "homeless",
      "shelter",
      "emergency",
      "housing",
      "street outreach",
      "food",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
      "Brampton Transit",
      "MiWay",
    ],

    eligibility:
      "People experiencing homelessness or at risk of homelessness in Peel Region.",

    phone:
      "1-877-848-8481",

    email: "",

    website:
      "https://peelregion.ca/housing-social-support/homeless-support",

    hours:
      "24/7 street helpline",

    cost:
      "Free",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "Peel Region",
  },

  /* =======================================================
   * PEEL — FINANCIAL
   * ======================================================= */

  {
    id: "peel-region-financial-social-support",
    name: "Peel Region Financial and Social Support",
    category: "Financial Assistance",
    subcategory: "Ontario Works and Emergency Assistance",

    city: "Brampton",
    district: "",
    region: "Peel Region",
    province: "Ontario",

    address:
      "Peel Region, Ontario",

    postalCode: "",

    description:
      "Financial and social assistance programs including Ontario Works, emergency assistance, disability-related supports, housing assistance and community resources.",

    services: [
      "Financial Assistance",
      "Ontario Works",
      "Emergency Assistance",
      "Housing Assistance",
      "Disability Benefits",
      "Utility Assistance",
      "Community Referrals",
    ],

    tags: [
      "money",
      "financial assistance",
      "Ontario Works",
      "emergency assistance",
      "rent",
      "utilities",
      "disability",
    ],

    languages: [
      "English",
      "French",
    ],

    transportation: [
      "Public Transit",
      "Brampton Transit",
      "MiWay",
    ],

    eligibility:
      "Eligibility depends on program requirements and financial circumstances.",

    phone:
      "905-453-1300",

    email: "",

    website:
      "https://peelregion.ca/housing-social-support/financial-social-support",

    hours:
      "Varies",

    cost:
      "Free",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "Peel Region",
  },

  /* =======================================================
   * PEEL — EMPLOYMENT
   * ======================================================= */

  {
    id: "peel-region-employment-support-brampton",
    name: "Peel Region Employment Support - Brampton",
    category: "Employment Services",
    subcategory: "Employment Resource Centre",

    city: "Brampton",
    district: "",
    region: "Peel Region",
    province: "Ontario",

    address:
      "10 Peel Centre Drive, Suite B, Brampton, ON",

    postalCode: "",

    description:
      "Employment resources including job search support, career assistance and access to computers, internet, fax and photocopying.",

    services: [
      "Job Search",
      "Employment Support",
      "Career Support",
      "Computer Access",
      "Internet Access",
      "Employment Referrals",
    ],

    tags: [
      "job",
      "employment",
      "career",
      "resume",
      "job search",
      "work",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Brampton Transit",
      "Public Transit",
    ],

    eligibility:
      "Employment support eligibility varies by program.",

    phone:
      "905-453-1300",

    email: "",

    website:
      "https://peelregion.ca/housing-social-support/financial-social-support/employment-support",

    hours:
      "Monday-Friday, 8:30 AM-4:30 PM",

    cost:
      "Free",

    appointmentRequired: true,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: false,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "Peel Region",
  },

  {
    id: "peel-region-employment-support-mississauga",
    name: "Peel Region Employment Support - Mississauga",
    category: "Employment Services",
    subcategory: "Employment Resource Centre",

    city: "Mississauga",
    district: "",
    region: "Peel Region",
    province: "Ontario",

    address:
      "7120 Hurontario Street, Mississauga, ON",

    postalCode: "",

    description:
      "Employment resources and career support including job search assistance and access to computers and internet.",

    services: [
      "Job Search",
      "Employment Support",
      "Career Support",
      "Computer Access",
      "Internet Access",
      "Employment Referrals",
    ],

    tags: [
      "job",
      "employment",
      "career",
      "resume",
      "job search",
      "work",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "MiWay",
      "Public Transit",
    ],

    eligibility:
      "Employment support eligibility varies by program.",

    phone:
      "905-453-1300",

    email: "",

    website:
      "https://peelregion.ca/housing-social-support/financial-social-support/employment-support",

    hours:
      "Monday-Friday, 8:30 AM-4:30 PM",

    cost:
      "Free",

    appointmentRequired: true,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: false,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "Peel Region",
  },

  /* =======================================================
   * PEEL — CHILDCARE
   * ======================================================= */

  {
    id: "peel-region-child-care-subsidy",
    name: "Peel Region Child Care Subsidy",
    category: "Childcare",
    subcategory: "Child Care Financial Assistance",

    city: "Brampton",
    district: "",
    region: "Peel Region",
    province: "Ontario",

    address:
      "Peel Region, Ontario",

    postalCode: "",

    description:
      "Financial assistance that may help eligible families cover the cost of licensed child care.",

    services: [
      "Child Care Subsidy",
      "Childcare Financial Assistance",
      "Family Support",
      "Childcare Information",
    ],

    tags: [
      "childcare",
      "child care",
      "daycare",
      "day care",
      "children",
      "family",
      "subsidy",
    ],

    languages: [
      "English",
      "French",
    ],

    transportation: [
      "Public Transit",
    ],

    eligibility:
      "Eligibility depends on household circumstances and child care requirements.",

    phone:
      "905-791-1585",

    email: "",

    website:
      "https://peelregion.ca/housing-social-support/financial-social-support",

    hours:
      "Varies",

    cost:
      "Subsidized based on eligibility",

    appointmentRequired: true,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: false,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "Peel Region",
  },

  /* =======================================================
   * PEEL — MENTAL HEALTH
   * ======================================================= */

  {
    id: "cmha-peel-dufferin",
    name: "Canadian Mental Health Association - Peel Dufferin",
    category: "Mental Health",
    subcategory: "Mental Health and Addiction",

    city: "Brampton",
    district: "",
    region: "Peel Region",
    province: "Ontario",

    address:
      "Brampton, Ontario",

    postalCode: "",

    description:
      "Mental health, addiction, crisis and community support services for people across Peel and Dufferin.",

    services: [
      "Mental Health Support",
      "Addiction Support",
      "Crisis Support",
      "Counselling",
      "Community Support",
      "Housing Support",
    ],

    tags: [
      "mental health",
      "addiction",
      "counselling",
      "counseling",
      "crisis",
      "anxiety",
      "depression",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
      "Brampton Transit",
      "MiWay",
    ],

    eligibility:
      "Eligibility varies by program.",

    phone:
      "905-451-2123",

    email: "",

    website:
      "https://cmhapeeldufferin.ca/",

    hours:
      "Varies",

    cost:
      "Free or program dependent",

    appointmentRequired: true,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "CMHA Peel Dufferin",
  },

  /* =======================================================
   * DURHAM — HOUSING
   * ======================================================= */

  {
    id: "durham-region-housing-services",
    name: "Durham Region Housing Services",
    category: "Housing",
    subcategory: "Housing Support",

    city: "Whitby",
    district: "",
    region: "Durham Region",
    province: "Ontario",

    address:
      "Durham Region, Ontario",

    postalCode: "",

    description:
      "Regional housing services supporting affordable housing, housing stability and residents experiencing housing challenges.",

    services: [
      "Housing Support",
      "Affordable Housing",
      "Community Housing",
      "Housing Referrals",
      "Homelessness Support",
    ],

    tags: [
      "housing",
      "rent",
      "affordable housing",
      "homeless",
      "shelter",
    ],

    languages: [
      "English",
      "French",
    ],

    transportation: [
      "Durham Region Transit",
      "Public Transit",
    ],

    eligibility:
      "Eligibility varies by housing program.",

    phone:
      "905-666-6239",

    email: "",

    website:
      "https://www.durham.ca/en/living-here/housing.aspx",

    hours:
      "Varies",

    cost:
      "Free",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "Durham Region",
  },

  /* =======================================================
   * DURHAM — SOCIAL SUPPORT
   * ======================================================= */

  {
    id: "durham-region-social-services",
    name: "Durham Region Social Services",
    category: "Financial Assistance",
    subcategory: "Social Assistance",

    city: "Whitby",
    district: "",
    region: "Durham Region",
    province: "Ontario",

    address:
      "Durham Region, Ontario",

    postalCode: "",

    description:
      "Social assistance and community support services for eligible Durham Region residents.",

    services: [
      "Financial Assistance",
      "Ontario Works",
      "Emergency Assistance",
      "Housing Support",
      "Community Referrals",
    ],

    tags: [
      "money",
      "financial",
      "Ontario Works",
      "emergency assistance",
      "rent",
      "food",
    ],

    languages: [
      "English",
      "French",
    ],

    transportation: [
      "Durham Region Transit",
      "Public Transit",
    ],

    eligibility:
      "Eligibility depends on the program and individual circumstances.",

    phone:
      "905-666-6239",

    email: "",

    website:
      "https://www.durham.ca/en/living-here/social-services.aspx",

    hours:
      "Varies",

    cost:
      "Free",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "Durham Region",
  },

  /* =======================================================
   * DURHAM — ACCESSIBLE TRANSPORTATION
   * ======================================================= */

  {
    id: "durham-dart-accessible-transit",
    name: "Durham Region Specialized Transit",
    category: "Transportation",
    subcategory: "Accessible Transportation",

    city: "Whitby",
    district: "",
    region: "Durham Region",
    province: "Ontario",

    address:
      "Durham Region, Ontario",

    postalCode: "",

    description:
      "Specialized public transportation options for eligible Durham Region residents with disabilities or accessibility needs.",

    services: [
      "Accessible Transportation",
      "Specialized Transit",
      "Door-to-Door Transportation",
      "Mobility Support",
    ],

    tags: [
      "transportation",
      "accessible transportation",
      "disability",
      "wheelchair",
      "mobility",
      "paratransit",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Specialized Transit",
      "Durham Region Transit",
    ],

    eligibility:
      "Eligibility and registration requirements apply.",

    phone:
      "905-683-4114",

    email: "",

    website:
      "https://www.durhamregiontransit.com/",

    hours:
      "Varies",

    cost:
      "Varies",

    appointmentRequired: true,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: false,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "Durham Region Transit",
  },

  /* =======================================================
   * HALTON — COMMUNITY SUPPORT
   * ======================================================= */

  {
    id: "halton-region-community-services",
    name: "Halton Region Community Services",
    category: "Community Services",
    subcategory: "Community Support",

    city: "Oakville",
    district: "",
    region: "Halton Region",
    province: "Ontario",

    address:
      "Halton Region, Ontario",

    postalCode: "",

    description:
      "Regional community support information covering housing, financial assistance, social services, health and family support.",

    services: [
      "Community Support",
      "Financial Assistance",
      "Housing Support",
      "Family Services",
      "Community Referrals",
    ],

    tags: [
      "community",
      "financial assistance",
      "housing",
      "family",
      "social services",
    ],

    languages: [
      "English",
      "French",
    ],

    transportation: [
      "Public Transit",
      "Oakville Transit",
      "Burlington Transit",
      "Milton Transit",
    ],

    eligibility:
      "Eligibility varies by service.",

    phone:
      "311",

    email: "",

    website:
      "https://www.halton.ca/For-Residents",

    hours:
      "Varies",

    cost:
      "Free",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "Halton Region",
  },

  /* =======================================================
   * HALTON — HOUSING
   * ======================================================= */

  {
    id: "halton-region-housing-services",
    name: "Halton Region Housing Services",
    category: "Housing",
    subcategory: "Affordable Housing",

    city: "Oakville",
    district: "",
    region: "Halton Region",
    province: "Ontario",

    address:
      "Halton Region, Ontario",

    postalCode: "",

    description:
      "Housing services and affordable housing information for residents of Oakville, Burlington, Milton and Halton Hills.",

    services: [
      "Affordable Housing",
      "Community Housing",
      "Housing Support",
      "Housing Applications",
      "Homelessness Support",
    ],

    tags: [
      "housing",
      "rent",
      "affordable housing",
      "subsidized housing",
      "homeless",
    ],

    languages: [
      "English",
      "French",
    ],

    transportation: [
      "Public Transit",
      "Oakville Transit",
      "Burlington Transit",
      "Milton Transit",
    ],

    eligibility:
      "Eligibility varies by housing program.",

    phone:
      "311",

    email: "",

    website:
      "https://www.halton.ca/For-Residents/Employment-and-Financial-Assistance/Housing",

    hours:
      "Varies",

    cost:
      "Free",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "Halton Region",
  },

  /* =======================================================
   * GTA — 211
   * ======================================================= */

  {
    id: "211-central-gta-expanded",
    name: "211 Central",
    category: "Community Services",
    subcategory: "Information and Referral",

    city: "Toronto",
    district: "",
    region: "GTA",
    province: "Ontario",

    address:
      "Greater Toronto Area, Ontario",

    postalCode: "",

    description:
      "Community information and referral service connecting people with government and community programs across the Greater Toronto Area.",

    services: [
      "Community Referrals",
      "Housing Referrals",
      "Food Referrals",
      "Employment Referrals",
      "Financial Assistance Referrals",
      "Health Referrals",
      "Newcomer Referrals",
      "Mental Health Referrals",
    ],

    tags: [
      "211",
      "community",
      "help",
      "resources",
      "food",
      "housing",
      "employment",
      "financial",
      "newcomer",
    ],

    languages: [
      "English",
      "French",
      "Multiple Languages",
    ],

    transportation: [
      "Phone",
      "Online",
    ],

    eligibility:
      "Available to people seeking information about community and government services.",

    phone:
      "211",

    email: "",

    website:
      "https://211central.ca/",

    hours:
      "24/7",

    cost:
      "Free",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "211 Central",
  },

  {
    id: "211-ontario-expanded",
    name: "211 Ontario",
    category: "Community Services",
    subcategory: "Information and Referral",

    city: "Toronto",
    district: "",
    region: "Ontario",
    province: "Ontario",

    address:
      "Ontario",

    postalCode: "",

    description:
      "Province-wide information and referral service connecting residents with community, social and government services.",

    services: [
      "Community Referrals",
      "Social Services",
      "Housing Referrals",
      "Food Referrals",
      "Financial Assistance Referrals",
      "Health Referrals",
      "Employment Referrals",
      "Newcomer Referrals",
    ],

    tags: [
      "211",
      "resources",
      "community",
      "housing",
      "food",
      "employment",
      "health",
      "financial assistance",
    ],

    languages: [
      "English",
      "French",
      "Multiple Languages",
    ],

    transportation: [
      "Phone",
      "Online",
    ],

    eligibility:
      "Available to Ontario residents seeking community and government service information.",

    phone:
      "211",

    email: "",

    website:
      "https://211ontario.ca/",

    hours:
      "24/7",

    cost:
      "Free",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "211 Ontario",
  },

  /* =======================================================
   * TORONTO — FOOD
   * ======================================================= */

  {
    id: "daily-bread-food-bank-toronto",
    name: "Daily Bread Food Bank",
    category: "Food Assistance",
    subcategory: "Food Bank",

    city: "Toronto",
    district: "",
    region: "Toronto",
    province: "Ontario",

    address:
      "Toronto, Ontario",

    postalCode: "",

    description:
      "Food assistance and community support for people experiencing food insecurity in Toronto.",

    services: [
      "Food Bank",
      "Emergency Food",
      "Food Assistance",
      "Community Referrals",
    ],

    tags: [
      "food",
      "food bank",
      "groceries",
      "hungry",
      "food insecurity",
      "emergency food",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "TTC",
      "Public Transit",
    ],

    eligibility:
      "Food bank access and eligibility may vary by member agency and location.",

    phone:
      "416-203-0050",

    email: "",

    website:
      "https://www.dailybread.ca/",

    hours:
      "Varies by location",

    cost:
      "Free",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "Daily Bread Food Bank",
  },

  /* =======================================================
   * TORONTO — EMPLOYMENT
   * ======================================================= */

  {
    id: "toronto-employment-social-services",
    name: "Toronto Employment & Social Services",
    category: "Employment Services",
    subcategory: "Employment and Social Assistance",

    city: "Toronto",
    district: "",
    region: "Toronto",
    province: "Ontario",

    address:
      "Toronto, Ontario",

    postalCode: "",

    description:
      "City services providing employment support, social assistance information and referrals to community resources.",

    services: [
      "Employment Support",
      "Job Search",
      "Ontario Works",
      "Financial Assistance",
      "Career Support",
      "Community Referrals",
    ],

    tags: [
      "job",
      "employment",
      "career",
      "Ontario Works",
      "financial assistance",
      "work",
    ],

    languages: [
      "English",
      "French",
    ],

    transportation: [
      "TTC",
      "Public Transit",
    ],

    eligibility:
      "Eligibility varies by program.",

    phone:
      "416-338-8888",

    email: "",

    website:
      "https://www.toronto.ca/community-people/employment-social-support/",

    hours:
      "Varies",

    cost:
      "Free",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: false,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "City of Toronto",
  },

  /* =======================================================
   * TORONTO — DISABILITY
   * ======================================================= */

  {
    id: "centre-for-independent-living-toronto",
    name: "Centre for Independent Living in Toronto",
    category: "Disability Support",
    subcategory: "Independent Living",

    city: "Toronto",
    district: "",
    region: "Toronto",
    province: "Ontario",

    address:
      "Toronto, Ontario",

    postalCode: "",

    description:
      "Support and advocacy for people with disabilities, including independent living resources, accessibility information and community support.",

    services: [
      "Disability Support",
      "Independent Living",
      "Accessibility Support",
      "Peer Support",
      "Advocacy",
      "Community Referrals",
    ],

    tags: [
      "disability",
      "disabled",
      "accessible",
      "accessibility",
      "mobility",
      "independent living",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "TTC",
      "Wheel-Trans",
      "Accessible Transportation",
    ],

    eligibility:
      "Programs vary and may be designed for people with disabilities.",

    phone:
      "416-599-2458",

    email: "",

    website:
      "https://www.cilt.ca/",

    hours:
      "Varies",

    cost:
      "Free or program dependent",

    appointmentRequired: true,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "Centre for Independent Living in Toronto",
  },

  /* =======================================================
   * TORONTO — SENIORS
   * ======================================================= */

  {
    id: "seniors-active-living-centres-toronto",
    name: "Toronto Seniors Services",
    category: "Senior Support",
    subcategory: "Senior Community Services",

    city: "Toronto",
    district: "",
    region: "Toronto",
    province: "Ontario",

    address:
      "Toronto, Ontario",

    postalCode: "",

    description:
      "City and community programs supporting older adults with social, recreational, health and community needs.",

    services: [
      "Senior Support",
      "Community Programs",
      "Recreation",
      "Social Support",
      "Community Referrals",
    ],

    tags: [
      "senior",
      "elderly",
      "older adult",
      "community",
      "recreation",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "TTC",
      "Public Transit",
    ],

    eligibility:
      "Eligibility varies by program.",

    phone:
      "311",

    email: "",

    website:
      "https://www.toronto.ca/community-people/health-wellness-care/health-programs-advice/seniors/",

    hours:
      "Varies",

    cost:
      "Free or program dependent",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: false,
    servesSeniors: true,
    servesYouth: false,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "City of Toronto",
  },

  /* =======================================================
   * TORONTO — CHILDREN / FAMILIES
   * ======================================================= */

  {
    id: "toronto-childrens-services",
    name: "Toronto Children's Services",
    category: "Childcare",
    subcategory: "Child and Family Services",

    city: "Toronto",
    district: "",
    region: "Toronto",
    province: "Ontario",

    address:
      "Toronto, Ontario",

    postalCode: "",

    description:
      "Childcare, early learning and family support information and services for Toronto families.",

    services: [
      "Child Care",
      "Child Care Subsidy",
      "Early Learning",
      "Family Support",
      "Childcare Information",
    ],

    tags: [
      "childcare",
      "child care",
      "daycare",
      "day care",
      "children",
      "family",
      "subsidy",
    ],

    languages: [
      "English",
      "French",
    ],

    transportation: [
      "TTC",
      "Public Transit",
    ],

    eligibility:
      "Eligibility varies by childcare and family program.",

    phone:
      "416-392-5437",

    email: "",

    website:
      "https://www.toronto.ca/community-people/community-partners/childrens-services/",

    hours:
      "Varies",

    cost:
      "Varies; subsidies may be available",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: false,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "City of Toronto",
  },

  /* =======================================================
   * TORONTO — NEWCOMER KIOSKS
   * ======================================================= */

  {
    id: "toronto-newcomer-services-kiosks",
    name: "City of Toronto Newcomer Services Kiosks",
    category: "Newcomer Services",
    subcategory: "Settlement Information",

    city: "Toronto",
    district: "",
    region: "Toronto",
    province: "Ontario",

    address:
      "Toronto, Ontario",

    postalCode: "",

    description:
      "Free newcomer information and referral services connecting newcomers with settlement, education, employment, healthcare, housing and community programs.",

    services: [
      "Settlement Services",
      "Newcomer Support",
      "Employment Referrals",
      "Housing Referrals",
      "Health Referrals",
      "Education Information",
      "Community Referrals",
    ],

    tags: [
      "newcomer",
      "immigrant",
      "refugee",
      "settlement",
      "housing",
      "employment",
      "health",
      "education",
    ],

    languages: [
      "English",
      "Multiple Languages",
    ],

    transportation: [
      "TTC",
      "Public Transit",
    ],

    eligibility:
      "Available to Toronto residents and newcomers; immigration status is not required for access to the kiosk program.",

    phone:
      "311",

    email: "",

    website:
      "https://www.toronto.ca/community-people/moving-to-toronto/after-you-arrive-checklist/newcomer-services-kiosks/",

    hours:
      "Varies by kiosk",

    cost:
      "Free",

    appointmentRequired: false,
    walkInsAccepted: true,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "City of Toronto",
  },

  /* =======================================================
   * YORK REGION — NEWCOMERS
   * ======================================================= */

  {
    id: "york-region-newcomer-services",
    name: "York Region Newcomer Services",
    category: "Newcomer Services",
    subcategory: "Settlement Support",

    city: "Newmarket",
    district: "",
    region: "York Region",
    province: "Ontario",

    address:
      "York Region, Ontario",

    postalCode: "",

    description:
      "Information and referrals for newcomers accessing settlement, community, employment and social services across York Region.",

    services: [
      "Newcomer Support",
      "Settlement Services",
      "Community Referrals",
      "Employment Referrals",
      "Language Support",
      "Housing Referrals",
    ],

    tags: [
      "newcomer",
      "immigrant",
      "refugee",
      "settlement",
      "language",
      "employment",
      "housing",
    ],

    languages: [
      "English",
      "French",
      "Multiple Languages",
    ],

    transportation: [
      "YRT",
      "Public Transit",
    ],

    eligibility:
      "Services vary by program and eligibility.",

    phone:
      "1-877-464-9675",

    email: "",

    website:
      "https://www.york.ca/support/newcomer-services",

    hours:
      "Varies",

    cost:
      "Free",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "York Region",
  },

  /* =======================================================
   * PEEL — NEWCOMERS
   * ======================================================= */

  {
    id: "immigration-peel-newcomer-support",
    name: "Immigration Peel",
    category: "Newcomer Services",
    subcategory: "Settlement Information",

    city: "Brampton",
    district: "",
    region: "Peel Region",
    province: "Ontario",

    address:
      "Peel Region, Ontario",

    postalCode: "",

    description:
      "Newcomer information and referrals to settlement, community, employment, language and social services in Peel Region.",

    services: [
      "Newcomer Support",
      "Settlement Services",
      "Community Referrals",
      "Employment Information",
      "Language Information",
      "Community Programs",
    ],

    tags: [
      "newcomer",
      "immigrant",
      "refugee",
      "settlement",
      "language",
      "employment",
      "community",
    ],

    languages: [
      "English",
      "French",
      "Multiple Languages",
    ],

    transportation: [
      "Public Transit",
      "Brampton Transit",
      "MiWay",
    ],

    eligibility:
      "Newcomer services and eligibility vary by program.",

    phone:
      "905-791-7800",

    email: "",

    website:
      "https://peelregion.ca/housing-social-support/community-support",

    hours:
      "Varies",

    cost:
      "Free",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "Peel Region",
  },

  /* =======================================================
   * PEEL — ACCESSIBLE TRANSPORTATION
   * ======================================================= */

  {
    id: "peel-transhelp-accessible-transit",
    name: "Peel TransHelp",
    category: "Transportation",
    subcategory: "Accessible Transportation",

    city: "Brampton",
    district: "",
    region: "Peel Region",
    province: "Ontario",

    address:
      "Peel Region, Ontario",

    postalCode: "",

    description:
      "Accessible transportation service for eligible Peel Region residents who cannot use conventional public transit because of functional mobility limitations.",

    services: [
      "Accessible Transportation",
      "Specialized Transit",
      "Mobility Support",
      "Door-to-Door Transportation",
    ],

    tags: [
      "transportation",
      "accessible transportation",
      "disability",
      "wheelchair",
      "mobility",
      "paratransit",
    ],

    languages: [
      "English",
      "French",
    ],

    transportation: [
      "TransHelp",
      "Accessible Transportation",
    ],

    eligibility:
      "Registration and eligibility assessment are required.",

    phone:
      "905-791-1015",

    email: "",

    website:
      "https://peelregion.ca/services/transhelp",

    hours:
      "Varies",

    cost:
      "Fare may apply",

    appointmentRequired: true,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: false,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "Peel Region",
  },

  /* =======================================================
   * GTA — EMPLOYMENT ONTARIO
   * ======================================================= */

  {
    id: "employment-ontario-service-gta",
    name: "Employment Ontario",
    category: "Employment Services",
    subcategory: "Employment and Training",

    city: "Toronto",
    district: "",
    region: "GTA",
    province: "Ontario",

    address:
      "Ontario",

    postalCode: "",

    description:
      "Government employment and training network connecting people with job search, career planning, skills training and employment services.",

    services: [
      "Job Search",
      "Employment Support",
      "Career Planning",
      "Skills Training",
      "Resume Support",
      "Interview Preparation",
      "Employment Referrals",
    ],

    tags: [
      "job",
      "employment",
      "career",
      "resume",
      "interview",
      "training",
      "skills",
      "work",
    ],

    languages: [
      "English",
      "French",
    ],

    transportation: [
      "Public Transit",
    ],

    eligibility:
      "Eligibility varies by Employment Ontario service and program.",

    phone:
      "1-800-387-5656",

    email: "",

    website:
      "https://www.ontario.ca/page/employment-ontario",

    hours:
      "Varies by service provider",

    cost:
      "Free",

    appointmentRequired: true,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: false,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "Government of Ontario",
  },

  /* =======================================================
   * GTA — CLOTHING / BASIC NEEDS
   * ======================================================= */

  {
    id: "salvation-army-gta-community-support",
    name: "The Salvation Army - Greater Toronto Community Support",
    category: "Basic Needs",
    subcategory: "Community Assistance",

    city: "Toronto",
    district: "",
    region: "GTA",
    province: "Ontario",

    address:
      "Greater Toronto Area, Ontario",

    postalCode: "",

    description:
      "Community support programs that may include food, clothing, emergency assistance and referrals depending on location.",

    services: [
      "Food Assistance",
      "Clothing",
      "Emergency Assistance",
      "Community Support",
      "Housing Referrals",
      "Basic Needs",
    ],

    tags: [
      "food",
      "clothing",
      "clothes",
      "emergency",
      "basic needs",
      "community",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
      "TTC",
    ],

    eligibility:
      "Services and eligibility vary by location and program.",

    phone:
      "416-425-2111",

    email: "",

    website:
      "https://salvationarmy.ca/",

    hours:
      "Varies by location",

    cost:
      "Free or program dependent",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "The Salvation Army",
  },

  /* =======================================================
   * GTA — LANGUAGE / EDUCATION
   * ======================================================= */

  {
    id: "language-assessment-centre-gta",
    name: "Language Assessment and Newcomer Language Services",
    category: "Language",
    subcategory: "Language Assessment",

    city: "Toronto",
    district: "",
    region: "GTA",
    province: "Ontario",

    address:
      "Greater Toronto Area, Ontario",

    postalCode: "",

    description:
      "Newcomer language assessment and referral services connecting eligible newcomers with language learning programs.",

    services: [
      "Language Assessment",
      "English Classes",
      "Language Training",
      "Newcomer Support",
      "Settlement Referrals",
    ],

    tags: [
      "english",
      "ESL",
      "language",
      "language class",
      "newcomer",
      "immigrant",
      "settlement",
    ],

    languages: [
      "English",
      "French",
      "Multiple Languages",
    ],

    transportation: [
      "Public Transit",
      "TTC",
    ],

    eligibility:
      "Eligibility depends on immigration and program requirements.",

    phone:
      "416-925-5462",

    email: "",

    website:
      "https://www.language.ca/",

    hours:
      "Varies",

    cost:
      "Free for eligible newcomers in eligible programs",

    appointmentRequired: true,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "Language Assessment and Referral",
  },

  /* =======================================================
   * FINAL GENERAL GTA RESOURCE
   * ======================================================= */

  {
    id: "ontario-benefits-wayfinder-gta",
    name: "Ontario Benefits Wayfinder",
    category: "Financial Assistance",
    subcategory: "Benefits Information",

    city: "Toronto",
    district: "",
    region: "GTA",
    province: "Ontario",

    address:
      "Ontario",

    postalCode: "",

    description:
      "Online tool and information resource helping Ontario residents identify government benefits and supports they may qualify for.",

    services: [
      "Benefits Information",
      "Financial Assistance Information",
      "Housing Support Information",
      "Childcare Support Information",
      "Disability Benefits Information",
      "Community Support",
    ],

    tags: [
      "benefits",
      "financial assistance",
      "money",
      "housing",
      "childcare",
      "disability",
      "support",
    ],

    languages: [
      "English",
      "French",
    ],

    transportation: [
      "Online",
    ],

    eligibility:
      "Eligibility depends on the individual benefit or support program.",

    phone:
      "",

    email: "",

    website:
      "https://benefitswayfinder.org/",

    hours:
      "Online",

    cost:
      "Free",

    appointmentRequired: false,
    walkInsAccepted: false,
    referralRequired: false,
    onlineServices: true,

    servesNewcomers: true,
    servesLowIncome: true,
    servesFamilies: true,
    servesSeniors: true,
    servesYouth: true,
    servesPeopleWithDisabilities: true,

    verified: true,

    source:
      "Benefits Wayfinder",
  },
];

/* =========================================================
 * VALIDATION
 * ======================================================= */

function validateResources(
  items: Resource[]
) {
  const ids = new Set<string>();

  for (const resource of items) {
    if (ids.has(resource.id)) {
      throw new Error(
        `Duplicate resource ID detected: ${resource.id}`
      );
    }

    ids.add(resource.id);

    if (!resource.name.trim()) {
      throw new Error(
        `Resource ${resource.id} has no name.`
      );
    }

    if (!resource.category.trim()) {
      throw new Error(
        `Resource ${resource.id} has no category.`
      );
    }

    if (!resource.city.trim()) {
      throw new Error(
        `Resource ${resource.id} has no city.`
      );
    }

    if (!resource.website.trim()) {
      throw new Error(
        `Resource ${resource.id} has no website.`
      );
    }
  }
}

/* =========================================================
 * FIRESTORE SEED
 * ======================================================= */

async function seedResources() {
  validateResources(resources);

  console.log(
    `Starting GTA resource batch 3: ${resources.length} resources`
  );

  console.log(
    "Using stable Firestore document IDs."
  );

  console.log(
    "Existing documents will be updated instead of duplicated."
  );

  console.log("");

  const collectionRef =
    db.collection("resources");

  let processed = 0;

  for (const resource of resources) {
    const docRef =
      collectionRef.doc(resource.id);

    const existingDoc =
      await docRef.get();

    const now =
      Timestamp.now();

    await docRef.set(
      {
        ...resource,

        updatedAt: now,

        ...(existingDoc.exists
          ? {}
          : {
              createdAt: now,
            }),
      },
      {
        merge: true,
      }
    );

    processed++;

    console.log(
      `✓ Updated/Added: ${resource.name} (${resource.id})`
    );
  }

  /* =======================================================
   * CITY SUMMARY
   * ======================================================= */

  const cities =
    Array.from(
      new Set(
        resources.map(
          (resource) =>
            resource.city
        )
      )
    ).sort();

  /* =======================================================
   * CATEGORY SUMMARY
   * ======================================================= */

  const categories =
    Array.from(
      new Set(
        resources.map(
          (resource) =>
            resource.category
        )
      )
    ).sort();

  console.log("");

  console.log(
    `Successfully processed ${processed} resources.`
  );

  console.log(
    "No random Firestore document IDs were created."
  );

  console.log("");

  console.log(
    "Cities / areas represented:"
  );

  for (const city of cities) {
    console.log(`✓ ${city}`);
  }

  console.log("");

  console.log(
    "Categories represented:"
  );

  for (const category of categories) {
    console.log(`✓ ${category}`);
  }

  console.log("");

  console.log(
    `Total unique resource IDs in this batch: ${resources.length}`
  );

  console.log("");

  console.log(
    "GTA resource batch 3 complete."
  );
}

/* =========================================================
 * RUN
 * ======================================================= */

seedResources()
  .then(() => {
    console.log("Done.");
    process.exit(0);
  })
  .catch((error) => {
    console.error(
      "Failed to seed GTA resource batch 3:"
    );

    console.error(error);

    process.exit(1);
  });