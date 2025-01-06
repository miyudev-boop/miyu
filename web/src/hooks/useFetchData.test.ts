import { renderHook, act } from '@testing-library/react-hooks';
import useFetchData from '../useFetchData'; // Ensure this path matches your project structure
import axios from 'axios';

jest.mock('axios');

describe('useFetchData Hook', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useFetchData('https://api.example.com/data'));

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
    expect(result.current.loading).toBe(true);
  });

  it('should fetch data successfully', async () => {
    const mockData = { id: 1, name: 'Test Item' };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result, waitForNextUpdate } = renderHook(() => useFetchData('https://api.example.com/data'));

    await waitForNextUpdate();

    expect(result.current.data).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle fetch error', async () => {
    const mockError = new Error('Network Error');
    mockedAxios.get.mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useFetchData('https://api.example.com/data'));

    await waitForNextUpdate();

    expect(result.current.data).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(mockError);
  });
});
