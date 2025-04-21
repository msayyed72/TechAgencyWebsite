export const smoothScroll = (id: string): void => {
  const element = document.getElementById(id);
  if (!element) return;

  const offset = 80; // Offset for fixed navbar
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
};
