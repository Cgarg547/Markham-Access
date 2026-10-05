import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import {
  AccessAIAnalysis,
  analyzeUserRequest,
} from "@/lib/gemini";

/* =========================================================
 * RESOURCE TYPE
 * ======================================================= */

interface Resource {
  id: string;

  name?: string;
  category?: string;

  description?: string;
  eligibility?: string;

  province?: string;
  city?: string;
  district?: string;
  address?: string;

  services?: unknown;
  tags?: unknown;
  languages?: unknown;
  transportation?: unknown;

  website?: string;
  phone?: string;

  verified?: boolean | string;

  region?: string;
  coverageArea?: unknown;

  matchScore?: number;
  matchReasons?: string[];

  [key: string]: any;
}

/* =========================================================
 * NORMALIZATION
 * ======================================================= */

function normalizeText(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

function normalizeArray(value: unknown): string[] {
  if (value === null || value === undefined) {
    return [];
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => normalizeText(item))
      .filter(Boolean);
  }

  if (typeof value === "string") {
    const text = value.trim();

    if (text.startsWith("[") && text.endsWith("]")) {
      try {
        const parsed = JSON.parse(text);

        if (Array.isArray(parsed)) {
          return parsed
            .map((item) => normalizeText(item))
            .filter(Boolean);
        }
      } catch {
        // Continue below.
      }
    }

    return text
      .split(",")
      .map((item) => normalizeText(item))
      .filter(Boolean);
  }

  return [];
}

function uniqueStrings(values: string[]): string[] {
  const seen = new Set<string>();

  return values.filter((value) => {
    const key = normalizeText(value);

    if (!key) {
      return false;
    }

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);

    return true;
  });
}

/* =========================================================
 * RESOURCE DEDUPLICATION
 * ======================================================= */

function dedupeResources(
  resources: Resource[]
): Resource[] {
  const seen = new Set<string>();
  const result: Resource[] = [];

  for (const resource of resources) {
    /*
     * We intentionally use several fields to identify
     * the same organization.
     *
     * This handles cases where the same organization was
     * imported more than once with different Firestore IDs.
     */

    const typedResource =
      resource as Resource & {
        name?: string;
        address?: string;
        phone?: string;
      };

    const nameKey =
      normalizeText(
        typedResource.name ||
          resource.id ||
          ""
      )
        .replace(
          /[^a-z0-9]+/g,
          " "
        )
        .trim();

    const addressKey =
      normalizeText(
        typedResource.address ||
          ""
      )
        .replace(
          /[^a-z0-9]+/g,
          " "
        )
        .trim();

    const phoneKey =
      normalizeText(
        typedResource.phone ||
          ""
      )
        .replace(
          /[^0-9]+/g,
          ""
        );

    /*
     * Primary identity:
     *
     * Organization name is normally the strongest
     * indicator that two records represent the same
     * organization.
     */
    let identityKey = nameKey;

    /*
     * If the resource does not have a useful name,
     * fall back to address or phone.
     */
    if (!identityKey) {
      identityKey =
        addressKey ||
        phoneKey ||
        resource.id;
    }

    /*
     * Some records may have a generic/empty name.
     * In that case, combining address + phone gives
     * us a safer identity.
     */
    if (
      identityKey === "community services" ||
      identityKey === "community centre" ||
      identityKey === "community center" ||
      identityKey.length < 3
    ) {
      identityKey = [
        identityKey,
        addressKey,
        phoneKey,
      ]
        .filter(Boolean)
        .join("|");
    }

    if (seen.has(identityKey)) {
      continue;
    }

    seen.add(identityKey);
    result.push(resource);
  }

  return result;
}

/* =========================================================
 * LOCATION GROUPS
 * ======================================================= */

const TORONTO_DISTRICTS = [
  "scarborough",
  "north york",
  "northyork",
  "etobicoke",
  "east york",
  "york",
  "downtown toronto",
];

const YORK_REGION_CITIES = [
  "markham",
  "vaughan",
  "richmond hill",
  "newmarket",
  "aurora",
  "king",
  "whitchurch-stouffville",
  "stouffville",
];

const PEEL_REGION_CITIES = [
  "mississauga",
  "brampton",
  "caledon",
];

