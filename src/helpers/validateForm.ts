const validateForm = {
  date: (date: string) => new Date(Date.now()) < new Date(date),
  image: (imageType: string, imageTypes: string[]) => imageTypes.includes(imageType),
};

export default validateForm;
