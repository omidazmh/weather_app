import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from '../App';

jest.mock('axios');

describe('App Component', () => {
  it('renders loading message initially', () => {
    render(<App />);
    expect(screen.getByText('Loading weather data...')).toBeInTheDocument();
  });

  it('renders weather data when fetch is successful', async () => {
    const weatherData = {
      data: {
        main: {
          temp: 300.15,
          feels_like: 303.15,
          temp_min: 298.15,
          temp_max: 305.15,
          pressure: 1012,
          humidity: 85,
        },
        weather: [{
          description: 'clear sky',
          icon: '01d'
        }],
        wind: {
          speed: 4.1,
          deg: 240
        },
        clouds: {
          all: 1
        },
        name: 'Tehran',
      }
    };

    axios.get.mockResolvedValue(weatherData);

    render(<App />);

    await waitFor(() => expect(screen.getByText('Tehran')).toBeInTheDocument());
    expect(screen.getByText('27 °')).toBeInTheDocument(); 
    expect(screen.getByText('clear sky 1 %')).toBeInTheDocument();
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('85 %')).toBeInTheDocument();
    expect(screen.getByText('Wind Speed')).toBeInTheDocument();
    expect(screen.getByText('4.1 m/s')).toBeInTheDocument();
    expect(screen.getByText('Pressure')).toBeInTheDocument();
    expect(screen.getByText('1012 hPa')).toBeInTheDocument();
  });

  it('renders error message when fetch fails', async () => {
    axios.get.mockRejectedValue(new Error('Failed to fetch'));

    render(<App />);

    await waitFor(() => expect(screen.getByText('Failed to fetch weather data.')).toBeInTheDocument());
  });

  it('renders error message when geolocation fails', async () => {
    global.navigator.geolocation = {
      getCurrentPosition: jest.fn((success, error) =>
        error({ message: 'User denied Geolocation' })
      ),
    };

    render(<App />);

    await waitFor(() => expect(screen.getByText('Failed to get your location.')).toBeInTheDocument());
  });
});
