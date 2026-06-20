import VideoWithControls from "@/components/video/VideoWithControls";
import { AppStoreScreenshots } from "@/components/AppStoreScreenshots";

export default function App() {
  if (window.location.search.includes('screenshots')) {
    return <AppStoreScreenshots />;
  }
  return <VideoWithControls />;
}
