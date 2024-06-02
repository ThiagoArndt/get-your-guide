interface Trip {
  id?: number;
  image?: string;
  destination?: string;
  distance?: number;
  checkInDate?: string;
  checkOutDate?: string;
  price?: number;
  maxPeople?: number;
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
