module.exports = (slots) => {
  if (Array.isArray(slots)) {
    return slots.map((slot) => {
      return {
        ...slot.car
      }
    });
  }
  return {
    ...slots.car
  }
}