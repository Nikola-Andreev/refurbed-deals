const FLAGS = {
  showDealsSpotlight: true,
};

export type FeatureFlagKey = keyof typeof FLAGS;

// Mock feature flag implementation – can be wired to a real remote config later.
function getFeatureFlag(flagName: FeatureFlagKey): boolean {
  return FLAGS[flagName];
}

export function isDealsSpotlightEnabled(): boolean {
  return getFeatureFlag('showDealsSpotlight');
}