const DURHAM_REGION_CITIES = [
  "pickering",
  "ajax",
  "whitby",
  "oshawa",
  "clarington",
  "bowmanville",
  "uxbridge",
  "scugog",
];

const HALTON_REGION_CITIES = [
  "oakville",
  "burlington",
  "milton",
  "halton hills",
];

/* =========================================================
 * LOCATION NORMALIZATION
 * ======================================================= */

function normalizeLocationName(location: string): string {
  const normalized = normalizeText(location);

  if (normalized === "northyork") {
    return "north york";
  }

  if (normalized === "downtown") {
    return "toronto";
  }

  return normalized;
}

/* =========================================================
 * REGION DETECTION
 * ======================================================= */

function getRegion(location: string): string {
  const normalized = normalizeLocationName(location);

  if (
    normalized === "toronto" ||
    TORONTO_DISTRICTS.includes(normalized)
  ) {
    return "Toronto";
  }

  if (YORK_REGION_CITIES.includes(normalized)) {
    return "York Region";
  }

  if (PEEL_REGION_CITIES.includes(normalized)) {
    return "Peel Region";
  }

  if (DURHAM_REGION_CITIES.includes(normalized)) {
    return "Durham Region";
  }

  if (HALTON_REGION_CITIES.includes(normalized)) {
    return "Halton Region";
  }

  return "";
}

/* =========================================================
 * LOCATION SCORE
 * ======================================================= */

function getLocationScore(
  resource: Resource,
  analysis: AccessAIAnalysis
): {
  score: number;
  reasons: string[];
} {
  const requestedLocation = normalizeLocationName(
    analysis.location
  );

  const requestedSearchArea = normalizeLocationName(
    analysis.searchArea
  );

  const resourceCity = normalizeLocationName(
    resource.city || ""
  );

  const resourceDistrict = normalizeLocationName(
    resource.district || ""
  );

  const resourceRegion = normalizeText(
    resource.region || getRegion(resourceCity)
  );

  const requestedRegion = normalizeText(
    getRegion(requestedLocation)
  );

  const reasons: string[] = [];

  /*
   * Exact district match.
   */

  if (
    requestedLocation &&
    resourceDistrict &&
    resourceDistrict === requestedLocation
  ) {
    reasons.push("Located in requested area");

    return {
      score: 45,
      reasons,
    };
  }

  /*
   * Exact city match.
   */

  if (
    requestedLocation &&
    resourceCity === requestedLocation
  ) {
    reasons.push("Located in requested city");

    return {
      score: 45,
      reasons,
    };
  }

  /*
   * Resource city matches search area.
   */

  if (
    requestedSearchArea &&
    resourceCity === requestedSearchArea
  ) {
    reasons.push(
      "Located in requested search area"
    );

    return {
      score: 38,
      reasons,
    };
  }

  /*
   * Same region.
   */

  if (
    requestedRegion &&
    resourceRegion &&
    requestedRegion === resourceRegion
  ) {
    reasons.push("Serves the same GTA region");

    return {
      score: 28,
      reasons,
    };
  }

  /*
   * Toronto district fallback.
   */

  if (
    requestedRegion.toLowerCase() === "toronto" &&
    resourceCity === "toronto"
  ) {
    reasons.push("Toronto-wide service");

    return {
      score: 25,
      reasons,
    };
  }

  /*
   * GTA-wide resource.
   */

  const coverage = normalizeArray(
    resource.coverageArea
  );

  if (
    coverage.some(
      (area) =>
        normalizeText(area).includes("gta") ||
        normalizeText(area).includes(
          "greater toronto"
        )
    )
  ) {
    reasons.push("Serves the GTA");

    return {
      score: 18,
      reasons,
    };
  }

  /*
   * Province-wide / Ontario-wide.
   */

  const resourceDescription = normalizeText(
    resource.description
  );

  const resourceTags = normalizeArray(
    resource.tags
  );

  if (
    resourceDescription.includes("ontario") ||
    resourceTags.some(
      (tag) =>
        tag.includes("ontario-wide") ||
        tag.includes("provincial")
    )
  ) {
    reasons.push("Ontario-wide resource");

    return {
      score: 10,
      reasons,
    };
  }

  return {
    score: 0,
    reasons,
  };
}

