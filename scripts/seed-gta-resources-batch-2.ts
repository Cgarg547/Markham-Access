import { cert, getApps, initializeApp } from "firebase-admin/app";
import {
  getFirestore,
  Timestamp,
} from "firebase-admin/firestore";

import serviceAccount from "../firebase-service-account.json";

/* =========================================================
 * FIREBASE
 * ======================================================= */

const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert(serviceAccount as any),
      });

const db = getFirestore(app);

/* =========================================================
 * RESOURCE TYPE
 * ======================================================= */

interface Resource {
  id: string;

  name: string;
  category: string;

  city: string;
  district: string;
  province: string;

  address: string;

  description: string;

  services: string[];
  tags: string[];

  languages: string[];

  transportation: string[];

  eligibility: string;

  phone: string;
  website: string;

  verified: boolean;
}

/* =========================================================
 * RESOURCES
 *
 * IMPORTANT:
 * Stable IDs are used so rerunning this file updates
 * existing resources instead of creating duplicates.
 * ======================================================= */

const resources: Resource[] = [

  /* =======================================================
   * TORONTO
   * ======================================================= */

  {
    id: "working-women-community-centre-north-york",

    name: "Working Women Community Centre - North York",

    category: "Community Services",

    city: "Toronto",
    district: "North York",
    province: "Ontario",

    address:
      "206-5 Fairview Mall Drive, Toronto, ON M2J 2Z1",

    description:
      "Community programs supporting residents through food programs, community kitchens, workshops, gardens, settlement support and community connections.",

    services: [
      "Food Programs",
      "Community Kitchen",
      "Food Skills Training",
      "Community Garden",
      "Workshops",
      "Community Support",
    ],

    tags: [
      "food",
      "food assistance",
      "community",
      "north york",
      "women",
      "newcomer",
      "training",
      "workshops",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
      "TTC",
    ],

    eligibility:
      "Community residents; eligibility varies by program.",

    phone:
      "416-830-3539",

    website:
      "https://www.workingwomencc.org/",

    verified: true,
  },

  {
    id: "acsa-community-services-north",

    name: "ACSA Community Services - Drop-In North",

    category: "Community Services",

    city: "Toronto",
    district: "Scarborough",
    province: "Ontario",

    address:
      "4155 Sheppard Avenue East, Suite 100, Toronto, ON M1S 1T4",

    description:
      "Drop-in and community support including meals, showers, clothing, computer access, referrals, informal counselling and housing support.",

    services: [
      "Meals",
      "Food Assistance",
      "Clothing",
      "Showers",
      "Computer Access",
      "Housing Support",
      "Referrals",
      "Counselling",
    ],

    tags: [
      "food",
      "meals",
      "homeless",
      "housing",
      "clothing",
      "scarborough",
      "drop in",
      "computer",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
      "TTC",
    ],

    eligibility:
      "Individuals and households needing community and housing support; program eligibility varies.",

    phone:
      "416-321-6912",

    website:
      "https://acsaontario.com/",

    verified: true,
  },

  {
    id: "tno-food-collaborative-thorncliffe",

    name: "TNO - The Neighbourhood Organization Food Collaborative",

    category: "Food Assistance",

    city: "Toronto",
    district: "East York",
    province: "Ontario",

    address:
      "45 Overlea Boulevard, Unit 1A, Toronto, ON M4H 1C3",

    description:
      "Food support for residents of Thorncliffe Park, including food bank services and community support.",

    services: [
      "Food Bank",
      "Food Assistance",
      "Community Support",
      "Information and Referrals",
    ],

    tags: [
      "food",
      "food bank",
      "thorncliffe park",
      "east york",
      "groceries",
      "food insecurity",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
      "TTC",
    ],

    eligibility:
      "Primarily serves residents of Thorncliffe Park; program eligibility may apply.",

    phone:
      "647-296-0242",

    website:
      "https://tno-toronto.org/",

    verified: true,
  },

  {
    id: "warden-woods-teesdale-drop-in",

    name: "Warden Woods Community Centre - Teesdale Drop-In",

    category: "Food and Community Support",

    city: "Toronto",
    district: "Scarborough",
    province: "Ontario",

    address:
      "40 Teesdale Place, Toronto, ON M1L 1L3",

    description:
      "Drop-in and food security program providing meals, breakfast, community support, crisis intervention, computer and telephone access and referrals.",

    services: [
      "Food Assistance",
      "Breakfast",
      "Community Meals",
      "Computer Access",
      "Telephone Access",
      "Crisis Support",
      "Referrals",
      "Community Programs",
    ],

    tags: [
      "food",
      "meals",
      "scarborough",
      "drop in",
      "crisis",
      "employment",
      "computer",
      "food insecurity",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
      "TTC",
    ],

    eligibility:
      "Community members; program eligibility varies.",

    phone:
      "416-694-1138",

    website:
      "https://www.wardenwoods.com/",

    verified: true,
  },

  {
    id: "feed-scarborough-clairlea",

    name: "Feed Scarborough - Clairlea Programs",

    category: "Food Assistance",

    city: "Toronto",
    district: "Scarborough",
    province: "Ontario",

    address:
      "772 Warden Avenue, Toronto, ON M1L 4T7",

    description:
      "Community food and support programs including free meals, clothing support and social connection activities.",

    services: [
      "Free Meals",
      "Food Assistance",
      "Clothing",
      "Community Support",
      "Social Programs",
    ],

    tags: [
      "food",
      "free meals",
      "scarborough",
      "clothing",
      "community",
      "food insecurity",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
      "TTC",
    ],

    eligibility:
      "Community members; program availability varies.",

    phone:
      "416-936-3975",

    website:
      "https://feedscarborough.ca/",

    verified: true,
  },

  {
    id: "salvation-army-bloor-central",

    name: "The Salvation Army - Bloor Central Corps",

    category: "Emergency and Community Support",

    city: "Toronto",
    district: "Toronto",
    province: "Ontario",

    address:
      "789 Dovercourt Road, Toronto, ON M6H 2X4",

    description:
      "Community and family services providing emergency material assistance, food support, crisis intervention and community programs.",

    services: [
      "Food Assistance",
      "Emergency Assistance",
      "Crisis Intervention",
      "Community Meals",
      "Family Support",
    ],

    tags: [
      "food",
      "emergency",
      "crisis",
      "family",
      "material assistance",
      "food bank",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
      "TTC",
    ],

    eligibility:
      "Individuals and families requiring community assistance; eligibility varies.",

    phone:
      "416-532-4511",

    website:
      "https://salvationarmy.ca/",

    verified: true,
  },

  {
    id: "fort-york-food-bank",

    name: "Fort York Food Bank",

    category: "Food Assistance",

    city: "Toronto",
    district: "Downtown Toronto",
    province: "Ontario",

    address:
      "380 College Street, Toronto, ON M5T 1S6",

    description:
      "Food support and community assistance for individuals and families experiencing food insecurity.",

    services: [
      "Food Bank",
      "Food Assistance",
      "Community Support",
      "Referrals",
    ],

    tags: [
      "food",
      "food bank",
      "groceries",
      "downtown",
      "food insecurity",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
      "TTC",
    ],

    eligibility:
      "Individuals and families experiencing food insecurity; eligibility and intake requirements may apply.",

    phone:
      "416-203-3011",

    website:
      "https://fyfb.com/",

    verified: true,
  },

  {
    id: "yonge-street-mission-community-support",

    name: "Yonge Street Mission - Community Support Services",

    category: "Community and Food Support",

    city: "Toronto",
    district: "Downtown Toronto",
    province: "Ontario",

    address:
      "270 Gerrard Street East, Toronto, ON M5A 2G4",

    description:
      "Community support including meals, food assistance, hygiene supplies, baby items, warm clothing and referrals.",

    services: [
      "Food Assistance",
      "Community Meals",
      "Hygiene Supplies",
      "Baby Supplies",
      "Clothing",
      "Community Support",
      "Referrals",
    ],

    tags: [
      "food",
      "meals",
      "hygiene",
      "baby supplies",
      "clothing",
      "downtown",
      "homeless",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
      "TTC",
    ],

    eligibility:
      "Community members requiring support; program eligibility varies.",

    phone:
      "416-929-9614",

    website:
      "https://www.ysm.ca/",

    verified: true,
  },

  {
    id: "all-saints-community-centre-toronto",

    name: "All Saints Church-Community Centre",

    category: "Community Services",

    city: "Toronto",
    district: "Downtown Toronto",
    province: "Ontario",

    address:
      "315 Dundas Street East, Toronto, ON M5A 2A2",

    description:
      "Community meals and drop-in services including nursing care, case management, emergency clothing, computer access, Wi-Fi and referrals.",

    services: [
      "Community Meals",
      "Food Assistance",
      "Case Management",
      "Nursing Support",
      "Emergency Clothing",
      "Computer Access",
      "Wi-Fi",
      "Referrals",
    ],

    tags: [
      "food",
      "meals",
      "clothing",
      "health",
      "case management",
      "downtown",
      "drop in",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
      "TTC",
    ],

    eligibility:
      "Community members; program eligibility varies.",

    phone:
      "416-368-7768",

    website:
      "https://allsaintstoronto.com/",

    verified: true,
  },

  /* =======================================================
   * YORK REGION
   * ======================================================= */

  {
    id: "york-region-food-network",

    name: "York Region Food Network",

    category: "Food Security",

    city: "Newmarket",
    district: "",
    province: "Ontario",

    address:
      "17665 Leslie Street, Unit 19, Newmarket, ON L3Y 3E3",

    description:
      "Food security organization providing affordable food programs, cooking and garden workshops, community food initiatives and food access programs across York Region.",

    services: [
      "Food Security",
      "Affordable Food",
      "Cooking Workshops",
      "Garden Programs",
      "Fresh Food Programs",
      "Community Food Programs",
    ],

    tags: [
      "food",
      "food insecurity",
      "newmarket",
      "york region",
      "groceries",
      "community garden",
      "cooking",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
    ],

    eligibility:
      "York Region residents and community participants; eligibility varies by program.",

    phone:
      "905-841-3101",

    website:
      "https://yrfn.ca/",

    verified: true,
  },

  {
    id: "york-region-community-housing",

    name: "York Region Housing Services",

    category: "Housing",

    city: "Newmarket",
    district: "",
    province: "Ontario",

    address:
      "17250 Yonge Street, Newmarket, ON",

    description:
      "Regional housing support including affordable and community housing information, housing assistance and homelessness prevention resources.",

    services: [
      "Housing Assistance",
      "Community Housing",
      "Affordable Housing",
      "Homelessness Support",
      "Housing Referrals",
    ],

    tags: [
      "housing",
      "affordable housing",
      "rent",
      "homeless",
      "shelter",
      "york region",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
    ],

    eligibility:
      "York Region residents; eligibility depends on the housing program.",

    phone:
      "1-877-464-9675",

    website:
      "https://www.york.ca/support/housing",

    verified: true,
  },

  /* =======================================================
   * PEEL
   * ======================================================= */

  {
    id: "peel-housing-services",

    name: "Peel Region Housing Services",

    category: "Housing",

    city: "Brampton",
    district: "",
    province: "Ontario",

    address:
      "10 Peel Centre Drive, Brampton, ON",

    description:
      "Housing services including community housing applications, centralized wait list information, housing supports and homelessness prevention resources.",

    services: [
      "Housing Assistance",
      "Community Housing",
      "Affordable Housing",
      "Housing Applications",
      "Homelessness Support",
      "Rent Support",
    ],

    tags: [
      "housing",
      "rent",
      "affordable housing",
      "homeless",
      "shelter",
      "brampton",
      "mississauga",
      "peel",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
    ],

    eligibility:
      "Peel Region residents; program-specific eligibility applies.",

    phone:
      "905-791-7800",

    website:
      "https://peelregion.ca/housing-social-support/apply-housing-services",

    verified: true,
  },

  {
    id: "peel-employment-support-brampton",

    name: "Peel Region Employment Support - Brampton",

    category: "Employment Services",

    city: "Brampton",
    district: "",
    province: "Ontario",

    address:
      "10 Peel Centre Drive, Suite B, Brampton, ON",

    description:
      "Employment support including job search resources, career assistance and access to employment-related services.",

    services: [
      "Employment Support",
      "Job Search",
      "Career Support",
      "Training Referrals",
      "Employment Resources",
    ],

    tags: [
      "employment",
      "job",
      "jobs",
      "career",
      "resume",
      "brampton",
      "peel",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
    ],

    eligibility:
      "Peel residents and eligible employment-service clients; eligibility varies.",

    phone:
      "905-791-7800",

    website:
      "https://peelregion.ca/housing-social-support/financial-social-support/employment-support",

    verified: true,
  },

  {
    id: "peel-employment-support-mississauga",

    name: "Peel Region Employment Support - Mississauga",

    category: "Employment Services",

    city: "Mississauga",
    district: "",
    province: "Ontario",

    address:
      "7120 Hurontario Street, Mississauga, ON",

    description:
      "Employment support including job search assistance, career resources, computers, internet access and employment referrals.",

    services: [
      "Employment Support",
      "Job Search",
      "Career Support",
      "Computer Access",
      "Internet Access",
      "Training Referrals",
    ],

    tags: [
      "employment",
      "job",
      "jobs",
      "career",
      "resume",
      "mississauga",
      "peel",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
    ],

    eligibility:
      "Peel residents and eligible employment-service clients; eligibility varies.",

    phone:
      "905-791-7800",

    website:
      "https://peelregion.ca/housing-social-support/financial-social-support/employment-support",

    verified: true,
  },

  {
    id: "peel-financial-social-support",

    name: "Peel Region Financial and Social Support",

    category: "Financial Assistance",

    city: "Brampton",
    district: "",
    province: "Ontario",

    address:
      "10 Peel Centre Drive, Brampton, ON",

    description:
      "Financial and social support including Ontario Works, emergency assistance, housing-related support, disability benefits and help with essential needs.",

    services: [
      "Financial Assistance",
      "Ontario Works",
      "Emergency Assistance",
      "Housing Support",
      "Disability Benefits",
      "Food Assistance",
      "Clothing Assistance",
    ],

    tags: [
      "financial assistance",
      "money",
      "ontario works",
      "emergency assistance",
      "food",
      "housing",
      "rent",
      "disability",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
    ],

    eligibility:
      "Peel Region residents who meet program eligibility requirements.",

    phone:
      "905-793-9200",

    website:
      "https://peelregion.ca/housing-social-support/financial-social-support",

    verified: true,
  },

  {
    id: "peel-homeless-support",

    name: "Peel Region Homeless Support",

    category: "Homelessness Support",

    city: "Brampton",
    district: "",
    province: "Ontario",

    address:
      "Peel Region",

    description:
      "Emergency and transitional shelter, street outreach, drop-in programs, housing support and referrals for people experiencing or at risk of homelessness.",

    services: [
      "Emergency Shelter",
      "Transitional Housing",
      "Street Outreach",
      "Homelessness Support",
      "Food Assistance",
      "Housing Referrals",
    ],

    tags: [
      "homeless",
      "homelessness",
      "shelter",
      "housing",
      "emergency",
      "food",
      "street outreach",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
    ],

    eligibility:
      "People experiencing homelessness or at risk of homelessness in Peel Region.",

    phone:
      "1-877-848-8481",

    website:
      "https://peelregion.ca/housing-social-support/homeless-support",

    verified: true,
  },

  {
    id: "community-door-peel",

    name: "Community Door",

    category: "Community Services",

    city: "Mississauga",
    district: "",
    province: "Ontario",

    address:
      "50 Burnhamthorpe Road West, Suite 300, Mississauga, ON L5B 3C2",

    description:
      "Community health and social service hub connecting residents with organizations providing employment, mental health, newcomer, senior and family support.",

    services: [
      "Community Support",
      "Employment Services",
      "Mental Health Support",
      "Newcomer Support",
      "Senior Support",
      "Family Services",
      "Referrals",
    ],

    tags: [
      "community",
      "employment",
      "mental health",
      "newcomer",
      "seniors",
      "family",
      "referrals",
      "mississauga",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
    ],

    eligibility:
      "Community members; eligibility depends on individual programs.",

    phone:
      "905-712-4413",

    website:
      "https://communitydoor.ca/",

    verified: true,
  },

  /* =======================================================
   * DURHAM
   * ======================================================= */

  {
    id: "durham-region-employment-services",

    name: "Durham Region Employment Services",

    category: "Employment Services",

    city: "Oshawa",
    district: "",
    province: "Ontario",

    address:
      "Durham Region",

    description:
      "Free employment services supporting job seekers with career planning, resume development, interview preparation, training referrals, labour market information and employment barriers.",

    services: [
      "Employment Support",
      "Job Search",
      "Resume Help",
      "Interview Preparation",
      "Career Planning",
      "Training Referrals",
      "Skills Development",
    ],

    tags: [
      "employment",
      "jobs",
      "job search",
      "resume",
      "interview",
      "career",
      "training",
      "oshawa",
      "durham",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
      "Durham Region Transit",
    ],

    eligibility:
      "Job seekers and eligible employment-service clients in Durham Region.",

    phone:
      "905-668-7711",

    website:
      "https://www.durham.ca/employment-services/",

    verified: true,
  },

  {
    id: "durham-social-services",

    name: "Durham Region Social Services",

    category: "Financial Assistance",

    city: "Oshawa",
    district: "",
    province: "Ontario",

    address:
      "605 Rossland Road East, Whitby, ON",

    description:
      "Social services including Ontario Works, emergency assistance, employment supports, housing-related supports and referrals.",

    services: [
      "Financial Assistance",
      "Ontario Works",
      "Emergency Assistance",
      "Employment Support",
      "Housing Support",
      "Health Benefits",
      "Community Referrals",
    ],

    tags: [
      "financial assistance",
      "ontario works",
      "emergency assistance",
      "housing",
      "employment",
      "money help",
      "durham",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
      "Durham Region Transit",
    ],

    eligibility:
      "Durham Region residents who meet program eligibility requirements.",

    phone:
      "905-666-6239",

    website:
      "https://www.durham.ca/regional-government/departments/social-services/",

    verified: true,
  },

  {
    id: "feed-the-need-durham",

    name: "Feed the Need in Durham",

    category: "Food Assistance",

    city: "Oshawa",
    district: "",
    province: "Ontario",

    address:
      "Durham Region",

    description:
      "Regional food security organization supporting a network of food banks and community food programs across Durham Region.",

    services: [
      "Food Bank Referrals",
      "Food Assistance",
      "Community Food Programs",
      "Food Distribution",
      "Food Security Support",
    ],

    tags: [
      "food",
      "food bank",
      "groceries",
      "food insecurity",
      "durham",
      "oshawa",
      "whitby",
      "ajax",
      "pickering",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
      "Durham Region Transit",
    ],

    eligibility:
      "Residents accessing participating food programs; individual program eligibility varies.",

    phone:
      "905-571-3863",

    website:
      "https://ftnd.ca/",

    verified: true,
  },

  {
    id: "salvation-army-ajax-house-of-hope",

    name: "Salvation Army - House of Hope Ajax",

    category: "Food Assistance",

    city: "Ajax",
    district: "",
    province: "Ontario",

    address:
      "Ajax, ON",

    description:
      "Community and family support including food assistance and emergency community services.",

    services: [
      "Food Assistance",
      "Emergency Assistance",
      "Community Support",
      "Family Services",
    ],

    tags: [
      "food",
      "food bank",
      "ajax",
      "emergency",
      "family",
      "community",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
      "Durham Region Transit",
    ],

    eligibility:
      "Ajax and area residents; eligibility varies by service.",

    phone:
      "905-427-7123",

    website:
      "https://salvationarmy.ca/",

    verified: true,
  },

  {
    id: "saint-andrews-community-foodbank-whitby",

    name: "Saint Andrews Community Foodbank",

    category: "Food Assistance",

    city: "Whitby",
    district: "",
    province: "Ontario",

    address:
      "Whitby, ON",

    description:
      "Community food bank providing food assistance to eligible residents in the Whitby area.",

    services: [
      "Food Bank",
      "Food Assistance",
      "Emergency Food",
    ],

    tags: [
      "food",
      "food bank",
      "whitby",
      "groceries",
      "food insecurity",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
      "Durham Region Transit",
    ],

    eligibility:
      "Whitby-area residents; eligibility and intake requirements may apply.",

    phone:
      "905-668-4022",

    website:
      "https://www.saintandrewswhitby.org/",

    verified: true,
  },

  {
    id: "clarington-east-food-bank",

    name: "Clarington East Food Bank",

    category: "Food Assistance",

    city: "Clarington",
    district: "",
    province: "Ontario",

    address:
      "Newcastle, ON",

    description:
      "Community food bank providing food assistance to residents in the Clarington East and Newcastle area.",

    services: [
      "Food Bank",
      "Food Assistance",
      "Emergency Food",
    ],

    tags: [
      "food",
      "food bank",
      "clarington",
      "newcastle",
      "groceries",
      "food insecurity",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "Public Transit",
      "Durham Region Transit",
    ],

    eligibility:
      "Residents of the service area; eligibility may apply.",

    phone:
      "905-987-1418",

    website:
      "https://www.claringtoneastfoodbank.ca/",

    verified: true,
  },

  /* =======================================================
   * GTA-WIDE / ONTARIO
   * ======================================================= */

  {
    id: "211-central-gta",

    name: "211 Central",

    category: "Community Information and Referrals",

    city: "Toronto",
    district: "",
    province: "Ontario",

    address:
      "Serving Toronto, Durham, Peel and York Regions",

    description:
      "Free information and referral service connecting residents with community, social, health and government services across the GTA.",

    services: [
      "Community Referrals",
      "Food Assistance Referrals",
      "Housing Referrals",
      "Employment Referrals",
      "Mental Health Referrals",
      "Legal Referrals",
      "Newcomer Services",
      "Senior Services",
      "Youth Services",
      "Crisis Referrals",
    ],

    tags: [
      "211",
      "community",
      "referrals",
      "food",
      "housing",
      "employment",
      "mental health",
      "legal",
      "newcomer",
      "seniors",
      "youth",
      "gta",
    ],

    languages: [
      "English",
      "French",
      "Multilingual",
    ],

    transportation: [
      "Public Transit",
    ],

    eligibility:
      "Available to residents seeking information and referrals for community and government services.",

    phone:
      "211",

    website:
      "https://211central.ca/",

    verified: true,
  },

  {
    id: "211-ontario",

    name: "211 Ontario",

    category: "Community Information and Referrals",

    city: "Toronto",
    district: "",
    province: "Ontario",

    address:
      "Ontario-wide service",

    description:
      "Provincial community information and referral service connecting people with social services, community programs, health resources, employment, food, housing and other supports.",

    services: [
      "Community Referrals",
      "Food Assistance",
      "Housing",
      "Employment",
      "Financial Assistance",
      "Health Care",
      "Mental Health",
      "Legal Services",
      "Newcomer Services",
      "Youth Services",
      "Senior Services",
    ],

    tags: [
      "211",
      "ontario",
      "community",
      "food",
      "housing",
      "employment",
      "financial assistance",
      "health",
      "mental health",
      "legal",
      "newcomer",
    ],

    languages: [
      "English",
      "French",
      "Multilingual",
    ],

    transportation: [
      "Public Transit",
    ],

    eligibility:
      "Ontario residents seeking information and referrals to community and government services.",

    phone:
      "211",

    website:
      "https://211ontario.ca/",

    verified: true,
  },

];

