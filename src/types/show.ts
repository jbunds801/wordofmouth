export type Show = {
  title: string;
  supportingbands?: string;
  description?: string;
  imageUrl?: string;
  venue: string;
  city: string;
  date: string;
  time: string;
  genre: string;
};

export type ShowForm = Show & {
    imageFile?: File
}