import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId, useCdn } from "../env"

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token: "skKxsipQ22daGJnGBPh0pANPKJeyixhhXlkJxIK4UiXarEVwr8v16nvbYGvXRU3HLGsNCnTda2SScZi4IEiptm0jY46afhkqJKHPugQMlMOVHAa35i3vUHM8PmH4kjGDGNBMHpIEAcOUpFDPsPjQz12pRvDTvQjH8ZlL0vvVlu5dAe9EZKF1"
})