/* =========================================================
 * NORMALIZATION
 * ======================================================= */

function normalizeResource(
  resource: Resource
) {
  return {
    ...resource,

    name: resource.name.trim(),

    category:
      resource.category.trim(),

    city:
      resource.city.trim(),

    district:
      resource.district.trim(),

    province:
      resource.province.trim(),

    address:
      resource.address.trim(),

    description:
      resource.description.trim(),

    services:
      [...new Set(
        resource.services
          .map((item) =>
            item.trim()
          )
          .filter(Boolean)
      )],

    tags:
      [...new Set(
        resource.tags
          .map((item) =>
            item.trim().toLowerCase()
          )
          .filter(Boolean)
      )],

    languages:
      [...new Set(
        resource.languages
          .map((item) =>
            item.trim()
          )
          .filter(Boolean)
      )],

    transportation:
      [...new Set(
        resource.transportation
          .map((item) =>
            item.trim()
          )
          .filter(Boolean)
      )],

    eligibility:
      resource.eligibility.trim(),

    phone:
      resource.phone.trim(),

    website:
      resource.website.trim(),

    verified:
      resource.verified === true,
  };
}

/* =========================================================
 * SEED
 * ======================================================= */

async function seedResources() {
  console.log(
    `Starting GTA resource batch 2: ${resources.length} resources`
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
    const normalized =
      normalizeResource(resource);

    const docRef =
      collectionRef.doc(resource.id);

    const existingDoc =
      await docRef.get();

    await docRef.set(
      {
        ...normalized,

        updatedAt:
          Timestamp.now(),

        ...(existingDoc.exists
          ? {}
          : {
              createdAt:
                Timestamp.now(),
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

  console.log("");

  console.log(
    `Successfully processed ${processed} resources.`
  );

  console.log(
    "No random Firestore document IDs were created."
  );

  console.log("");

  const cities =
    [
      ...new Set(
        resources.map(
          (resource) =>
            resource.district
              ? `${resource.city} - ${resource.district}`
              : resource.city
        )
      ),
    ].sort();

  console.log(
    "Cities / areas represented:"
  );

  for (const city of cities) {
    console.log(`✓ ${city}`);
  }

  console.log("");

  console.log(
    `Total resource IDs in this batch: ${resources.length}`
  );
}

/* =========================================================
 * RUN
 * ======================================================= */

seedResources()
  .then(() => {
    console.log("");
    console.log(
      "GTA resource batch 2 complete."
    );

    process.exit(0);
  })
  .catch((error) => {
    console.error("");
    console.error(
      "Failed to seed GTA resource batch 2:"
    );

    console.error(error);

    process.exit(1);
  });