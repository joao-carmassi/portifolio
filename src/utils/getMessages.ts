export const getMessages = async (locale: string, component: string) => {
  const messages = (await import(`../../messages/${locale}.json`)).default;
  return (text: string) => messages[component][text];
};
