import { customFetch, getToken } from '../utils';
import { toast } from 'react-toastify';

export const postOrder = async (orderData) => {
    try {
        const token = getToken();
        const response = await customFetch.post('/orders', orderData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        toast.success('Order placed successfully');
        return response.data;
    } catch (error) {
        const errorMessage =
            error?.response?.data?.error?.message ||
            'There was an error placing your order';
        toast.error(errorMessage);
        throw error;
    }
};
