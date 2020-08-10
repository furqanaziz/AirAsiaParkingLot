module.exports = (snapshot) => {
  const slots = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data()
    }
  });
  const sortedSlots = slots.sort(function (a, b) {
    return Number(a.id) - Number(b.id);
  });
  return sortedSlots
}