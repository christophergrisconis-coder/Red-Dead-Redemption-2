import VideoWithControls from "@/components/video/VideoWithControls";
import { AppStoreScreenshots } from "@/components/AppStoreScreenshots";
import { CoverVideo } from "@/components/CoverVideo";
import { TrailerVideo } from "@/components/video/TrailerVideo";

export default function App() {
  if (window.location.search.includes('trailer')) {
    return <TrailerVideo />;
  }
  if (window.location.search.includes('screenshots')) {
    return <AppStoreScreenshots />;
  }
  if (window.location.search.includes('cover')) {
    return (
      <div style={{ width: '100vw', height: '100vh', background: '#0a0604' }}>
        <CoverVideo />
      </div>
    );
  }
  return <VideoWithControls />;
}