/* =========================================================
 * NEED SCORE
 * ======================================================= */

function getNeedScore(
  resource: Resource,
  analysis: AccessAIAnalysis
): {
  score: number;
  reasons: string[];
} {
  const reasons: string[] = [];

  const resourceCategory = normalizeText(
    resource.category
  );

  const resourceDescription = normalizeText(
    resource.description
  );

  const resourceServices = normalizeArray(
    resource.services
  );

  const resourceTags = normalizeArray(
    resource.tags
  );

  const resourceText = [
    resourceCategory,
    resourceDescription,
    ...resourceServices,
    ...resourceTags,
  ]
    .join(" ")
    .toLowerCase();

  let score = 0;

  const needAliases: Record<string, string[]> = {
    employment: [
      "employment",
      "job",
      "jobs",
      "career",
      "work",
      "resume",
      "interview",
      "employment services",
    ],

    food: [
      "food",
      "food bank",
      "food pantry",
      "groceries",
      "meal",
      "food assistance",
    ],

    "financial assistance": [
      "financial",
      "financial assistance",
      "money",
      "income",
      "benefits",
      "social assistance",
    ],

    housing: [
      "housing",
      "shelter",
      "homeless",
      "rent",
      "eviction",
      "housing support",
    ],

    health: [
      "health",
      "healthcare",
      "medical",
      "clinic",
      "doctor",
      "health services",
    ],

    childcare: [
      "childcare",
      "child care",
      "daycare",
      "children",
      "child",
    ],

    language: [
      "language",
      "english",
      "esl",
      "language class",
      "language classes",
      "english classes",
    ],

    "newcomer support": [
      "newcomer",
      "immigrant",
      "settlement",
      "newcomer services",
    ],

    transportation: [
      "transportation",
      "transit",
      "bus",
      "subway",
      "streetcar",
      "ttc",
      "go transit",
      "transport",
    ],

    education: [
      "education",
      "school",
      "college",
      "university",
      "training",
      "education support",
    ],

    legal: [
      "legal",
      "lawyer",
      "legal aid",
      "tenant rights",
      "legal assistance",
    ],

    "mental health": [
      "mental health",
      "counselling",
      "counseling",
      "mental wellness",
      "addiction",
    ],

    "disability support": [
      "disability",
      "disabled",
      "accessible",
      "accessibility",
      "wheelchair",
      "paratransit",
    ],

    "senior support": [
      "senior",
      "seniors",
      "elderly",
      "older adult",
      "older adults",
    ],

    "youth support": [
      "youth",
      "young person",
      "young people",
      "teen",
      "teenager",
    ],

    clothing: [
      "clothing",
      "clothes",
      "winter clothing",
      "coat",
      "shoes",
    ],

    utilities: [
      "utilities",
      "utility",
      "hydro",
      "electricity",
      "utility bill",
    ],

    "emergency assistance": [
      "emergency",
      "urgent",
      "crisis",
      "immediate assistance",
    ],
  };

  for (const need of analysis.needs) {
    const normalizedNeed = normalizeText(need);

    const aliases =
      needAliases[normalizedNeed] || [
        normalizedNeed,
      ];

    const matches = aliases.filter((alias) =>
      resourceText.includes(
        normalizeText(alias)
      )
    );

    if (matches.length > 0) {
      score += 25;

      reasons.push(
        `Supports ${need}`
      );
    }
  }

  /*
   * Strong category-specific boost.
   */

  if (
    analysis.needs.some(
      (need) =>
        normalizeText(need) ===
        normalizeText(resourceCategory)
    )
  ) {
    score += 10;
  }

  return {
    score,
    reasons: uniqueStrings(reasons),
  };
}

/* =========================================================
 * TRANSPORTATION SCORE
 * ======================================================= */

