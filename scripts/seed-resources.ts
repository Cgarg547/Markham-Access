import {
  cert,
  getApps,
  initializeApp,
} from "firebase-admin/app";

import {
  FieldValue,
  getFirestore,
} from "firebase-admin/firestore";

import serviceAccount from "../firebase-service-account.json";

/* =========================================================
 * FIREBASE INITIALIZATION
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
  subcategory?: string;

  city: string;
  district: string;
  region: string;
  province: string;

  address: string;
  postalCode?: string;

  description: string;

  services: string[];
  tags: string[];

  languages: string[];

  transportation: string[];

  eligibility: string;

  phone: string;
  website: string;

  email?: string;

  hours?: string;

  cost?: string;

  accessibility?: string[];

  serviceArea?: string[];

  verified: boolean;

  verificationSource?: string;

  lastVerified?: string;
}

/* =========================================================
 * RESOURCE HELPERS
 * ======================================================= */

const commonTransportation = [
  "Public Transit",
  "TTC",
  "GO Transit",
];

const commonLanguages = [
  "English",
];

function createResource(
  resource: Resource
): Resource {
  return {
    ...resource,

    district:
      resource.district || "",

    province:
      resource.province || "Ontario",

    languages:
      resource.languages?.length
        ? resource.languages
        : commonLanguages,

    transportation:
      resource.transportation?.length
        ? resource.transportation
        : commonTransportation,

    services:
      resource.services || [],

    tags:
      resource.tags || [],

    accessibility:
      resource.accessibility || [
        "Contact provider for accessibility details",
      ],

    serviceArea:
      resource.serviceArea || [
        resource.city,
      ],

    cost:
      resource.cost || "Contact provider",

    verified:
      resource.verified ?? true,

    lastVerified:
      resource.lastVerified ||
      "2026-10-04",
  };
}

/* =========================================================
 * RESOURCES
 *
 * IMPORTANT:
 * Stable IDs are used intentionally.
 *
 * Running this script repeatedly will UPDATE existing
 * documents instead of creating duplicates.
 * ======================================================= */

