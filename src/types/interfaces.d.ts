interface Trip {
  id?: string;
  images: Buffer[];
  destination: string;
  description: string;
  checkInDate?: Date;
  checkOutDate?: Date;
  price: number;
  maxPeople?: number;
  comments: CommentTripInterface[];
  created_by: {
    id: string;
    username: string;
    profile_image: Buffer;
  };
  title: string;
}

interface ProfileInterface {
  id?: string;
  username: string;
  profile_image: Buffer;
  trips: ProfileTripInterface[];
}

interface ProfileTripInterface {
  id: string;
  created_by: string;
  image: Buffer;
  destination: string;
  isLiked?: boolean;
}

interface CommentTripInterface {
  username: string;
  comment: string;
  rating: number;
}
