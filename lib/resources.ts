import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";

import { db } from "./firebase";

export interface CommunityResource {
  id: string;
  name?: string;
  category?: string;
  city?: string;
  province?: string;
  district?: string;
  region?: string;
  address?: string;
  description?: string;
  eligibility?: string;
  languages?: string | string[];
  services?: string | string[];
  tags?: string | string[];
  transportation?: string | string[];
  coverageArea?: string | string[];
  phone?: string;
  website?: string;
  verified?: boolean | string;
}

export async function getResourcesByCategory(
  category: string
): Promise<CommunityResource[]> {
  const resourcesRef = collection(
    db,
    "resources"
  );

  const resourcesQuery = query(
    resourcesRef,
    where("category", "==", category),
    limit(10)
  );

  const snapshot =
    await getDocs(resourcesQuery);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<
      CommunityResource,
      "id"
    >),
  }));
}