interface Review {
  id: string;
  author: {
    name: string;
  };
  date: string;
  body: string;
}

export interface Actor {
  url: string;
  name: string;
}

export interface MovieDetails {
  id: string;
  title: string;
  poster?: string;
  description?: string;
  actors?: Actor[];
  reviews?: Review[];
  keywords?: string[];
}
