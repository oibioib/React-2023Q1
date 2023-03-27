const validateForm = {
  title: (title: string) => Boolean(title.length),
  brand: (brand: string, brands: string[]) => brands.includes(brand),
  date: (date: string) => new Date(Date.now()) < new Date(date),
  image: (imageType: string, imageTypes: string[]) => imageTypes.includes(imageType),
};

export default validateForm;
