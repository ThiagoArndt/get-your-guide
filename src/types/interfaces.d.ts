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
    email: string;
  };
  title: string;
  userLikes: string[];
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
  userLikes: string[];
}

interface CommentTripInterface {
  username: string;
  comment: string;
  rating: number;
}

interface CardTrip {
  id?: string;
  image: Buffer;
  destination: string;
  checkInDate?: Date;
  checkOutDate?: Date;
  price: number;
  maxPeople?: number;
  created_by: string;
  userLikes: string[];
}
