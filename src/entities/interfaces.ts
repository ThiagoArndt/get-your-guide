export interface SignUpInterface {
  username: string;
  email: string;
  password: string;
  role: RolesEnum;
  profile_image: string;
}

export enum RolesEnum {
  USER,
  AGENT,
}

export interface TripInterface {
  created_by: string;
  location: string;
  date_final: Date;
  date_initial: Date;
  description: string;
  images: string[];
  price: number;
  title: string;
  number_people: number;
}

export interface CommentInterface {
  tripId: string;
  username: string;
  comment: string;
  rating: number;
}
