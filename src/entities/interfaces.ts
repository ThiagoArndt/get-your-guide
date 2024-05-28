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
  images: Buffer[];
  price: number;
  title: string;
}
