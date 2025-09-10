const scrollToContainer = (
  container: string,
  position: 'start' | 'end' | 'center'
) => {
  const element = document.getElementById(container);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: position });
  }
};

export default scrollToContainer;
