import { createMeshConfig } from "@baditaflorin/mesh-common";

export const config = createMeshConfig({
  appName: "mesh-bingo-blitz",
  description: "A browser-local social bingo board with individual claims.",
  accentHex: "#16a34a",
  version: __APP_VERSION__,
  commit: __GIT_COMMIT__,
});
