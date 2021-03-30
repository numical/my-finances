module.exports = ({ collections, parentIds }) => {
  if (parentIds) {
    if (collections.length - parentIds.length !== 1) {
      throw new Error(
        `datastore create expects number of parent ids [${parentIds.join(
          ','
        )}] to be one less than number of collections [${collections.join(
          ','
        )}]`
      );
    }
  } else if (collections.length > 1) {
    throw new Error(
      `datastore create expects parent ids as nested collections [${collections.join(
        ','
      )}]`
    );
  }
};