function getTransportationScore(
  resource: Resource,
  analysis: AccessAIAnalysis
): {
  score: number;
  reasons: string[];
} {
  const reasons: string[] = [];

  const requestedTransportation =
    normalizeText(
      analysis.transportation
    );

  const requestedNeeds =
    analysis.transportationNeeds.map(
      normalizeText
    );

  const resourceTransportation =
    normalizeArray(
      resource.transportation
    );

  const resourceText = [
    ...resourceTransportation,
    ...normalizeArray(
      resource.services
    ),
    ...normalizeArray(
      resource.tags
    ),
    normalizeText(
      resource.description
    ),
  ].join(" ");

  let score = 0;

  if (
    requestedTransportation &&
    requestedTransportation !== "unknown"
  ) {
    if (
      resourceTransportation.some(
        (item) =>
          resourceText.includes(
            normalizeText(item)
          )
      )
    ) {
      score += 10;
      reasons.push(
        "Transportation needs supported"
      );
    }
  }

  if (
    requestedNeeds.some(
      (need) =>
        need.includes("no car") ||
        need.includes("public transit") ||
        need.includes("ttc") ||
        need.includes("go transit")
    )
  ) {
    if (
      resourceText.includes("transit") ||
      resourceText.includes("bus") ||
      resourceText.includes("ttc") ||
      resourceText.includes("public transportation") ||
      resourceText.includes("public transit")
    ) {
      score += 15;

      reasons.push(
        "Accessible by public transportation"
      );
    }
  }

  if (
    requestedNeeds.some(
      (need) =>
        need.includes("accessible transportation")
    )
  ) {
    if (
      resourceText.includes("accessible") ||
      resourceText.includes("paratransit") ||
      resourceText.includes("wheel-trans")
    ) {
      score += 15;

      reasons.push(
        "Accessible transportation support"
      );
    }
  }

  return {
    score,
    reasons: uniqueStrings(reasons),
  };
}

/* =========================================================
 * LANGUAGE SCORE
 * ======================================================= */

function getLanguageScore(
  resource: Resource,
  analysis: AccessAIAnalysis
): {
  score: number;
  reasons: string[];
} {
  const reasons: string[] = [];

  const requestedLanguages =
    uniqueStrings(
      analysis.languages
    ).map(normalizeText);

  const resourceLanguages =
    normalizeArray(
      resource.languages
    );

  if (
    requestedLanguages.length === 0 ||
    resourceLanguages.length === 0
  ) {
    return {
      score: 0,
      reasons,
    };
  }

  const matches =
    requestedLanguages.filter(
      (language) =>
        resourceLanguages.some(
          (resourceLanguage) =>
            normalizeText(
              resourceLanguage
            ) === language
        )
    );

  if (matches.length > 0) {
    reasons.push(
      "Language support available"
    );

    return {
      score: 8,
      reasons,
    };
  }

  return {
    score: 0,
    reasons,
  };
}

/* =========================================================
 * USER TYPE SCORE
 * ======================================================= */

function getUserTypeScore(
  resource: Resource,
  analysis: AccessAIAnalysis
): {
  score: number;
  reasons: string[];
} {
  const userType =
    normalizeText(
      analysis.userType
    );

  if (!userType) {
    return {
      score: 0,
      reasons: [],
    };
  }

  const resourceText = [
    normalizeText(
      resource.category
    ),
    normalizeText(
      resource.description
    ),
    ...normalizeArray(
      resource.services
    ),
    ...normalizeArray(
      resource.tags
    ),
  ].join(" ");

  const rules: Record<
    string,
    string[]
  > = {
    newcomer: [
      "newcomer",
      "immigrant",
      "settlement",
    ],

    senior: [
      "senior",
      "seniors",
      "elderly",
      "older adult",
    ],

    youth: [
      "youth",
      "young",
      "teen",
    ],

    student: [
      "student",
      "education",
      "school",
    ],
  };

  const aliases =
    rules[userType];

  if (
    aliases &&
    aliases.some(
      (alias) =>
        resourceText.includes(alias)
    )
  ) {
    return {
      score: 8,
      reasons: [
        `Relevant for ${analysis.userType}`,
      ],
    };
  }

  return {
    score: 0,
    reasons: [],
  };
}

/* =========================================================
 * URGENCY SCORE
 * ======================================================= */

