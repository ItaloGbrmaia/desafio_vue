export interface Photo {
  id: number;
  url: string;
  photographer: string;
  src: {
    medium: string;
    large: string;
  };
}
