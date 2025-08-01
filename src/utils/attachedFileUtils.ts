export const formatFileSize = (sizeInBytes: number): string => {
  if (sizeInBytes < 1024) return `${sizeInBytes} B`;
  const sizeInKB = sizeInBytes / 1024;
  if (sizeInKB < 1024) return `${sizeInKB.toFixed(1)} KB`;
  const sizeInMB = sizeInKB / 1024;
  if (sizeInMB < 1024) return `${sizeInMB.toFixed(1)} MB`;
  const sizeInGB = sizeInMB / 1024;
  return `${sizeInGB.toFixed(1)} GB`;
};
