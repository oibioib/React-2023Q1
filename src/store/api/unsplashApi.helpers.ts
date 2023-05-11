import { MainCardProps } from '@components/types';

import { UnsplashPhoto } from './unsplashApi';

const transformUnsplashPhoto: (photo: UnsplashPhoto) => MainCardProps = ({
  id,
  created_at,
  width,
  height,
  urls: { small: smallImage, regular },
  color,
  description,
  likes,
  user: {
    name,
    profile_image: { small: smallAvatar },
  },
}) => {
  return {
    id,
    img: regular,
    thumb: smallImage,
    width,
    height,
    color,
    description,
    createdAt: created_at,
    likes,
    author: name,
    authorAvatar: smallAvatar,
  };
};
export { transformUnsplashPhoto };
