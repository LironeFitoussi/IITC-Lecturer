import { useQuery } from '@tanstack/react-query';
import { RestaurantQuery } from '../types';
import ApiService from '../services/api';

export const useRestaurants = (query: RestaurantQuery = {}) => {
  return useQuery({
    queryKey: ['restaurants', query],
    queryFn: () => ApiService.getRestaurants(query),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime in v5)
  });
};

export const useRestaurant = (id: string) => {
  return useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => ApiService.getRestaurant(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime in v5)
  });
};
