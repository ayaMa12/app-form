export default function DataReducer(state, { type, payload }) {
  switch (type) {
    case "ADD":
      const maxId =
        state.length > 0 ? Math.max(...state.map((item) => item.id)) : 0;
      const newItem = {
        ...payload,
        id: maxId + 1,
      };
      return [...state, newItem]; // أضف العنصر الجديد للمصفوفة
   
    default:
      throw Error("Unknown action: " + type);
  }
}
