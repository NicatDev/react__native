import plugin from "tailwindcss/plugin";

export const scrollbarPlugin = plugin(function ({ addUtilities }) {
  addUtilities({
    ".scrollbar-width-auto": {
      "scrollbar-width": "auto"
    },

    ".scrollbar-none": {
      "scrollbar-width": "none",
      "&::-webkit-scrollbar": {
        display: "none"
      }
    },

    ".scrollbar-thin": {
      "scrollbar-width": "thin"
    }
  });
});
