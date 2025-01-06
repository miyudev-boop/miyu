import { renderHook, act } from '@testing-library/react-hooks';
import usePersonality from '../usePersonality'; // Adjust the import to match the actual hook

describe('usePersonality Hook', () => {
  it('should initialize with default traits', () => {
    const { result } = renderHook(() => usePersonality());

    expect(result.current.traits).toEqual(['Friendly', 'Curious']); // Adjust to match your defaults
  });

  it('should add a new trait', () => {
    const { result } = renderHook(() => usePersonality());

    act(() => {
      result.current.addTrait('Optimistic');
    });

    expect(result.current.traits).toContain('Optimistic');
  });

  it('should remove a trait', () => {
    const { result } = renderHook(() => usePersonality());

    act(() => {
      result.current.removeTrait('Friendly');
    });

    expect(result.current.traits).not.toContain('Friendly');
  });

  it('should handle invalid trait addition', () => {
    const { result } = renderHook(() => usePersonality());

    act(() => {
      result.current.addTrait('');
    });

    expect(result.current.error).toBe('Invalid trait');
  });
});