function getUrgencyScore(
  resource: Resource,
  analysis: AccessAIAnalysis
): {
  score: number;
  reasons: string[];
} {
  const urgency =
    normalizeText(
      analysis.urgency
    );

  if (
    urgency !== "high" &&
    urgency !== "medium"
  ) {
    return {
      score: 0,
      reasons: [],
    };
  }

  const resourceText = [
    normalizeText(
      resource.category
    ),
    normalizeText(
      resource.description
    ),
    ...normalizeArray(
      resource.services
    ),
    ...normalizeArray(
      resource.tags
    ),
  ].join(" ");

  const emergencyTerms = [
    "emergency",
    "crisis",
    "shelter",
    "food bank",
    "emergency food",
    "homeless",
    "urgent",
    "immediate",
  ];

  if (
    emergencyTerms.some(
      (term) =>
        resourceText.includes(term)
    )
  ) {
    return {
      score:
        urgency === "high"
          ? 12
          : 6,

      reasons: [
        "Suitable for urgent needs",
      ],
    };
  }

  return {
    score: 0,
    reasons: [],
  };
}

/* =========================================================
 * VERIFICATION SCORE
 * ======================================================= */

function getVerificationScore(
  resource: Resource
): {
  score: number;
  reasons: string[];
} {
  const verified =
    resource.verified === true ||
    normalizeText(
      resource.verified
    ) === "true";

  if (verified) {
    return {
      score: 5,
      reasons: [
        "Verified resource",
      ],
    };
  }

  return {
    score: 0,
    reasons: [],
  };
}

/* =========================================================
 * MAIN RESOURCE SCORER
 * ======================================================= */

function scoreResource(
  resource: Resource,
  analysis: AccessAIAnalysis
): {
  score: number;
  reasons: string[];
} {
  const location =
    getLocationScore(
      resource,
      analysis
    );

  const need =
    getNeedScore(
      resource,
      analysis
    );

  const transportation =
    getTransportationScore(
      resource,
      analysis
    );

  const language =
    getLanguageScore(
      resource,
      analysis
    );

  const userType =
    getUserTypeScore(
      resource,
      analysis
    );

  const urgency =
    getUrgencyScore(
      resource,
      analysis
    );

  const verification =
    getVerificationScore(
      resource
    );

  const score =
    location.score +
    need.score +
    transportation.score +
    language.score +
    userType.score +
    urgency.score +
    verification.score;

  const reasons =
    uniqueStrings([
      ...location.reasons,
      ...need.reasons,
      ...transportation.reasons,
      ...language.reasons,
      ...userType.reasons,
      ...urgency.reasons,
      ...verification.reasons,
    ]);

  return {
    score,
    reasons,
  };
}

/* =========================================================
 * LOCATION FALLBACK
 * ======================================================= */

function getFallbackLevel(
  resource: Resource,
  analysis: AccessAIAnalysis
): number {
  const requestedLocation =
    normalizeLocationName(
      analysis.location
    );

  const requestedRegion =
    getRegion(
      requestedLocation
    );

  const resourceCity =
    normalizeLocationName(
      resource.city || ""
    );

  const resourceRegion =
    getRegion(
      resourceCity
    );

  /*
   * 4 = exact city/district
   */

  if (
    resourceCity ===
    requestedLocation
  ) {
    return 4;
  }

  if (
    normalizeLocationName(
      resource.district || ""
    ) === requestedLocation
  ) {
    return 4;
  }

  /*
   * 3 = same region
   */

  if (
    requestedRegion &&
    resourceRegion ===
      requestedRegion
  ) {
    return 3;
  }

  /*
   * 2 = GTA-wide resource
   */

  const coverage =
    normalizeArray(
      resource.coverageArea
    );

  if (
    coverage.some(
      (area) =>
        normalizeText(
          area
        ).includes("gta") ||
        normalizeText(
          area
        ).includes(
          "greater toronto"
        )
    )
  ) {
    return 2;
  }

  /*
   * 1 = Ontario-wide
   */

  if (
    normalizeText(
      resource.description
    ).includes(
      "ontario"
    )
  ) {
    return 1;
  }

  return 0;
}

/* =========================================================
 * SORTING
 * ======================================================= */

