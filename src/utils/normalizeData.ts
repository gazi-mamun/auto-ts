function normalizeData(data: any): any {
  // Handle Mongoose documents
  if (data && typeof data.toObject === "function") {
    return data.toObject();
  }

  // Handle Sequelize instances
  if (data && typeof data.toJSON === "function") {
    return data.toJSON();
  }

  // Handle raw MySQL data (no normalization needed)
  return data;
}

export { normalizeData };
