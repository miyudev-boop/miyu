import { renderHook, act } from '@testing-library/react-hooks';
import useFetchData from '../useFetchData'; // Adjust the import to match the actual hook
import { server, rest } from 'msw';
import { setupServer } from 'msw/node';

const mockServer = setupServer(
  rest.get('/api/data', (req, res, ctx) => {
    return res(ctx.json({ data: ['Item1', 'Item2'] }));
  })
);

beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

describe('useFetchData Hook', () => {
  it('should fetch and return data', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetchData('/api/data'));

    await waitForNextUpdate();

    expect(result.current.data).toEqual(['Item1', 'Item2']);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch errors', async () => {
    mockServer.use(
      rest.get('/api/data', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useFetchData('/api/data'));

    await waitForNextUpdate();

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeDefined();
  });
});
