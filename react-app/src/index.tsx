import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GameHome } from "./screens/GameHome";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <GameHome />
  </StrictMode>,
);
