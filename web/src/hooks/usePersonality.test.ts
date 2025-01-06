import { renderHook, act } from '@testing-library/react-hooks';
import usePersonality from '../usePersonality'; // Ensure this path matches your project structure

describe('usePersonality Hook', () => {
  it('should initialize with default traits', () => {
    const { result } = renderHook(() => usePersonality());

    expect(result.current.traits).toEqual(['Friendly', 'Curious']); // Adjust as per your hook's default state
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
      result.current.addTrait('Friendly');
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

    expect(result.current.traits).toEqual(['Friendly', 'Curious']);
  });
});
