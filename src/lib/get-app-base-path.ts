const getAppBasePath = () => {
  const basePath = process.env.NEXT_PUBLIC_SITE_URL || '';
  return basePath;
};

export default getAppBasePath;
