const validateForm = {
  image: (imageType: string, imageTypes: string[]) => imageTypes.includes(imageType),
};

export default validateForm;
