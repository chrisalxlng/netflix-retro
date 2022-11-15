import { parse } from 'csv-parse/sync';
import html2canvas from 'html2canvas';

export const parseCSV = async <T extends object>(csvFile: File | Response): Promise<T[]> => {
  const data = await csvFile.text();
  return parse(data, { columns: true });
};

const fetchCSV = async (csvURL: string) =>
  fetch(csvURL, {
    headers: {
      'content-type': 'text/csv',
    },
  });

export const fetchAndParseCSV = async <T extends object>(csvURL: string): Promise<T[]> => {
  const response = await fetchCSV(csvURL);
  return parseCSV(response);
};

export const findMostOccuringElementsInArray = <T extends unknown>(
  array: T[]
): { elements: T[]; count: number } => {
  const store: { element: T; count: number }[] = [];
  array.forEach((element) => {
    const currentEntry = store.find((entry) => entry.element === element);
    if (currentEntry) currentEntry.count += 1;
    else store.push({ element, count: 1 });
  });
  const sortedStore = store.sort((previous, current) => current.count - previous.count);
  const mostOccuringElementCount = sortedStore[0]?.count ?? 0;
  return {
    elements: store
      .filter((entry) => entry.count === mostOccuringElementCount)
      .map((entry) => entry.element),
    count: mostOccuringElementCount,
  };
};

export const generateImageURLFromComponent = async (ref: any): Promise<string> => {
  const element = ref.current;
  const canvas = await html2canvas(element, { backgroundColor: 'black', scale: 5 });
  return canvas.toDataURL('image/jpg');
};

export const generateImageFileFromURL = async (imageURL: string, name: string): Promise<File> => {
  const blob = await (await fetch(imageURL)).blob();
  return new File([blob], name, {
    type: blob.type,
    lastModified: new Date().getTime(),
  });
};

export const isImageSharable = (imageURL: string): boolean => navigator.canShare({ url: imageURL });

export const shareFiles = (data: {
  title?: string;
  text?: string;
  files: File[];
}): Promise<void> => {
  if (navigator.canShare({ files: data.files })) return navigator.share(data);
  return new Promise((_, reject) => {
    reject(new Error('URL could not be shared via Web Share API.'));
  });
};

export const downloadImage = (imageURL: string, fileName: string = 'image'): void => {
  const link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = imageURL;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(imageURL);
  }
};
