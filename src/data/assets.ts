import accentWallCtaDesktop from "../assets/images/prepared/backgrounds/accent-wall-cta-desktop.webp";
import accentWallCtaMobile from "../assets/images/prepared/backgrounds/accent-wall-cta-mobile.webp";
import aboutRealRenovation from "../assets/images/generated/about-real-renovation.webp";
import benefitsProjectControl from "../assets/images/generated/benefits/benefits-project-control.png";
import processOrganizedRenovation from "../assets/images/generated/process-organized-renovation.webp";
import processOrganizedRenovationMobile from "../assets/images/generated/process-organized-renovation-mobile.webp";
import heroApproved from "../assets/images/hero/hero-approved.png";
import heroApprovedMobile from "../assets/images/hero/hero-approved-mobile.webp";
import accentWallProject from "../assets/images/prepared/portfolio/accent-wall-card.webp";
import graphicWallProject from "../assets/images/prepared/portfolio/graphic-wall-card.webp";
import greyBathroomProject from "../assets/images/prepared/portfolio/grey-bathroom-card.webp";
import turquoiseCorridorProject from "../assets/images/prepared/portfolio/turquoise-corridor-card.webp";
import woodShowerProject from "../assets/images/prepared/portfolio/wood-shower-card.webp";
import apartmentFinishingDesktop from "../assets/images/prepared/services/apartment-finishing-desktop.webp";
import apartmentFinishingMobile from "../assets/images/prepared/services/apartment-finishing-mobile.webp";
import graphicFinishDesktop from "../assets/images/prepared/services/graphic-finish-desktop.webp";
import graphicFinishMobile from "../assets/images/prepared/services/graphic-finish-mobile.webp";
import showerFittingsDesktop from "../assets/images/prepared/services/shower-fittings-desktop.webp";
import showerFittingsMobile from "../assets/images/prepared/services/shower-fittings-mobile.webp";

// Подготовленные материалы. Происхождение и ограничения реальных фотографий
// зафиксированы в design/image-manifest.md, визуализаций — рядом с их исходниками.
export const preparedAssets = {
  hero: {
    desktop: heroApproved,
    mobile: heroApprovedMobile,
  },
  about: aboutRealRenovation,
  benefits: benefitsProjectControl,
  process: {
    desktop: processOrganizedRenovation,
    mobile: processOrganizedRenovationMobile,
  },
  services: {
    apartment: {
      desktop: apartmentFinishingDesktop,
      mobile: apartmentFinishingMobile,
    },
    finish: {
      desktop: graphicFinishDesktop,
      mobile: graphicFinishMobile,
    },
    specific: {
      desktop: showerFittingsDesktop,
      mobile: showerFittingsMobile,
    },
  },
  projects: {
    accentWall: accentWallProject,
    woodShower: woodShowerProject,
    greyBathroom: greyBathroomProject,
    turquoiseCorridor: turquoiseCorridorProject,
    graphicWall: graphicWallProject,
  },
  cta: {
    desktop: accentWallCtaDesktop,
    mobile: accentWallCtaMobile,
  },
} as const;
