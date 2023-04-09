import { API } from '@constants';
import { MainCardProps } from 'components/types';

export interface UnsplashPhoto {
  id: string;
  created_at: string;
  color: string;
  likes: number;
  description: string;
  user: {
    name: string;
    profile_image: {
      small: string;
    };
  };
  urls: {
    regular: string;
    small: string;
  };
}

export interface UnsplashResult {
  results: UnsplashPhoto[];
  total: number;
  total_pages: number;
}

interface GetPhotos {
  (value?: string): Promise<UnsplashResult>;
}

interface GetPhoto {
  (id: string): Promise<UnsplashPhoto>;
}

const printUnsplashLimits = (response: Response, message: string) => {
  const limit = response.headers.get('X-Ratelimit-Limit') || '[No limit info]';
  const remaining = response.headers.get('X-Ratelimit-Remaining') || '[No limit info]';
  console.log(`INFO: ${message} - Usplash API limit - ${remaining} (${limit}) per hour`);
};

const getPhotos: GetPhotos = async (searchValue = '') => {
  const fetchUrl = `${API.URL}${API.ENDPOINT.PHOTOS}?per_page=20&orientation=landscape&query=${
    searchValue || API.DEFAULT_QUERY
  }`;
  const response = await fetch(fetchUrl);

  if (!response.ok) {
    throw new Error('Error fetching photos');
  }

  printUnsplashLimits(response, 'PHOTOS');

  const data = response.json();
  return data;
};

const getPhoto: GetPhoto = async (id) => {
  const fetchUrl = `${API.URL}${API.ENDPOINT.SINGLE_PHOTO}/${id}`;
  const response = await fetch(fetchUrl);

  if (!response.ok) {
    throw new Error('Error fetching single photo');
  }

  printUnsplashLimits(response, 'SINGLE PHOTO');

  const data = response.json();
  return data;
};

const preparePhoto: (photo: UnsplashPhoto) => MainCardProps = ({
  id,
  created_at,
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
    color,
    description,
    createdAt: created_at,
    likes,
    author: name,
    authorAvatar: smallAvatar,
  };
};

export { getPhotos, getPhoto, preparePhoto };
