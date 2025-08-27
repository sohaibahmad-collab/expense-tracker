


export function transformId<T extends { _id?: string }>(data: T): Omit<T, "_id"> & { id: string } {
  const { _id, ...rest } = data;
  return { ...rest, id: _id ?? "" };
}

export function transformArray<T extends { _id?: string }>(data: T[]): (Omit<T, "_id"> & { id: string })[] {
  return data.map(transformId);
}
