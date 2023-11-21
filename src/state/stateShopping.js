import { useContext, createContext, useReducer } from "react";
//Crear el contexto para consumir
export const ShoppingContext = createContext();
// Definicion el reducer
const shoppingReducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case "ADD_TO_PRODUCT": {
      const productInCartIndex = state.findIndex(
        (item) => item?._id === payload._id
      );

      if (productInCartIndex >= 0) {
        const newState = [...state];
        //Cantidad
        newState[productInCartIndex].cantidad += 1;

        return newState;
      }

      return [
        ...state,
        {
          ...payload,
          cantidad: 1,
        },
      ];
    }
    case "REMOVE_FROM_PRODUCT": {
      const productInCartIndex = state.findIndex(
        (item) => item._id === payload._id
      );

      if (productInCartIndex >= 0) {
        const newState = [...state];
        //Cantidad
        let resta = newState[productInCartIndex].cantidad - 1;
        //Nuevo estado
        newState[productInCartIndex].cantidad = resta;
        return newState;
      }
      return state;
    }
    case "DELETE_FROM_PRODUCT":
      const newState = state.filter((item) => item._id !== payload._id);
      return newState;
    case "CLEAR_CART":
      return [];
    default:
      console.warn(`Tipo de acción no controlada: ${type}`);
      return state;
  }
};
//Inicializar
const initialState = [];
//Crear provider, para proveer el contexto
export function ShoppingProvider({ children }) {
  const [state, dispatch] = useReducer(shoppingReducer, initialState);

  const addToProduct = (product) => {
    dispatch({ type: "ADD_TO_PRODUCT", payload: product });
  };

  const removeFromProduct = (product) => {
    dispatch({ type: "REMOVE_FROM_PRODUCT", payload: product });
  };

  const deletFromProduct = (product) => {
    dispatch({ type: "DELETE_FROM_PRODUCT", payload: product });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <ShoppingContext.Provider
      value={{
        cart: state,
        addToProduct,
        removeFromProduct,
        deletFromProduct,
        clearCart,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
}

export const useShopping = () => useContext(ShoppingContext);
