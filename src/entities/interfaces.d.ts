interface SignUpInterface {
  username: string;
  email: string;
  password: string;
  role: RolesEnum;
}

enum RolesEnum {
  USER,
  AGENT,
}

interface TripInterface {
  created_by: string;
  location: string;
  date_final: Date;
  date_initial: Date;
  description: string;
  images: Buffer[];
  price: number;
  title: string;
}
