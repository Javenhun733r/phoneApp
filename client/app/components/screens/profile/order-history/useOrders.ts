import { useQuery } from '@tanstack/react-query'

import { OrderService } from '@/services/order.service'

export const useOrders = () => {
	const { data: orders, isLoading } = useQuery({
		queryKey: ['get orders'],
		queryFn: () => OrderService.getByUserId()
	})

	return { orders, isLoading }
}
