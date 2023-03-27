const validateForm = {
  title: (title: string) => Boolean(title.length),
  brand: (brand: string, brands: string[]) => brands.includes(brand),
  date: (date: string) => new Date(Date.now()) < new Date(date),
  image: (imageName: string, imageFormats: string[]) => {
    const [imageFormat] = imageName.split('.').reverse();
    return imageFormats.includes(imageFormat);
  },
};

export default validateForm;
