import SonicDesert from "./components/routes/SonicDesert";
import Prime16 from "./components/routes/Prime16";
import AlignedPronunciation from "./components/routes/AlignedPronunciation";

export default [
  { path: "/", component: AlignedPronunciation },
  { path: "/prime16", component: Prime16 },
  { path: "/sonic-desert", component: SonicDesert }
];
