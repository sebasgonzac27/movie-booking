import { Meta, StoryObj } from '@storybook/angular';
import { MovieListCardComponent } from './movie-list-card.component';

const meta: Meta<MovieListCardComponent> = {
  title: 'Components/MovieListCardComponent',
  component: MovieListCardComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<MovieListCardComponent>;

export const Default: Story = {
  args: {
    movie: {
      id: 1,
      slug: 'avengers-endgame',
      title: 'Avengers: Endgame',
      cover:
        'https://preview.redd.it/a1h3w7blmm2a1.jpg?width=640&crop=smart&auto=webp&s=06e2c4b36e2ce472cd489e279e4a4d4cd36db5e7',
      duration: 120,
      releaseDate: '2021-01-01T00:00:00.000Z',
      storyline: 'Movie storyline',
      genres: [
        {
          id: 1,
          name: 'Action',
        },
        {
          id: 2,
          name: 'Adventure',
        },
        {
          id: 3,
          name: 'Sci-Fi',
        },
      ],
      languages: [
        {
          id: 1,
          name: 'English',
        },
        {
          id: 2,
          name: 'Portuguese',
        },
      ],
    },
  },
};
