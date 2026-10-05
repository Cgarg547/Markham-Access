import { GoogleGenerativeAI } from "@google/generative-ai";

export interface AccessAIAnalysis {
  userType: string;
  location: string;
  locationType: string;
  searchArea: string;

  transportation: string;
  transportationNeeds: string[];

  urgency: string;

  needs: string[];

  detectedLanguage: string;
  languages: string[];
}

const apiKey =
  process.env.GEMINI_API_KEY ||
  process.env.GOOGLE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "Missing GEMINI_API_KEY environment variable."
  );
}

const genAI = new GoogleGenerativeAI(apiKey);

function cleanJsonText(text: string): string {
  return text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

function normalizeString(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .replace(/\s+/g, " ");
}

function normalizeArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => normalizeString(item))
    .filter(Boolean);
}

function uniqueStrings(values: string[]): string[] {
  const seen = new Set<string>();

  return values.filter((value) => {
    const key = value.toLowerCase();

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function normalizeAnalysis(raw: any): AccessAIAnalysis {
  const location =
    normalizeString(raw?.location) || "Unknown";

  const needs = normalizeArray(raw?.needs);

  const transportationNeeds =
    normalizeArray(raw?.transportationNeeds);

  const languages =
    normalizeArray(raw?.languages);

  const detectedLanguage =
    normalizeString(raw?.detectedLanguage) || "English";

  return {
    userType:
      normalizeString(raw?.userType) ||
      "Community Member",

    location,

    locationType:
      normalizeString(raw?.locationType) ||
      "city",

    searchArea:
      normalizeString(raw?.searchArea) ||
      location,

    transportation:
      normalizeString(raw?.transportation) ||
      "Unknown",

    transportationNeeds,

    urgency:
      normalizeString(raw?.urgency) ||
      "Low",

    needs,

    detectedLanguage,

    languages:
      languages.length > 0
        ? languages
        : [detectedLanguage],
  };
}

/**
 * Deterministic extraction for obvious terms.
 *
 * Gemini remains the primary analyzer, but these rules make
 * sure obvious user requests are never lost simply because
 * the model returned incomplete structured JSON.
 */
function applyDeterministicExtraction(
  userRequest: string,
  analysis: AccessAIAnalysis
): AccessAIAnalysis {
  const text = userRequest
    .toLowerCase()
    .replace(/[.,!?;:()[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  let location = analysis.location;
  let locationType = analysis.locationType;
  let searchArea = analysis.searchArea;

  const locationRules: Array<{
    phrases: string[];
    location: string;
    locationType: string;
    searchArea: string;
  }> = [
    {
      phrases: ["scarborough"],
      location: "Scarborough",
      locationType: "district",
      searchArea: "Toronto",
    },
    {
      phrases: ["north york"],
      location: "North York",
      locationType: "district",
      searchArea: "Toronto",
    },
    {
      phrases: ["etobicoke"],
      location: "Etobicoke",
      locationType: "district",
      searchArea: "Toronto",
    },
    {
      phrases: ["east york"],
      location: "East York",
      locationType: "district",
      searchArea: "Toronto",
    },
    {
      phrases: ["downtown toronto"],
      location: "Toronto",
      locationType: "city",
      searchArea: "Toronto",
    },
    {
      phrases: ["toronto"],
      location: "Toronto",
      locationType: "city",
      searchArea: "Toronto",
    },
    {
      phrases: ["markham"],
      location: "Markham",
      locationType: "city",
      searchArea: "Markham",
    },
    {
      phrases: ["vaughan"],
      location: "Vaughan",
      locationType: "city",
      searchArea: "Vaughan",
    },
    {
      phrases: ["richmond hill"],
      location: "Richmond Hill",
      locationType: "city",
      searchArea: "Richmond Hill",
    },
    {
      phrases: ["newmarket"],
      location: "Newmarket",
      locationType: "city",
      searchArea: "Newmarket",
    },
    {
      phrases: ["aurora"],
      location: "Aurora",
      locationType: "city",
      searchArea: "Aurora",
    },
    {
      phrases: ["mississauga"],
      location: "Mississauga",
      locationType: "city",
      searchArea: "Mississauga",
    },
    {
      phrases: ["brampton"],
      location: "Brampton",
      locationType: "city",
      searchArea: "Brampton",
    },
    {
      phrases: ["pickering"],
      location: "Pickering",
      locationType: "city",
      searchArea: "Pickering",
    },
    {
      phrases: ["ajax"],
      location: "Ajax",
      locationType: "city",
      searchArea: "Ajax",
    },
    {
      phrases: ["whitby"],
      location: "Whitby",
      locationType: "city",
      searchArea: "Whitby",
    },
    {
      phrases: ["oshawa"],
      location: "Oshawa",
      locationType: "city",
      searchArea: "Oshawa",
    },
    {
      phrases: ["oakville"],
      location: "Oakville",
      locationType: "city",
      searchArea: "Oakville",
    },
    {
      phrases: ["burlington"],
      location: "Burlington",
      locationType: "city",
      searchArea: "Burlington",
    },
    {
      phrases: ["milton"],
      location: "Milton",
      locationType: "city",
      searchArea: "Milton",
    },
  ];

  for (const rule of locationRules) {
    if (
      rule.phrases.some((phrase) =>
        text.includes(phrase)
      )
    ) {
      location = rule.location;
      locationType = rule.locationType;
      searchArea = rule.searchArea;
      break;
    }
  }

  let transportation =
    normalizeString(
      analysis.transportation
    );

  let transportationNeeds = [
    ...analysis.transportationNeeds,
  ];

  const hasNoCar =
    text.includes("no car") ||
    text.includes("don't have a car") ||
    text.includes("do not have a car") ||
    text.includes("dont have a car") ||
    text.includes("without a car") ||
    text.includes("don't own a car") ||
    text.includes("do not own a car") ||
    text.includes("cannot drive") ||
    text.includes("can't drive");

  const hasTTC =
    text.includes("ttc") ||
    text.includes("toronto transit");

  const hasPublicTransit =
    text.includes("public transit") ||
    text.includes("public transportation") ||
    text.includes("public transport");

  const hasTransit =
    text.includes("transit") ||
    text.includes("bus") ||
    text.includes("subway") ||
    text.includes("streetcar");

  const hasGO =
    text.includes("go transit") ||
    text.includes("go train") ||
    text.includes("go bus");

  const hasAccessibleTransportation =
    text.includes("wheel-trans") ||
    text.includes("wheel trans") ||
    text.includes("paratransit") ||
    text.includes("accessible transportation") ||
    text.includes("accessible transit");

  const transportationDetected =
    hasNoCar ||
    hasTTC ||
    hasPublicTransit ||
    hasTransit ||
    hasGO ||
    hasAccessibleTransportation;

  if (transportationDetected) {
    if (hasTTC && hasNoCar) {
      transportation = "No car / TTC";
    } else if (hasTTC) {
      transportation = "TTC";
    } else if (hasGO) {
      transportation = "GO Transit";
    } else if (
      hasAccessibleTransportation
    ) {
      transportation =
        "Accessible Transportation";
    } else if (hasNoCar) {
      transportation =
        "No car / Public Transit";
    } else {
      transportation = "Public Transit";
    }

    if (hasNoCar) {
      transportationNeeds.push("No Car");
    }

    if (hasTTC) {
      transportationNeeds.push("TTC");
    }

    if (hasPublicTransit || hasTransit) {
      transportationNeeds.push(
        "Public Transit"
      );
    }

    if (hasGO) {
      transportationNeeds.push(
        "GO Transit"
      );
    }

    if (hasAccessibleTransportation) {
      transportationNeeds.push(
        "Accessible Transportation"
      );
    }

    if (
      !analysis.needs.some(
        (need) =>
          normalizeString(need).toLowerCase() ===
          "transportation"
      )
    ) {
      analysis.needs.push(
        "Transportation"
      );
    }
  }

  /*
   * NEED DETECTION
   */

  const needs = [
    ...analysis.needs,
  ];

  const addNeed = (need: string) => {
    if (
      !needs.some(
        (existing) =>
          normalizeString(existing).toLowerCase() ===
          need.toLowerCase()
      )
    ) {
      needs.push(need);
    }
  };

  if (
    text.includes("food bank") ||
    text.includes("foodbank") ||
    text.includes("free groceries") ||
    text.includes("free food") ||
    text.includes("groceries") ||
    text.includes("food assistance") ||
    text.includes("food insecurity") ||
    text.includes("hungry") ||
    text.includes("need food")
  ) {
    addNeed("Food");
  }

  if (
    text.includes("rent") ||
    text.includes("housing") ||
    text.includes("shelter") ||
    text.includes("homeless") ||
    text.includes("eviction")
  ) {
    addNeed("Housing");
  }

  if (
    text.includes("can't afford") ||
    text.includes("cannot afford") ||
    text.includes("financial assistance") ||
    text.includes("financial help") ||
    text.includes("money help") ||
    text.includes("emergency assistance") ||
    text.includes("income assistance")
  ) {
    addNeed("Financial Assistance");
  }

  if (
    text.includes("job") ||
    text.includes("jobs") ||
    text.includes("employment") ||
    text.includes("work") ||
    text.includes("career") ||
    text.includes("resume") ||
    text.includes("interview")
  ) {
    addNeed("Employment");
  }

  if (
    text.includes("english class") ||
    text.includes("english classes") ||
    text.includes("esl") ||
    text.includes("language class") ||
    text.includes("language classes") ||
    text.includes("learn english") ||
    text.includes("language support")
  ) {
    addNeed("Language");
  }

  if (
    text.includes("newcomer") ||
    text.includes("new immigrant") ||
    text.includes("immigrant") ||
    text.includes("settlement")
  ) {
    addNeed("Newcomer Support");
  }

  if (
    text.includes("doctor") ||
    text.includes("clinic") ||
    text.includes("medical") ||
    text.includes("health care") ||
    text.includes("healthcare") ||
    text.includes("health support")
  ) {
    addNeed("Health");
  }

  if (
    text.includes("childcare") ||
    text.includes("child care") ||
    text.includes("daycare") ||
    text.includes("day care")
  ) {
    addNeed("Childcare");
  }

  if (
    text.includes("legal help") ||
    text.includes("lawyer") ||
    text.includes("legal assistance")
  ) {
    addNeed("Legal");
  }

  if (
    text.includes("mental health") ||
    text.includes("counselling") ||
    text.includes("counseling")
  ) {
    addNeed("Mental Health");
  }

  if (
    text.includes("disability") ||
    text.includes("disabled") ||
    text.includes("accessible support")
  ) {
    addNeed("Disability Support");
  }

  if (
    text.includes("senior") ||
    text.includes("elderly")
  ) {
    addNeed("Senior Support");
  }

  if (
    text.includes("youth") ||
    text.includes("young person")
  ) {
    addNeed("Youth Support");
  }

  if (
    text.includes("clothing") ||
    text.includes("clothes") ||
    text.includes("winter clothes")
  ) {
    addNeed("Clothing");
  }

  if (
    text.includes("hydro") ||
    text.includes("utility bill") ||
    text.includes("utilities") ||
    text.includes("electricity bill")
  ) {
    addNeed("Utilities");
  }

  if (
    text.includes("emergency") ||
    text.includes("urgent") ||
    text.includes("immediate danger")
  ) {
    addNeed("Emergency Assistance");
  }

  /*
   * If transportation is clearly requested, always
   * preserve Transportation as a canonical need.
   */
  if (transportationDetected) {
    addNeed("Transportation");
  }

  transportationNeeds =
    uniqueStrings(
      transportationNeeds
    );

  return {
    ...analysis,

    location,
    locationType,
    searchArea,

    transportation:
      transportationDetected
        ? transportation
        : transportation || "Unknown",

    transportationNeeds,

    needs: uniqueStrings(needs),
  };
}

export async function analyzeUserRequest(
  userRequest: string
): Promise<AccessAIAnalysis> {
  const model =
    genAI.getGenerativeModel({
      model:
        process.env.GEMINI_MODEL ||
        "gemini-3.8-flash",
    });

  const prompt = `
You are the structured analysis engine for AccessAI,
a community-resource finder in Ontario, Canada.

Analyze the user's request and return ONLY valid JSON.
Do not use Markdown.
Do not wrap the JSON in code fences.

The JSON must have exactly these fields:

{
  "userType": "string",
  "location": "string",
  "locationType": "city | district | region | unknown",
  "searchArea": "string",
  "transportation": "string",
  "transportationNeeds": ["string"],
  "urgency": "Low | Medium | High",
  "needs": ["string"],
  "detectedLanguage": "string",
  "languages": ["string"]
}

CANONICAL NEEDS:

Use only these names when applicable:

- Employment
- Food
- Financial Assistance
- Housing
- Health
- Childcare
- Language
- Newcomer Support
- Transportation
- Education
- Legal
- Mental Health
- Disability Support
- Senior Support
- Youth Support
- Clothing
- Utilities
- Emergency Assistance

A request may contain multiple needs.

Examples:

"I cannot afford my rent"
=> ["Housing", "Financial Assistance"]

"I need a food bank"
=> ["Food"]

"I am hungry and need free groceries"
=> ["Food"]

"I am a newcomer and need a job and English classes"
=> ["Employment", "Language", "Newcomer Support"]

"I do not have a car and need TTC"
=> ["Transportation"]

TRANSPORTATION RULES:

If the request mentions any of:

- no car
- do not have a car
- don't have a car
- without a car
- TTC
- Toronto Transit
- public transit
- public transportation
- transit
- bus
- subway
- streetcar
- GO Transit
- GO Train
- GO Bus
- Wheel-Trans
- paratransit
- accessible transportation

then transportation MUST NOT be "Unknown".

Examples:

"I do not have a car and need TTC"
transportation = "No car / TTC"
transportationNeeds = ["No Car", "TTC"]

"I need public transit"
transportation = "Public Transit"
transportationNeeds = ["Public Transit"]

"I need GO Transit"
transportation = "GO Transit"
transportationNeeds = ["GO Transit"]

"I need accessible transportation"
transportation = "Accessible Transportation"
transportationNeeds = ["Accessible Transportation"]

LOCATION RULES:

Toronto districts must use Toronto as the search area.

Scarborough:
location = "Scarborough"
locationType = "district"
searchArea = "Toronto"

North York:
location = "North York"
locationType = "district"
searchArea = "Toronto"

Etobicoke:
location = "Etobicoke"
locationType = "district"
searchArea = "Toronto"

East York:
location = "East York"
locationType = "district"
searchArea = "Toronto"

Downtown Toronto:
location = "Toronto"
locationType = "city"
searchArea = "Toronto"

Toronto:
location = "Toronto"
locationType = "city"
searchArea = "Toronto"

Other GTA cities should be identified directly.

Examples:

Markham -> Markham
Vaughan -> Vaughan
Richmond Hill -> Richmond Hill
Mississauga -> Mississauga
Brampton -> Brampton
Pickering -> Pickering
Ajax -> Ajax
Whitby -> Whitby
Oshawa -> Oshawa
Oakville -> Oakville
Burlington -> Burlington
Milton -> Milton

IMPORTANT:

If the user's request explicitly contains a location,
never return location = "Unknown".

If the request clearly contains transportation terms,
never return transportation = "Unknown".

URGENCY:

Use:
- High for emergency, immediate danger, crisis, urgent shelter/food/medical situations
- Medium for significant financial, housing, employment or health difficulty
- Low for ordinary information/resource requests

LANGUAGE:

Return the detected language.
For ordinary English requests use:
detectedLanguage = "English"
languages = ["English"]

USER TYPE:

Examples:
- newcomer/immigrant -> "Newcomer"
- senior/elderly -> "Senior"
- youth/student -> "Youth" when clearly applicable
- otherwise -> "Community Member"

Return ONLY JSON.

USER REQUEST:
${userRequest}
`;

  try {
    const result =
      await model.generateContent(prompt);

    const response =
      result.response;

    const text =
      response.text();

    const cleaned =
      cleanJsonText(text);

    let raw: any;

    try {
      raw = JSON.parse(cleaned);
    } catch {
      /*
       * Attempt to recover the first JSON object if
       * Gemini included surrounding text.
       */
      const firstBrace =
        cleaned.indexOf("{");

      const lastBrace =
        cleaned.lastIndexOf("}");

      if (
        firstBrace >= 0 &&
        lastBrace > firstBrace
      ) {
        raw = JSON.parse(
          cleaned.slice(
            firstBrace,
            lastBrace + 1
          )
        );
      } else {
        throw new Error(
          "Gemini returned invalid JSON."
        );
      }
    }

    const analysis =
      normalizeAnalysis(raw);

    return applyDeterministicExtraction(
      userRequest,
      analysis
    );
  } catch (error) {
    console.error(
      "Gemini analysis error:",
      error
    );

    /*
     * Do not allow Gemini failure to destroy
     * obvious resource matching.
     */
    return applyDeterministicExtraction(
      userRequest,
      normalizeAnalysis({})
    );
  }
}