function sortResources(
  resources: Resource[],
  analysis: AccessAIAnalysis
): Resource[] {
  return resources.sort(
    (a, b) => {
      const fallbackA =
        getFallbackLevel(
          a,
          analysis
        );

      const fallbackB =
        getFallbackLevel(
          b,
          analysis
        );

      /*
       * Score remains primary.
       */

      if (
        (b.matchScore || 0) !==
        (a.matchScore || 0)
      ) {
        return (
          (b.matchScore || 0) -
          (a.matchScore || 0)
        );
      }

      /*
       * When scores are close,
       * prefer closest location.
       */

      if (
        fallbackB !==
        fallbackA
      ) {
        return (
          fallbackB -
          fallbackA
        );
      }

      /*
       * Verified resources first.
       */

      const verifiedA =
        a.verified === true ||
        normalizeText(
          a.verified
        ) === "true"
          ? 1
          : 0;

      const verifiedB =
        b.verified === true ||
        normalizeText(
          b.verified
        ) === "true"
          ? 1
          : 0;

      if (
        verifiedB !==
        verifiedA
      ) {
        return (
          verifiedB -
          verifiedA
        );
      }

      return (
        a.name || ""
      ).localeCompare(
        b.name || ""
      );
    }
  );
}

/* =========================================================
 * ROUTE
 * ======================================================= */

export async function POST(
  request: NextRequest
) {
  try {
    /*
     * -------------------------------------------------------
     * 1. REQUEST
     * -------------------------------------------------------
     */

    const body =
      await request.json();

    const userRequest =
      typeof body?.message ===
      "string"
        ? body.message.trim()
        : "";

    if (!userRequest) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please provide a request.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * -------------------------------------------------------
     * 2. GEMINI ANALYSIS
     * -------------------------------------------------------
     */

    const analysis =
      await analyzeUserRequest(
        userRequest
      );

    console.log(
      "========== ACCESSAI ANALYSIS =========="
    );

    console.log(
      JSON.stringify(
        analysis,
        null,
        2
      )
    );

    console.log(
      "========================================"
    );

    /*
     * -------------------------------------------------------
     * 3. LOAD FIRESTORE RESOURCES
     * -------------------------------------------------------
     */

    const resourcesSnapshot =
      await getDocs(
        collection(
          db,
          "resources"
        )
      );

    const resources: Resource[] =
      resourcesSnapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<
            Resource,
            "id"
          >),
        })
      );

    console.log(
      `Loaded ${resources.length} resources from Firestore`
    );

    /*
     * -------------------------------------------------------
     * 4. DEBUG RESOURCE DATA
     * -------------------------------------------------------
     */

    console.log(
      "========== RESOURCE DEBUG =========="
    );

    for (
      const resource of resources
    ) {
      console.log({
        name:
          resource.name,

        city:
          resource.city,

        district:
          resource.district,

        category:
          resource.category,

        transportation:
          resource.transportation,

        services:
          resource.services,

        tags:
          resource.tags,
      });
    }

    console.log(
      "===================================="
    );

    /*
     * -------------------------------------------------------
     * 5. SCORE ALL RESOURCES
     * -------------------------------------------------------
     */

    const rankedResources =
      resources.map(
        (resource) => {
          const result =
            scoreResource(
              resource,
              analysis
            );

          return {
            ...resource,

            matchScore:
              result.score,

            matchReasons:
              result.reasons,
          };
        }
      );

    /*
     * -------------------------------------------------------
     * 6. SORT
     * -------------------------------------------------------
     */

    const sortedResources =
      sortResources(
        rankedResources,
        analysis
      );

    /*
     * -------------------------------------------------------
     * 7. LOCATION-AWARE GROUPS
     * -------------------------------------------------------
     */

    const exactLocationResources =
      sortedResources.filter(
        (resource) =>
          getFallbackLevel(
            resource,
            analysis
          ) === 4
      );

    const sameRegionResources =
      sortedResources.filter(
        (resource) =>
          getFallbackLevel(
            resource,
            analysis
          ) === 3
      );

    const gtaResources =
      sortedResources.filter(
        (resource) =>
          getFallbackLevel(
            resource,
            analysis
          ) === 2
      );

    const ontarioResources =
      sortedResources.filter(
        (resource) =>
          getFallbackLevel(
            resource,
            analysis
          ) === 1
      );

    /*
     * -------------------------------------------------------
     * 8. PRIMARY MATCHES
     * -------------------------------------------------------
     */

    let matchedResources =
      sortedResources.filter(
        (resource) =>
          (resource.matchScore || 0) >=
          45
      );

    /*
     * -------------------------------------------------------
     * 9. SMART FALLBACK
     * -------------------------------------------------------
     *
     * If there are not enough strong matches,
     * progressively expand from:
     *
     * exact location
     * -> same region
     * -> GTA
     * -> Ontario
     */

    if (
      matchedResources.length <
      3
    ) {
      const fallbackPool = [
        ...exactLocationResources,
        ...sameRegionResources,
        ...gtaResources,
        ...ontarioResources,
      ];

      const fallbackIds =
        new Set<string>();

      matchedResources =
        [
          ...matchedResources,
          ...fallbackPool,
        ].filter(
          (resource) => {
            if (
              fallbackIds.has(
                resource.id
              )
            ) {
              return false;
            }

            fallbackIds.add(
              resource.id
            );

            return true;
          }
        );
    }

    /*
     * -------------------------------------------------------
     * 10. REMOVE VERY WEAK RESULTS
     * -------------------------------------------------------
     */

    matchedResources =
      matchedResources.filter(
        (resource) =>
          (resource.matchScore || 0) >=
            20 ||
          getFallbackLevel(
            resource,
            analysis
          ) >= 3
      );

    /*
     * -------------------------------------------------------
     * 11. FINAL SORT + LIMIT
     * -------------------------------------------------------
     */

    /*
 * -------------------------------------------------------
 * 11. DEDUPLICATE RESOURCES
 * -------------------------------------------------------
 *
 * Multiple Firestore records can represent the same
 * organization. Sort first so the strongest version
 * of a duplicate is kept.
 */

