import localFont from "next/font/local";

const generalSans = localFont({
  src: [
    { path: "../../../public/fonts/GeneralSans-Regular.otf", weight: "400", style: "normal" },
    {
      path: "../../../public/fonts/GeneralSans-Medium.otf",
      weight: "500",
      style: "medium",
    },
    {
      path: "../../../public/fonts/GeneralSans-Semibold.otf",
      weight: "600",
      style: "semibold",
    },
    {
      path: "../../../public/fonts/GeneralSans-Bold.otf",
      weight: "700",
      style: "bold",
    },
  ],
});

export default generalSans;
