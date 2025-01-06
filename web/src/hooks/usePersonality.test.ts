import { renderHook, act } from '@testing-library/react-hooks';
import usePersonality from '../usePersonality'; // Ensure this path is correct

describe('usePersonality Hook', () => {
  it('should initialize with default traits', () => {
    const { result } = renderHook(() => usePersonality());

    expect(result.current.traits).toEqual(['Friendly', 'Curious']); // Adjust this to match the default state in your hook
  });

  it('should add a new trait', () => {
    const { result } = renderHook(() => usePersonality());

    act(() => {
      result.current.addTrait('Optimistic');
    });

    expect(result.current.traits).toContain('Optimistic');
  });

  it('should not add duplicate traits', () => {
    const { result } = renderHook(() => usePersonality());

    act(() => {
      result.current.addTrait('Friendly'); // Assuming 'Friendly' is a default trait
    });

    expect(result.current.traits.filter((trait) => trait === 'Friendly').length).toBe(1);
  });

  it('should remove an existing trait', () => {
    const { result } = renderHook(() => usePersonality());

    act(() => {
      result.current.removeTrait('Friendly');
    });

    expect(result.current.traits).not.toContain('Friendly');
  });

  it('should not remove a non-existing trait', () => {
    const { result } = renderHook(() => usePersonality());

    act(() => {
      result.current.removeTrait('NonExistentTrait');
    });

    expect(result.current.traits).toEqual(['Friendly', 'Curious']); // Adjust this based on your hook's logic
  });

  it('should handle invalid trait addition', () => {
    const { result } = renderHook(() => usePersonality());

    act(() => {
      result.current.addTrait('');
    });

    expect(result.current.error).toBe('Invalid trait'); // Adjust based on your hook's error handling
  });
});
