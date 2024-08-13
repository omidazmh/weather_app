import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherDetails from '../weatherDetails';

describe('WeatherDetails Component', () => {
  const mockWeatherData = {
    main: {
      feels_like: 300.15,
      temp_min: 295.15,
      temp_max: 305.15,
    },
    wind: {
      deg: 120,
    },
  };

  it('does not render details when isExpanded is false', () => {
    render(<WeatherDetails weatherData={mockWeatherData} isExpanded={false} />);
    
    expect(screen.queryByText(/Feels Like:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Wind Direction:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Min Temp:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Max Temp:/)).not.toBeInTheDocument();
  });

  it('renders weather details correctly when isExpanded is true', () => {
    render(<WeatherDetails weatherData={mockWeatherData} isExpanded={true} />);

    expect(screen.getByText('Feels Like: 27 °')).toBeInTheDocument();
    expect(screen.getByText('Wind Direction: 120 °')).toBeInTheDocument();
    expect(screen.getByText('Min Temp: 22 °')).toBeInTheDocument();
    expect(screen.getByText('Max Temp: 32 °')).toBeInTheDocument();
  });
});