const resources: Resource[] = [

  /* =======================================================
   * MARKHAM
   * ======================================================= */

  createResource({
    id: "welcome-centre-markham-north",

    name:
      "Welcome Centre Immigrant Services - Markham North",

    category:
      "Newcomer Services",

    subcategory:
      "Settlement and Employment",

    city: "Markham",
    district: "",
    region: "York Region",
    province: "Ontario",

    address:
      "8400 Woodbine Ave, Suite 102-103, Markham, ON L3R 4N7",

    postalCode: "L3R 4N7",

    description:
      "Newcomer settlement and employment support including information, referrals, language programming and employment assistance.",

    services: [
      "Settlement Services",
      "Newcomer Support",
      "Employment",
      "Job Search",
      "English Classes",
      "Language Support",
      "Community Referrals",
      "Information and Referral",
    ],

    tags: [
      "newcomer",
      "immigrant",
      "settlement",
      "employment",
      "job",
      "resume",
      "english",
      "language",
      "community",
    ],

    languages: [
      "English",
    ],

    transportation:
      commonTransportation,

    eligibility:
      "Immigrants and newcomers; program eligibility may vary.",

    phone:
      "289-846-3645",

    website:
      "https://www.jobskills.org/welcome-centre/",

    cost:
      "Free",

    serviceArea: [
      "Markham",
      "York Region",
    ],

    verified: true,

    verificationSource:
      "Job Skills / Welcome Centre",

    lastVerified:
      "2026-10-04",
  }),

  createResource({
    id: "welcome-centre-markham-south",

    name:
      "Welcome Centre Immigrant Services - Markham South",

    category:
      "Newcomer Services",

    subcategory:
      "Settlement and Employment",

    city: "Markham",
    district: "",
    region: "York Region",
    province: "Ontario",

    address:
      "7220 Kennedy Road, Markham, ON L3R 7P2",

    postalCode:
      "L3R 7P2",

    description:
      "Newcomer settlement, employment, language and community support.",

    services: [
      "Settlement Services",
      "Newcomer Support",
      "Employment",
      "Job Search",
      "English Classes",
      "Language Support",
      "Community Referrals",
      "Family Support",
    ],

    tags: [
      "newcomer",
      "immigrant",
      "settlement",
      "employment",
      "job",
      "language",
      "english",
      "family",
      "community",
    ],

    languages: [
      "English",
    ],

    transportation:
      commonTransportation,

    eligibility:
      "Immigrants and newcomers; eligibility varies by program.",

    phone:
      "905-479-7926",

    website:
      "https://www.jobskills.org/welcome-centre/",

    cost:
      "Free",

    serviceArea: [
      "Markham",
      "York Region",
    ],

    verified: true,

    verificationSource:
      "Job Skills / Welcome Centre",

    lastVerified:
      "2026-10-04",
  }),

  createResource({
    id: "markham-food-bank",

    name:
      "Markham Food Bank",

    category:
      "Food Assistance",

    subcategory:
      "Food Bank",

    city: "Markham",
    district: "",
    region: "York Region",
    province: "Ontario",

    address:
      "190 Bullock Drive, Unit 11, Markham, ON L3P 7N3",

    postalCode:
      "L3P 7N3",

    description:
      "Emergency food assistance and basic necessities for eligible Markham residents experiencing food insecurity.",

    services: [
      "Food Bank",
      "Emergency Food",
      "Groceries",
      "Basic Necessities",
      "Personal Hygiene Products",
      "Infant Supplies",
    ],

    tags: [
      "food",
      "food bank",
      "groceries",
      "hungry",
      "food insecurity",
      "emergency food",
      "financial hardship",
    ],

    languages: [
      "English",
    ],

    transportation:
      commonTransportation,

    eligibility:
      "Eligibility and residency requirements apply. Contact the organization before visiting.",

    phone:
      "905-472-2437",

    website:
      "https://markhamfoodbank.ca/",

    cost:
      "Free for eligible clients",

    serviceArea: [
      "Markham",
    ],

    verified: true,

    verificationSource:
      "Markham Food Bank / Feed Ontario",

    lastVerified:
      "2026-10-04",
  }),

  createResource({
    id: "job-skills-markham",

    name:
      "Job Skills - Markham",

    category:
      "Employment Services",

    subcategory:
      "Employment Ontario",

    city: "Markham",
    district: "",
    region: "York Region",
    province: "Ontario",

    address:
      "4961 Highway 7, Units 100-101, Markham, ON L3R 1N1",

    postalCode:
      "L3R 1N1",

    description:
      "Employment support including job search, resume and cover letter assistance, interview preparation, career planning, training information and employer connections.",

    services: [
      "Employment",
      "Job Search",
      "Resume Help",
      "Cover Letter Help",
      "Interview Preparation",
      "Career Coaching",
      "Training",
      "Job Matching",
      "Employer Connections",
    ],

    tags: [
      "job",
      "jobs",
      "employment",
      "career",
      "resume",
      "cv",
      "interview",
      "work",
      "training",
      "employment ontario",
    ],

    languages: [
      "English",
    ],

    transportation:
      commonTransportation,

    eligibility:
      "Employment Ontario eligibility may apply.",

    phone:
      "905-948-9996",

    website:
      "https://www.jobskills.org/",

    cost:
      "Free",

    serviceArea: [
      "Markham",
      "York Region",
    ],

    verified: true,

    verificationSource:
      "Job Skills",

    lastVerified:
      "2026-10-04",
  }),

  createResource({
    id: "105-gibson-centre",

    name:
      "105 Gibson Centre",

    category:
      "Community Services",

    subcategory:
      "Community Support",

    city: "Markham",
    district: "",
    region: "York Region",
    province: "Ontario",

    address:
      "105 Gibson Drive, Markham, ON L3R 3K7",

    postalCode:
      "L3R 3K7",

    description:
      "Community centre providing social, educational, employment, food, settlement, youth and senior programming.",

    services: [
      "Community Services",
      "Food Assistance",
      "Settlement",
      "Employment Support",
      "Youth Programs",
      "Senior Programs",
      "Education",
      "Community Activities",
    ],

    tags: [
      "community",
      "newcomer",
      "settlement",
      "food",
      "employment",
      "senior",
      "youth",
      "education",
    ],

    languages: [
      "English",
      "Mandarin",
      "Cantonese",
      "Arabic",
      "Spanish",
    ],

    transportation:
      commonTransportation,

    eligibility:
      "Open to the community; individual programs may have specific eligibility requirements.",

    phone:
      "905-946-8787",

    website:
      "https://105gibson.com/",

    cost:
      "Varies by program",

    serviceArea: [
      "Markham",
      "York Region",
    ],

    verified: true,

    lastVerified:
      "2026-10-04",
  }),

  /* =======================================================
   * RICHMOND HILL
   * ======================================================= */

  createResource({
    id: "welcome-centre-richmond-hill",

    name:
      "Welcome Centre Immigrant Services - Richmond Hill",

    category:
      "Newcomer Services",

    subcategory:
      "Settlement and Employment",

    city: "Richmond Hill",
    district: "",
    region: "York Region",
    province: "Ontario",

    address:
      "9325 Yonge Street, Unit 31A, Richmond Hill, ON L4C 0A8",

    postalCode:
      "L4C 0A8",

    description:
      "One-stop newcomer services including settlement information, referrals, employment support and language programming.",

    services: [
      "Settlement Services",
      "Newcomer Support",
      "Employment",
      "Job Search",
      "Language Support",
      "English Classes",
      "Information and Referral",
    ],

    tags: [
      "newcomer",
      "immigrant",
      "settlement",
      "employment",
      "job",
      "language",
      "english",
    ],

    languages: [
      "English",
    ],

    transportation:
      commonTransportation,

    eligibility:
      "Newcomers and immigrants; eligibility varies by service.",

    phone:
      "289-842-3124",

    website:
      "https://www.jobskills.org/welcome-centre/",

    cost:
      "Free",

    serviceArea: [
      "Richmond Hill",
      "York Region",
    ],

    verified: true,

    verificationSource:
      "Job Skills / Welcome Centre",

    lastVerified:
      "2026-10-04",
  }),

  createResource({
    id: "richmond-hill-community-food-bank",

    name:
      "Richmond Hill Community Food Bank",

    category:
      "Food Assistance",

    subcategory:
      "Food Bank",

    city: "Richmond Hill",
    district: "",
    region: "York Region",
    province: "Ontario",

    address:
      "55 Newkirk Road, Richmond Hill, ON L4C 3G4",

    postalCode:
      "L4C 3G4",

    description:
      "Community food bank providing food assistance to eligible residents.",

    services: [
      "Food Bank",
      "Emergency Food",
      "Groceries",
      "Food Assistance",
    ],

    tags: [
      "food",
      "food bank",
      "groceries",
      "hungry",
      "food insecurity",
    ],

    languages: [
      "English",
    ],

    transportation:
      commonTransportation,

    eligibility:
      "Eligibility and registration requirements apply. Contact the organization before visiting.",

    phone:
      "905-508-4761",

    website:
      "https://www.rhfoodbank.ca/",

    cost:
      "Free for eligible clients",

    serviceArea: [
      "Richmond Hill",
    ],

    verified: true,

    verificationSource:
      "Feed Ontario",

    lastVerified:
      "2026-10-04",
  }),

  /* =======================================================
   * VAUGHAN
   * ======================================================= */

  createResource({
    id: "welcome-centre-vaughan",

    name:
      "Welcome Centre Immigrant Services - Vaughan",

    category:
      "Newcomer Services",

    subcategory:
      "Settlement and Employment",

    city: "Vaughan",
    district: "",
    region: "York Region",
    province: "Ontario",

    address:
      "9100 Jane Street, Building H, Units 56-67, Vaughan, ON L4K 0A4",

    postalCode:
      "L4K 0A4",

    description:
      "Newcomer settlement, employment, language and community support.",

    services: [
      "Settlement Services",
      "Newcomer Support",
      "Employment",
      "Job Search",
      "Language Support",
      "English Classes",
      "Community Referrals",
    ],

    tags: [
      "newcomer",
      "immigrant",
      "settlement",
      "employment",
      "job",
      "language",
    ],

    languages: [
      "English",
    ],

    transportation:
      commonTransportation,

    eligibility:
      "Newcomers and immigrants; program eligibility varies.",

    phone:
      "905-761-1155",

    website:
      "https://www.jobskills.org/welcome-centre/",

    cost:
      "Free",

    serviceArea: [
      "Vaughan",
      "York Region",
    ],

    verified: true,

    verificationSource:
      "Job Skills / Welcome Centre",

    lastVerified:
      "2026-10-04",
  }),

  createResource({
    id: "vaughan-food-bank",

    name:
      "Vaughan Food Bank",

    category:
      "Food Assistance",

    subcategory:
      "Food Bank",

    city: "Vaughan",
    district: "",
    region: "York Region",
    province: "Ontario",

    address:
      "5732 Highway 7, Units 3 & 4, Woodbridge, ON L4L 3A2",

    postalCode:
      "L4L 3A2",

    description:
      "Food assistance for Vaughan residents experiencing food insecurity.",

    services: [
      "Food Bank",
      "Emergency Food",
      "Groceries",
      "Food Assistance",
    ],

    tags: [
      "food",
      "food bank",
      "groceries",
      "hungry",
      "food insecurity",
    ],

    languages: [
      "English",
    ],

    transportation:
      commonTransportation,

    eligibility:
      "Vaughan residents in need of food assistance. Identification and proof of address may be required.",

    phone:
      "905-851-2333",

    website:
      "https://www.vaughanfoodbank.ca/",

    cost:
      "Free for eligible clients",

    serviceArea: [
      "Vaughan",
    ],

    verified: true,

    verificationSource:
      "Vaughan Food Bank",

    lastVerified:
      "2026-10-04",
  }),

  /* =======================================================
   * NEWMARKET
   * ======================================================= */

  createResource({
    id: "welcome-centre-newmarket",

    name:
      "Welcome Centre Immigrant Services - Newmarket",

    category:
      "Newcomer Services",

    subcategory:
      "Settlement and Employment",

    city: "Newmarket",
    district: "",
    region: "York Region",
    province: "Ontario",

    address:
      "16655 Yonge Street, Unit 26, Newmarket, ON L3X 1V6",

    postalCode:
      "L3X 1V6",

    description:
      "Settlement, employment, language and newcomer support services.",

    services: [
      "Settlement Services",
      "Newcomer Support",
      "Employment",
      "Job Search",
      "Language Support",
      "English Classes",
      "Information and Referral",
    ],

    tags: [
      "newcomer",
      "immigrant",
      "settlement",
      "employment",
      "job",
      "language",
    ],

    languages: [
      "English",
    ],

    transportation:
      commonTransportation,

    eligibility:
      "Newcomers and immigrants; eligibility varies by service.",

    phone:
      "289-841-3032",

    website:
      "https://www.jobskills.org/welcome-centre/",

    cost:
      "Free",

    serviceArea: [
      "Newmarket",
      "York Region",
    ],

    verified: true,

    verificationSource:
      "Job Skills / Welcome Centre",

    lastVerified:
      "2026-10-04",
  }),

  createResource({
    id: "job-skills-newmarket",

    name:
      "Job Skills - Newmarket",

    category:
      "Employment Services",

    subcategory:
      "Employment Support",

    city: "Newmarket",
    district: "",
    region: "York Region",
    province: "Ontario",

    address:
      "14-130 Davis Drive, Newmarket, ON L3Y 2N1",

    postalCode:
      "L3Y 2N1",

    description:
      "Employment and career services including job search support, career planning, training information and employer services.",

    services: [
      "Employment",
      "Job Search",
      "Career Planning",
      "Resume Help",
      "Interview Preparation",
      "Training",
      "Employer Services",
    ],

    tags: [
      "job",
      "employment",
      "career",
      "resume",
      "interview",
      "training",
    ],

    languages: [
      "English",
    ],

    transportation:
      commonTransportation,

    eligibility:
      "Employment Ontario eligibility may apply.",

    phone:
      "905-898-5138",

    website:
      "https://www.jobskills.org/",

    cost:
      "Free",

    serviceArea: [
      "Newmarket",
      "York Region",
    ],

    verified: true,

    verificationSource:
      "Job Skills",

    lastVerified:
      "2026-10-04",
  }),

  createResource({
    id: "newmarket-food-pantry",

    name:
      "Newmarket Food Pantry",

    category:
      "Food Assistance",

    subcategory:
      "Food Bank",

    city: "Newmarket",
    district: "",
    region: "York Region",
    province: "Ontario",

    address:
      "Newmarket, Ontario",

    description:
      "Community food assistance for eligible residents experiencing food insecurity.",

    services: [
      "Food Bank",
      "Food Assistance",
      "Groceries",
    ],

    tags: [
      "food",
      "food bank",
      "groceries",
      "hungry",
      "food insecurity",
    ],

    languages: [
      "English",
    ],

    transportation:
      commonTransportation,

    eligibility:
      "Eligibility and intake requirements apply. Confirm current location and registration requirements before visiting.",

    phone:
      "",

    website:
      "https://feedontario.ca/find-a-food-bank/",

    cost:
      "Free for eligible clients",

    serviceArea: [
      "Newmarket",
    ],

    verified: true,

    verificationSource:
      "Feed Ontario",

    lastVerified:
      "2026-10-04",
  }),

  /* =======================================================
   * BRAMPTON
   * ======================================================= */

  createResource({
    id: "job-skills-brampton",

    name:
      "Job Skills - Brampton Employment Services",

    category:
      "Employment Services",

    subcategory:
      "Employment Ontario",

    city: "Brampton",
    district: "",
    region: "Peel Region",
    province: "Ontario",

    address:
      "50 Sunnyvale Gate, Unit 12, Brampton, ON L6S 0C4",

    postalCode:
      "L6S 0C4",

    description:
      "Employment Ontario support including job search, resume assistance, interview preparation, training and employer connections.",

    services: [
      "Employment",
      "Job Search",
      "Resume Help",
      "Interview Preparation",
      "Career Coaching",
      "Training",
      "Job Matching",
      "Employer Connections",
    ],

    tags: [
      "job",
      "jobs",
      "employment",
      "career",
      "resume",
      "interview",
      "training",
      "employment ontario",
    ],

    languages: [
      "English",
    ],

    transportation:
      commonTransportation,

    eligibility:
      "Employment Ontario eligibility may apply.",

    phone:
      "905-453-7896",

    website:
      "https://www.jobskills.org/",

    cost:
      "Free",

    serviceArea: [
      "Brampton",
      "Peel Region",
    ],

    verified: true,

    verificationSource:
      "Job Skills",

    lastVerified:
      "2026-10-04",
  }),

  createResource({
    id: "knights-table-brampton",

    name:
      "Knights Table",

    category:
      "Food Assistance",

    subcategory:
      "Food Bank and Community Meals",

    city: "Brampton",
    district: "",
    region: "Peel Region",
    province: "Ontario",

    address:
      "73 Hale Road, Brampton, ON L6W 1H9",

    postalCode:
      "L6W 1H9",

    description:
      "Community food assistance and support for people experiencing food insecurity.",

    services: [
      "Food Bank",
      "Emergency Food",
      "Community Meals",
      "Food Assistance",
    ],

    tags: [
      "food",
      "food bank",
      "meals",
      "groceries",
      "hungry",
      "food insecurity",
    ],

    languages: [
      "English",
    ],

    transportation:
      commonTransportation,

    eligibility:
      "Eligibility and intake requirements may apply.",

    phone:
      "905-454-8725",

    website:
      "https://www.knightstable.org/",

    cost:
      "Free for eligible clients",

    serviceArea: [
      "Brampton",
      "Peel Region",
    ],

    verified: true,

    verificationSource:
      "Feed Ontario",

    lastVerified:
      "2026-10-04",
  }),

  createResource({
    id: "indus-brampton-employment",

    name:
      "Indus Community Services - Brampton Employment Services",

    category:
      "Employment Services",

    subcategory:
      "Newcomer Employment",

    city: "Brampton",
    district: "",
    region: "Peel Region",
    province: "Ontario",

    address:
      "60 Gillingham Drive, Suite 500, Brampton, ON L6X 0Z9",

    postalCode:
      "L6X 0Z9",

    description:
      "Employment counselling, job-search workshops, resume and cover letter support, interview coaching, job fairs and networking for eligible newcomers.",

    services: [
      "Employment",
      "Job Search",
      "Employment Counselling",
      "Resume Help",
      "Cover Letter Help",
      "Interview Preparation",
      "Job Fairs",
      "Networking",
      "Newcomer Employment",
    ],

    tags: [
      "newcomer",
      "immigrant",
      "job",
      "employment",
      "resume",
      "interview",
      "job fair",
      "networking",
    ],

    languages: [
      "English",
      "Bengali",
      "Gujarati",
      "Hindi",
      "Punjabi",
      "Tamil",
      "Urdu",
    ],

    transportation:
      commonTransportation,

    eligibility:
      "Eligible newcomers including landed immigrants and refugees; confirm current program eligibility.",

    phone:
      "905-459-4776",

    website:
      "https://induscs.ca/employment-services/",

    cost:
      "Free",

    serviceArea: [
      "Brampton",
      "Caledon",
      "Mississauga",
      "Malton",
      "Etobicoke",
    ],

    verified: true,

    verificationSource:
      "Indus Community Services",

    lastVerified:
      "2026-10-04",
  }),

  /* =======================================================
   * MISSISSAUGA
   * ======================================================= */

  createResource({
    id: "job-skills-mississauga",

    name:
      "Job Skills - Mississauga Employment Services",

    category:
      "Employment Services",

    subcategory:
      "Employment Ontario",

    city: "Mississauga",
    district: "",
    region: "Peel Region",
    province: "Ontario",

    address:
      "1325 Eglinton Avenue East, Unit 213, Mississauga, ON L4W 4L9",

    postalCode:
      "L4W 4L9",

    description:
      "Employment Ontario services including job search, resume help, interview preparation, career support and training referrals.",

    services: [
      "Employment",
      "Job Search",
      "Resume Help",
      "Interview Preparation",
      "Career Coaching",
      "Training",
      "Job Matching",
    ],

    tags: [
      "job",
      "jobs",
      "employment",
      "career",
      "resume",
      "interview",
      "training",
    ],

    languages: [
      "English",
    ],

    transportation:
      commonTransportation,

    eligibility:
      "Employment Ontario eligibility may apply.",

    phone:
      "905-273-3360",

    website:
      "https://www.jobskills.org/",

    cost:
      "Free",

    serviceArea: [
      "Mississauga",
      "Peel Region",
    ],

    verified: true,

    verificationSource:
      "Job Skills",

    lastVerified:
      "2026-10-04",
  }),

  createResource({
    id: "foodbanks-mississauga",

    name:
      "Food Banks Mississauga",

    category:
      "Food Assistance",

    subcategory:
      "Food Bank",

    city: "Mississauga",
    district: "",
    region: "Peel Region",
    province: "Ontario",

    address:
      "Mississauga, Ontario",

    description:
      "Food assistance and community food programs for residents experiencing food insecurity.",

    services: [
      "Food Bank",
      "Food Assistance",
      "Emergency Food",
      "Groceries",
      "Food Security Support",
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

    transportation:
      commonTransportation,

    eligibility:
      "Eligibility and intake requirements apply. Confirm the current service location before visiting.",

    phone:
      "",

    website:
      "https://www.foodbanksmississauga.ca/",

    cost:
      "Free for eligible clients",

    serviceArea: [
      "Mississauga",
      "Peel Region",
    ],

    verified: true,

    verificationSource:
      "Feed Ontario",

    lastVerified:
      "2026-10-04",
  }),

  createResource({
    id: "indus-mississauga",

    name:
      "Indus Community Services - Mississauga",

    category:
      "Newcomer Services",

    subcategory:
      "Settlement and Family Services",

    city: "Mississauga",
    district: "",
    region: "Peel Region",
    province: "Ontario",

    address:
      "3038 Hurontario Street, Suite 206, Mississauga, ON L5B 3B9",

    postalCode:
      "L5B 3B9",

    description:
      "Newcomer settlement, information and referral, employment, language and community support.",

    services: [
      "Settlement Services",
      "Newcomer Support",
      "Employment",
      "Information and Referral",
      "Language Support",
      "Family Services",
      "Community Support",
    ],

    tags: [
      "newcomer",
      "immigrant",
      "settlement",
      "employment",
      "language",
      "family",
      "community",
    ],

    languages: [
      "English",
      "Hindi",
      "Punjabi",
      "Gujarati",
      "Tamil",
      "Urdu",
      "Bengali",
    ],

    transportation:
      commonTransportation,

    eligibility:
      "Eligibility varies by program.",

    phone:
      "905-275-2369",

    website:
      "https://induscs.ca/",

    cost:
      "Free for eligible services",

    serviceArea: [
      "Mississauga",
      "Brampton",
      "Peel Region",
    ],

    verified: true,

    verificationSource:
      "Indus Community Services",

    lastVerified:
      "2026-10-04",
  }),

  /* =======================================================
   * OAKVILLE
   * ======================================================= */

  createResource({
    id: "kerr-street-mission-oakville",

    name:
      "Kerr Street Mission",

    category:
      "Food Assistance",

    subcategory:
      "Food and Community Support",

    city: "Oakville",
    district: "",
    region: "Halton Region",
    province: "Ontario",

    address:
      "485 Kerr Street, Oakville, ON L6K 3C6",

    postalCode:
      "L6K 3C6",

    description:
      "Community support organization providing food assistance and other supports for people experiencing hardship.",

    services: [
      "Food Assistance",
      "Food Bank",
      "Emergency Food",
      "Community Support",
      "Basic Needs",
    ],

    tags: [
      "food",
      "food bank",
      "groceries",
      "emergency assistance",
      "basic needs",
      "community",
    ],

    languages: [
      "English",
    ],

    transportation:
      commonTransportation,

    eligibility:
      "Program eligibility varies. Contact the organization for current requirements.",

    phone:
      "905-845-7485",

    website:
      "https://www.kerrstreet.com/",

    cost:
      "Free for eligible services",

    serviceArea: [
      "Oakville",
      "Halton Region",
    ],

    verified: true,

    verificationSource:
      "Feed Ontario",

    lastVerified:
      "2026-10-04",
  }),

  /* =======================================================
   * BURLINGTON
   * ======================================================= */

  createResource({
    id: "burlington-food-bank",

    name:
      "Burlington Food Bank",

    category:
      "Food Assistance",

    subcategory:
      "Food Bank",

    city: "Burlington",
    district: "",
    region: "Halton Region",
    province: "Ontario",

    address:
      "Burlington, Ontario",

    description:
      "Food assistance for Burlington residents experiencing food insecurity.",

    services: [
      "Food Bank",
      "Emergency Food",
      "Groceries",
      "Food Assistance",
    ],

    tags: [
      "food",
      "food bank",
      "groceries",
      "hungry",
      "food insecurity",
    ],

    languages: [
      "English",
    ],

    transportation:
      commonTransportation,

    eligibility:
      "Eligibility and registration requirements apply. Confirm the current service location before visiting.",

    phone:
      "",

    website:
      "https://www.burlingtonfoodbank.ca/",

    cost:
      "Free for eligible clients",

    serviceArea: [
      "Burlington",
      "Halton Region",
    ],

    verified: true,

    verificationSource:
      "Feed Ontario",

    lastVerified:
      "2026-10-04",
  }),

  /* =======================================================
   * MILTON
   * ======================================================= */

  createResource({
    id: "salvation-army-milton-food",

    name:
      "The Salvation Army - Khi Community Milton",

    category:
      "Food Assistance",

    subcategory:
      "Community Food Support",

    city: "Milton",
    district: "",
    region: "Halton Region",
    province: "Ontario",

    address:
      "Milton, Ontario",

    description:
      "Community food assistance and support for eligible residents.",

    services: [
      "Food Assistance",
      "Food Bank",
      "Emergency Food",
      "Community Support",
    ],

    tags: [
      "food",
      "food bank",
      "groceries",
      "hungry",
      "emergency assistance",
    ],

    languages: [
      "English",
    ],

    transportation:
      commonTransportation,

    eligibility:
      "Eligibility varies. Confirm current registration and location requirements before visiting.",

    phone:
      "",

    website:
      "https://www.salvationarmy.ca/",

    cost:
      "Free for eligible clients",

    serviceArea: [
      "Milton",
      "Halton Region",
    ],

    verified: true,

    verificationSource:
      "Feed Ontario",

    lastVerified:
      "2026-10-04",
  }),

  /* =======================================================
   * OSHAWA / DURHAM
   * ======================================================= */

  createResource({
    id: "feed-the-need-durham",

    name:
      "Feed the Need in Durham",

    category:
      "Food Assistance",

    subcategory:
      "Food Distribution",

    city: "Oshawa",
    district: "",
    region: "Durham Region",
    province: "Ontario",

    address:
      "Oshawa, Ontario",

    description:
      "Food distribution and food security organization serving communities throughout Durham Region.",

    services: [
      "Food Assistance",
      "Food Distribution",
      "Food Bank Support",
      "Food Security",
      "Community Support",
    ],

    tags: [
      "food",
      "food bank",
      "food security",
      "groceries",
      "Durham",
      "Oshawa",
      "Ajax",
      "Whitby",
      "Pickering",
    ],

    languages: [
      "English",
    ],

    transportation:
      commonTransportation,

    eligibility:
      "Service eligibility and access depend on the partner food program.",

    phone:
      "",

    website:
      "https://feedtheneedindurham.ca/",

    cost:
      "Free for eligible clients",

    serviceArea: [
      "Oshawa",
      "Whitby",
      "Ajax",
      "Pickering",
      "Durham Region",
    ],

    verified: true,

    verificationSource:
      "Feed Ontario",

    lastVerified:
      "2026-10-04",
  }),

  createResource({
    id: "clarington-east-foodbank",

    name:
      "Clarington East Foodbank",

    category:
      "Food Assistance",

    subcategory:
      "Food Bank",

    city: "Clarington",
    district: "",
    region: "Durham Region",
    province: "Ontario",

    address:
      "Newcastle, Ontario",

    description:
      "Food bank serving residents in the eastern portion of Clarington.",

    services: [
      "Food Bank",
      "Emergency Food",
      "Groceries",
      "Food Assistance",
    ],

    tags: [
      "food",
      "food bank",
      "groceries",
      "hungry",
      "Clarington",
      "Newcastle",
    ],

    languages: [
      "English",
    ],

    transportation:
      commonTransportation,

    eligibility:
      "Eligibility and registration requirements apply.",

    phone:
      "",

    website:
      "https://feedontario.ca/find-a-food-bank/",

    cost:
      "Free for eligible clients",

    serviceArea: [
      "Clarington",
      "Newcastle",
      "Durham Region",
    ],

    verified: true,

    verificationSource:
      "Feed Ontario",

    lastVerified:
      "2026-10-04",
  }),

  /* =======================================================
   * TORONTO - SCARBOROUGH
   * ======================================================= */

  createResource({
    id: "jvs-employment-source-scarborough",

    name:
      "JVS Toronto Employment Source - Scarborough",

    category:
      "Employment Services",

    subcategory:
      "Employment Support",

    city: "Toronto",
    district: "Scarborough",
    region: "Toronto",
    province: "Ontario",

    address:
      "Scarborough, Toronto, Ontario",

    description:
      "Employment and career support including job search assistance, resume development, interview preparation and employment counselling.",

    services: [
      "Employment",
      "Job Search",
      "Resume Help",
      "Interview Preparation",
      "Career Counselling",
      "Job Matching",
    ],

    tags: [
      "job",
      "employment",
      "career",
      "resume",
      "interview",
      "Scarborough",
      "Toronto",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "TTC",
      "Public Transit",
      "GO Transit",
    ],

    eligibility:
      "Eligibility depends on the Employment Source program.",

    phone:
      "",

    website:
      "https://www.jvstoronto.org/find-a-job/employment-source2/",

    cost:
      "Free",

    serviceArea: [
      "Scarborough",
      "Toronto",
    ],

    verified: true,

    verificationSource:
      "JVS Toronto",

    lastVerified:
      "2026-10-04",
  }),

  createResource({
    id: "kennedy-newcomer-service-centre",

    name:
      "CICS - Kennedy Newcomer Service Centre",

    category:
      "Newcomer Services",

    subcategory:
      "Settlement Services",

    city: "Toronto",
    district: "Scarborough",
    region: "Toronto",
    province: "Ontario",

    address:
      "2075 Kennedy Road, Suites 703 and 705, Toronto, ON M1T 3V3",

    postalCode:
      "M1T 3V3",

    description:
      "Settlement information, referral and newcomer support including needs assessment and community navigation.",

    services: [
      "Settlement Services",
      "Newcomer Support",
      "Information and Referral",
      "Needs Assessment",
      "Community Navigation",
      "Mental Health Support",
    ],

    tags: [
      "newcomer",
      "immigrant",
      "settlement",
      "Scarborough",
      "Toronto",
      "referral",
      "community",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "TTC",
      "Public Transit",
    ],

    eligibility:
      "Newcomers and immigrants; eligibility varies by program.",

    phone:
      "416-293-4565",

    website:
      "https://www.cicscanada.com/",

    cost:
      "Free for eligible services",

    serviceArea: [
      "Scarborough",
      "Toronto",
    ],

    verified: true,

    verificationSource:
      "211 Ontario / CICS",

    lastVerified:
      "2026-10-04",
  }),

  /* =======================================================
   * TORONTO - NORTH YORK
   * ======================================================= */

  createResource({
    id: "costi-north-york-employment",

    name:
      "COSTI - Integrated Employment Services",

    category:
      "Employment Services",

    subcategory:
      "Employment Support",

    city: "Toronto",
    district: "North York",
    region: "Toronto",
    province: "Ontario",

    address:
      "1700 Wilson Avenue, Suite 201, Toronto, ON M3L 1B2",

    postalCode:
      "M3L 1B2",

    description:
      "Employment resources and coaching to help job seekers find sustainable employment in Ontario.",

    services: [
      "Employment",
      "Job Search",
      "Career Coaching",
      "Resume Help",
      "Interview Preparation",
      "Employment Counselling",
    ],

    tags: [
      "job",
      "employment",
      "career",
      "resume",
      "interview",
      "North York",
      "Toronto",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "TTC",
      "Public Transit",
    ],

    eligibility:
      "Program eligibility may vary.",

    phone:
      "416-789-7925",

    website:
      "https://www.costi.org/",

    cost:
      "Free for eligible services",

    serviceArea: [
      "North York",
      "Toronto",
    ],

    verified: true,

    verificationSource:
      "211 Ontario",

    lastVerified:
      "2026-10-04",
  }),

  createResource({
    id: "mnlc-north-york",

    name:
      "Mennonite New Life Centre - North York",

    category:
      "Newcomer Services",

    subcategory:
      "Settlement Services",

    city: "Toronto",
    district: "North York",
    region: "Toronto",
    province: "Ontario",

    address:
      "4580 Dufferin Street, 2nd Floor, Toronto, ON M3H 5Y2",

    postalCode:
      "M3H 5Y2",

    description:
      "Newcomer settlement information, referral and community integration services.",

    services: [
      "Settlement Services",
      "Newcomer Support",
      "Information and Referral",
      "Employment Support",
      "Language Support",
      "Community Connections",
    ],

    tags: [
      "newcomer",
      "immigrant",
      "settlement",
      "North York",
      "Toronto",
      "employment",
      "language",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "TTC",
      "Public Transit",
    ],

    eligibility:
      "Newcomers and immigrants; program eligibility varies.",

    phone:
      "416-630-0330",

    website:
      "https://mnlct.org/",

    cost:
      "Free for eligible services",

    serviceArea: [
      "North York",
      "Toronto",
    ],

    verified: true,

    verificationSource:
      "211 Ontario",

    lastVerified:
      "2026-10-04",
  }),

  /* =======================================================
   * TORONTO - ETOBICOKE
   * ======================================================= */

  createResource({
    id: "ymca-newcomer-etobicoke",

    name:
      "YMCA of Greater Toronto - Newcomer Information Centre, Etobicoke",

    category:
      "Newcomer Services",

    subcategory:
      "Settlement and Employment",

    city: "Toronto",
    district: "Etobicoke",
    region: "Toronto",
    province: "Ontario",

    address:
      "1530 Albion Road, Unit 83, Toronto, ON M9V 1B4",

    postalCode:
      "M9V 1B4",

    description:
      "Newcomer settlement information, referrals, employment support, language resources and community navigation.",

    services: [
      "Settlement Services",
      "Newcomer Support",
      "Employment",
      "Job Search",
      "Language Classes",
      "Information and Referral",
      "Housing Referrals",
      "Health Referrals",
      "Community Support",
    ],

    tags: [
      "newcomer",
      "immigrant",
      "settlement",
      "employment",
      "job",
      "language",
      "housing",
      "Etobicoke",
      "Toronto",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "TTC",
      "Public Transit",
    ],

    eligibility:
      "Newcomers and immigrants; eligibility varies by program.",

    phone:
      "416-741-8714",

    website:
      "https://www.ymcagta.org/employment-and-immigrant-services/newcomer-services",

    cost:
      "Free for eligible services",

    serviceArea: [
      "Etobicoke",
      "Toronto",
    ],

    verified: true,

    verificationSource:
      "211 Ontario",

    lastVerified:
      "2026-10-04",
  }),

  /* =======================================================
   * TORONTO - DOWNTOWN
   * ======================================================= */

  createResource({
    id: "ymca-newcomer-downtown",

    name:
      "YMCA of Greater Toronto - Barrett Centre for Newcomers",

    category:
      "Newcomer Services",

    subcategory:
      "Settlement Services",

    city: "Toronto",
    district: "Downtown Toronto",
    region: "Toronto",
    province: "Ontario",

    address:
      "365 Bloor Street East, 1800A, Toronto, ON M4W 3L4",

    postalCode:
      "M4W 3L4",

    description:
      "Newcomer settlement information and referral, employment and job-search support, language resources and community connections.",

    services: [
      "Settlement Services",
      "Newcomer Support",
      "Employment",
      "Job Search",
      "Language Support",
      "Information and Referral",
      "Community Connections",
      "Education Referrals",
      "Housing Referrals",
    ],

    tags: [
      "newcomer",
      "immigrant",
      "settlement",
      "employment",
      "job",
      "language",
      "housing",
      "Toronto",
      "downtown",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "TTC",
      "Public Transit",
    ],

    eligibility:
      "Newcomers and immigrants; program eligibility varies.",

    phone:
      "437-577-0378",

    website:
      "https://www.ymcagta.org/employment-and-immigrant-services/newcomer-services",

    cost:
      "Free for eligible services",

    serviceArea: [
      "Toronto",
    ],

    verified: true,

    verificationSource:
      "211 Ontario",

    lastVerified:
      "2026-10-04",
  }),

  createResource({
    id: "matthew-house-toronto",

    name:
      "Matthew House Refugee Reception Services",

    category:
      "Newcomer Services",

    subcategory:
      "Refugee Support and Transitional Housing",

    city: "Toronto",
    district: "Downtown Toronto",
    region: "Toronto",
    province: "Ontario",

    address:
      "981 Dundas Street West, Toronto, ON M6J 1W4",

    postalCode:
      "M6J 1W4",

    description:
      "Short-stay shelter and transitional support for refugees, including settlement assistance and support navigating the refugee claim process.",

    services: [
      "Refugee Support",
      "Emergency Shelter",
      "Transitional Housing",
      "Settlement Services",
      "Refugee Claim Support",
      "Community Support",
    ],

    tags: [
      "refugee",
      "newcomer",
      "shelter",
      "housing",
      "settlement",
      "emergency",
      "Toronto",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "TTC",
      "Public Transit",
    ],

    eligibility:
      "Refugees and eligible newcomers; contact the organization for intake requirements.",

    phone:
      "416-203-7848",

    website:
      "https://matthewhouse.ca/",

    cost:
      "Contact provider",

    serviceArea: [
      "Toronto",
    ],

    verified: true,

    verificationSource:
      "211 Ontario",

    lastVerified:
      "2026-10-04",
  }),

  /* =======================================================
   * TORONTO - FINANCIAL / SOCIAL SUPPORT
   * ======================================================= */

  createResource({
    id: "toronto-employment-social-services",

    name:
      "Toronto Employment & Social Services",

    category:
      "Financial Assistance",

    subcategory:
      "Ontario Works and Employment Supports",

    city: "Toronto",
    district: "",
    region: "Toronto",
    province: "Ontario",

    address:
      "Multiple locations across Toronto",

    description:
      "Provides financial and social supports and referrals to employment, housing, childcare, health and other community services for eligible residents.",

    services: [
      "Financial Assistance",
      "Ontario Works",
      "Employment Support",
      "Housing Referrals",
      "Childcare Referrals",
      "Health Referrals",
      "Community Referrals",
    ],

    tags: [
      "financial",
      "money",
      "Ontario Works",
      "employment",
      "housing",
      "childcare",
      "health",
      "Toronto",
    ],

    languages: [
      "English",
    ],

    transportation: [
      "TTC",
      "Public Transit",
    ],

    eligibility:
      "Ontario Works and related program eligibility requirements apply.",

    phone:
      "1-888-999-1142",

    website:
      "https://www.toronto.ca/community-people/employment-social-support/",

    cost:
      "Government service",

    serviceArea: [
      "Toronto",
      "Scarborough",
      "North York",
      "Etobicoke",
      "East York",
    ],

    verified: true,

    verificationSource:
      "City of Toronto",

    lastVerified:
      "2026-10-04",
  }),

  createResource({
    id: "toronto-211-ontario",

    name:
      "211 Ontario",

    category:
      "Community Services",

    subcategory:
      "Information and Referral",

    city: "Toronto",
    district: "",
    region: "GTA",
    province: "Ontario",

    address:
      "Province-wide telephone and online service",

    description:
      "Free information and referral service connecting residents with community, government and social services including food, housing, employment, newcomer, health, legal, youth and senior supports.",

    services: [
      "Information and Referral",
      "Food Referrals",
      "Housing Referrals",
      "Employment Referrals",
      "Newcomer Services",
      "Health Referrals",
      "Legal Referrals",
      "Mental Health Referrals",
      "Youth Services",
      "Senior Services",
      "Financial Assistance Referrals",
    ],

    tags: [
      "211",
      "help",
      "resources",
      "community",
      "food",
      "housing",
      "employment",
      "newcomer",
      "health",
      "legal",
      "financial",
    ],

    languages: [
      "English",
      "French",
      "Multiple Languages",
    ],

    transportation: [
      "Phone",
      "Online",
      "Public Transit",
    ],

    eligibility:
      "Available to Ontario residents seeking community and government service information.",

    phone:
      "211",

    website:
      "https://211ontario.ca/",

    cost:
      "Free",

    serviceArea: [
      "Toronto",
      "Markham",
      "Vaughan",
      "Richmond Hill",
      "Newmarket",
      "Mississauga",
      "Brampton",
      "Pickering",
      "Ajax",
      "Whitby",
      "Oshawa",
      "Oakville",
      "Burlington",
      "Milton",
      "GTA",
      "Ontario",
    ],

    verified: true,

    verificationSource:
      "211 Ontario",

    lastVerified:
      "2026-10-04",
  }),
];

/* =========================================================
 * NORMALIZATION
 * ======================================================= */

function normalizeResource(
  resource: Resource
) {
  return {
    ...resource,

    name:
      resource.name.trim(),

    category:
      resource.category.trim(),

    subcategory:
      resource.subcategory?.trim() || "",

    city:
      resource.city.trim(),

    district:
      resource.district?.trim() || "",

    region:
      resource.region?.trim() || "",

    province:
      resource.province.trim(),

    address:
      resource.address.trim(),

    postalCode:
      resource.postalCode?.trim() || "",

    description:
      resource.description.trim(),

    services:
      resource.services.map(
        (item) => item.trim()
      ),

    tags:
      resource.tags.map(
        (item) => item.trim().toLowerCase()
      ),

    languages:
      resource.languages.map(
        (item) => item.trim()
      ),

    transportation:
      resource.transportation.map(
        (item) => item.trim()
      ),

    eligibility:
      resource.eligibility.trim(),

    phone:
      resource.phone?.trim() || "",

    website:
      resource.website?.trim() || "",

    email:
      resource.email?.trim() || "",

    hours:
      resource.hours?.trim() || "",

    cost:
      resource.cost?.trim() || "",

    accessibility:
      resource.accessibility || [],

    serviceArea:
      resource.serviceArea || [],

    verified:
      resource.verified,

    verificationSource:
      resource.verificationSource || "",

    lastVerified:
      resource.lastVerified || "",
  };
}

/* =========================================================
 * SEED FUNCTION
 * ======================================================= */

async function seedResources() {
  console.log(
    `Starting resource import: ${resources.length} resources`
  );

  console.log(
    "Using stable Firestore document IDs."
  );

  console.log(
    "Existing documents will be updated instead of duplicated."
  );

  const collectionRef =
    db.collection("resources");

  let processed = 0;

  for (const resource of resources) {
    const normalized =
      normalizeResource(resource);

    /*
     * CRITICAL:
     *
     * Use the stable resource.id as the
     * Firestore document ID.
     *
     * Never use collectionRef.add()
     * and never use collectionRef.doc()
     * without an ID.
     */

    const docRef =
      collectionRef.doc(resource.id);

    const existingDoc =
      await docRef.get();

    const data = {
      ...normalized,

      updatedAt:
        FieldValue.serverTimestamp(),

      ...(existingDoc.exists
        ? {}
        : {
            createdAt:
              FieldValue.serverTimestamp(),
          }),
    };

    await docRef.set(
      data,
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
    "Existing resources were updated using stable document IDs."
  );

  console.log(
    "No random Firestore document IDs were created."
  );

  console.log("");

  console.log(
    "Cities / areas represented:"
  );

  const locations =
    Array.from(
      new Set(
        resources.map(
          (resource) =>
            resource.district
              ? `${resource.city} - ${resource.district}`
              : resource.city
        )
      )
    ).sort();

  for (const location of locations) {
    console.log(
      `✓ ${location}`
    );
  }

  console.log("");

  console.log(
    `Total unique resource IDs: ${resources.length}`
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
      "Failed to seed resources:"
    );

    console.error(error);

    process.exit(1);
  });