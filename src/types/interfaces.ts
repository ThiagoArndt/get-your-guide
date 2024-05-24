interface Trip {
    id?: number,
    image?: string;
    destination?: string;
    distance?: number;
    checkInDate?: string;
    checkOutDate?: string;
    price?: number;
    maxPeople?: number;
  }

interface SignUpInterface{
  username: string,
  email: string,
  password: string,
  role: RolesEnum,
}

enum RolesEnum{
  USER,
  AGENT,
}