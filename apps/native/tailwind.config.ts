import sharedLibConfig from "../../libs/shared-lib/tailwind.config";

export default sharedLibConfig.extend({
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"]
});
