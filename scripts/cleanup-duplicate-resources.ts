import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import serviceAccount from "../firebase-service-account.json";

const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert(serviceAccount as any),
      });

const db = getFirestore(app);

const resourcesRef = db.collection("resources");

/*
 * These are the official stable document IDs.
 *
 * We KEEP these documents.
 * Any older document with the same resource name
 * will be deleted.
 */
const stableIds = new Set([
  "welcome-centre-markham-north",
  "welcome-centre-markham-south",
  "markham-food-bank",
  "job-skills-markham",
  "jvs-employment-source-markham",
  "105-gibson-centre",
  "community-family-services-ontario-markham",
  "tccsa-york-centre",
  "markham-employment-resource-centre",
]);

function normalizeName(value: unknown): string {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

async function cleanupDuplicates() {
  console.log("Loading resources from Firestore...");

  const snapshot = await resourcesRef.get();

  console.log(
    `Found ${snapshot.size} documents in resources collection.`
  );

  const documents = snapshot.docs;

  const stableDocuments = documents.filter((doc) =>
    stableIds.has(doc.id)
  );

  console.log(
    `Found ${stableDocuments.length} official stable documents.`
  );

  const stableNames = new Set(
    stableDocuments.map((doc) =>
      normalizeName(doc.data().name)
    )
  );

  const duplicates = documents.filter((doc) => {
    if (stableIds.has(doc.id)) {
      return false;
    }

    const name = normalizeName(doc.data().name);

    return name && stableNames.has(name);
  });

  console.log(
    `Found ${duplicates.length} duplicate documents to delete.`
  );

  if (duplicates.length === 0) {
    console.log("No duplicates found.");
    return;
  }

  console.log("\nDuplicates that will be deleted:");

  for (const doc of duplicates) {
    console.log(
      `- ${doc.id}: ${doc.data().name}`
    );
  }

  console.log("\nDeleting duplicates...");

  const batch = db.batch();

  for (const doc of duplicates) {
    batch.delete(doc.ref);
  }

  await batch.commit();

  console.log(
    `\nSuccessfully deleted ${duplicates.length} duplicate documents.`
  );

  const remaining = await resourcesRef.get();

  console.log(
    `Resources remaining in Firestore: ${remaining.size}`
  );

  console.log("\nRemaining resources:");

  for (const doc of remaining.docs) {
    console.log(
      `✓ ${doc.id}: ${doc.data().name}`
    );
  }
}

cleanupDuplicates()
  .then(() => {
    console.log("\nCleanup complete.");
    process.exit(0);
  })
  .catch((error) => {
    console.error(
      "\nCleanup failed:",
      error
    );

    process.exit(1);
  });
