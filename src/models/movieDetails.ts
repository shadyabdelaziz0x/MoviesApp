interface Review {
  author: {
    name: string;
  };
  date: string;
  body: string;
}

interface Actor {
  '@type': string;
  url: string;
  name: string;
}

export interface MovieDetails {
  title: string;
  poster?: string;
  description?: string;
  actors: Actor[];
  reviews: Review[];
  keywords: string[];
}
