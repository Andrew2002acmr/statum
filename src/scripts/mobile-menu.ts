const menuRoot = document.querySelector<HTMLElement>("[data-mobile-menu]");
const menuButton = document.querySelector<HTMLButtonElement>(
  "[data-mobile-menu-button]",
);
const menuPanel = document.querySelector<HTMLElement>(
  "[data-mobile-menu-panel]",
);

function setMenuState(isOpen: boolean) {
  if (!menuButton || !menuPanel || !menuRoot) {
    return;
  }

  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuPanel.hidden = !isOpen;
  menuRoot.dataset.state = isOpen ? "open" : "closed";
}

if (menuButton && menuPanel && menuRoot) {
  setMenuState(false);

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  menuPanel.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      setMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
      menuButton.focus();
    }
  });
}