matchedResources =
  sortResources(
    matchedResources,
    analysis
  );

matchedResources =
  dedupeResources(
    matchedResources
  );

/*
 * -------------------------------------------------------
 * 12. FINAL SORT + LIMIT
 * -------------------------------------------------------
 */

matchedResources =
  sortResources(
    matchedResources,
    analysis
  ).slice(
    0,
    8
  );
    /*
     * -------------------------------------------------------
     * 12. FINAL DEBUG
     * -------------------------------------------------------
     */

    console.log(
      "========== RESOURCE MATCHING =========="
    );

    console.log(
      "Requested location:",
      analysis.location
    );

    console.log(
      "Search area:",
      analysis.searchArea
    );

    console.log(
      "Location type:",
      analysis.locationType
    );

    console.log(
      "Needs:",
      analysis.needs
    );

    console.log(
      "Transportation:",
      analysis.transportation
    );

    console.log(
      "Transportation needs:",
      analysis.transportationNeeds
    );

    console.log(
      "Urgency:",
      analysis.urgency
    );

    console.log(
      "Exact location resources:",
      exactLocationResources.length
    );

    console.log(
      "Same region resources:",
      sameRegionResources.length
    );

    console.log(
      "GTA resources:",
      gtaResources.length
    );

    console.log(
      "Ontario resources:",
      ontarioResources.length
    );

    console.log(
      "Final matches:",
      matchedResources.map(
        (resource) => ({
          name:
            resource.name,

          score:
            resource.matchScore,

          city:
            resource.city,

          district:
            resource.district,

          category:
            resource.category,

          reasons:
            resource.matchReasons,
        })
      )
    );

    console.log(
      "========================================"
    );

    /*
     * -------------------------------------------------------
     * 13. RESPONSE
     * -------------------------------------------------------
     */

    return NextResponse.json({
      success: true,

      request:
        userRequest,

      analysis,

      resources:
        matchedResources,

      totalResources:
        resources.length,

      matchedResources:
        matchedResources.length,

      matchingStrategy: {
        exactLocation:
          exactLocationResources.length,

        sameRegion:
          sameRegionResources.length,

        gta:
          gtaResources.length,

        ontario:
          ontarioResources.length,
      },
    });
  } catch (
    error: any
  ) {
    console.error(
      "Analysis error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error?.message ||
          "Something went wrong while analyzing your request.",
      },
      {
        status: 500,
      }
    );
  }
}