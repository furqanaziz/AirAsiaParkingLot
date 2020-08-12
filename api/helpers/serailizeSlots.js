// method to return serialized and sorted response with id of the slot
module.exports = (snapshot) => {
  // serialize with id
  const slots = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  // sort slots by their ids
  const sortedSlots = slots.sort(function (a, b) {
    return Number(a.id) - Number(b.id);
  });

  return sortedSlots;
};
