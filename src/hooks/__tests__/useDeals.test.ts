import { fetchDeals } from '@/src/api/fetchDeals';
import { Deal } from '@/src/domain/Deal';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import { useDeals } from '../useDeals';


jest.mock('@/src/api/fetchDeals');
const mockedFetchDeals = fetchDeals as jest.MockedFunction<typeof fetchDeals>;

const mockData = [
  { id: '1', title: 'Phone A', price: 500, refurbedScore: 80 },
  { id: '2', title: 'Phone B', price: 300, refurbedScore: 95 },
  { id: '3', title: 'Phone C', price: 700, refurbedScore: 60 },
] as Deal[];

describe('useDeals hook', () => {
  beforeEach(() => {
    mockedFetchDeals.mockResolvedValue(mockData);
  });

  it('should fetch deals and apply initial sorting', async () => {
    // Първоначално сортираме по цена възходящо (asc)
    const { result } = renderHook(() => useDeals({ key: 'price', direction: 'asc' }));

    // Изчакваме лоудингът да приключи
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Проверяваме дали са сортирани: 300 (B), 500 (A), 700 (C)
    expect(result.current.deals[0].title).toBe('Phone B');
    expect(result.current.deals[2].title).toBe('Phone C');
  });

  it('should filter deals by minScore', async () => {
    const { result } = renderHook(() => useDeals({ key: 'price', direction: 'asc' }));
    
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Променяме филтъра на 90+ точки
    act(() => {
      result.current.setMinScore(90);
    });

    // Трябва да остане само Phone B (score 95)
    expect(result.current.deals.length).toBe(1);
    expect(result.current.deals[0].title).toBe('Phone B');
  });

  it('should change sorting dynamically', async () => {
    const { result } = renderHook(() => useDeals({ key: 'price', direction: 'asc' }));
    
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Сменяме към сортиране по Score низходящо (desc)
    act(() => {
      result.current.setSortOption({ key: 'refurbedScore', direction: 'desc' });
    });

    // Най-високият скор е 95 (Phone B)
    expect(result.current.deals[0].title).toBe('Phone B');
    expect(result.current.deals[0].refurbedScore).toBe(95);
  });
});