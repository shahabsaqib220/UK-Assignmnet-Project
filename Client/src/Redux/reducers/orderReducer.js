const initialState = {
    orderDetails: {
      problemFile: null,
      requirementFile: null,
      descriptionFile: null,
      name: '',
      email: '',
      phone: '',
      paperType: '',
      academicLevel: '',
      wordCount: '',
      deadline: '',
    },
  };
  
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SAVE_ORDER_DETAILS":
        return {
          ...state,
          orderDetails: {
            ...state.orderDetails,
            ...action.payload,
          },
        };
      default:
        return state;
    }
  };
  
  export default orderReducer;
  