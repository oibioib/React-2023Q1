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

const logUnsplashLimits = (response: Response, endpoint: string) => {
  if (import.meta.env.VITEST) return;
  const limit = response.headers.get('X-Ratelimit-Limit') || '[No limit info]';
  const remaining = response.headers.get('X-Ratelimit-Remaining') || '[No limit info]';
  console.log(
    `%c INFO / %c ${endpoint} %c / Usplash API limit - %c${remaining}%c (${limit}) per hour`,
    `color: MediumPurple`,
    `color: orange; font-weight: 600;`,
    `color: MediumPurple`,
    `color: orange; font-weight: 600;`,
    `color: MediumPurple`
  );
};

export { transformUnsplashPhoto, logUnsplashLimits };
