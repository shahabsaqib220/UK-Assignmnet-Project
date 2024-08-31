export const SAVE_ORDER_DETAILS = 'SAVE_ORDER_DETAILS';

export const saveOrderDetails = (orderDetails) => ({
  type: SAVE_ORDER_DETAILS,
  payload: orderDetails,
});
