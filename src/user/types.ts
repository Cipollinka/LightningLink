export interface UserProfileState {
  avatar: string;
  username: string;
  notes: Note[];
  likedNotes: number[];
  services: Service[];
  likedServices: number[];
}

export interface Note {
  id: number;
  heading: string;
  text: string;
  photo: string | undefined;
}

export enum ServiceCategory {
  Study = 'Study',
  Work = 'Work',
  Entertainment = 'Entertainment',
  Life = 'Life',
}
export interface Link{
  heading: string;
  url: string;
}
export interface Service {
  id: number;
  title: string;
  comment: string;
  links: Link[];
  color: string;
  category: ServiceCategory;
  cover: string | undefined;
}
