// method to return cars from slots
module.exports = (slots) => {
  // check if there are multiple slots
  if (Array.isArray(slots)) {
    return slots.map((slot) => {
      return {
        ...slot.car,
      };
    });
  }

  // check if slot is single
  return {
    ...slots.car,
  };
};
