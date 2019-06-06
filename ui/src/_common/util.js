import strftime from 'strftime';

export const download = (data, filename) => {
  const element = document.createElement('a');
  element.setAttribute('href', data);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const dateFilename = (extension = '') => {
  return strftime(`%Y%m%d-%H%M%S%L.${extension}`);
};
