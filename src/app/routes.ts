import { createBrowserRouter } from "react-router";
import StyleGuidePage from "./components/styleguide-page";
import ShowcasePage from "./components/showcase/showcase-page";
import AgentWizardPage from "./components/agent-wizard/agent-wizard-page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AgentWizardPage,
  },
  {
    path: "/showcase",
    Component: ShowcasePage,
  },
  {
    path: "/styleguide",
    Component: StyleGuidePage,
  },
]);