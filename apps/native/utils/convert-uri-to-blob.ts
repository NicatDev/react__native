export const getBlobFromUri = async (uri: string): Promise<Blob | null> => {
  try {
    const response = await fetch(uri);
    return await response.blob();
  } catch (error) {
    console.error("Error converting URI to Blob:", error);
    return null;
  }
};
