type typeGeneric = Array<Record<string, unknown>>;

export function transformer<T extends typeGeneric>(object: T): T {
  if (!object) {
    return null;
  }

  if (object && object.length > 0) {
    object.map((o) => {
      delete o.password;
    });
  }
  return object;
}

export function transformerUnique<T extends Record<string, unknown>>(
  object: T,
): T {
  if (object == null) {
    return null;
  }

  delete object.password;

  return object;
}

export function transformToDto<T extends typeGeneric>(entities: T, dto) {
  return entities.map((entity) => new dto(entity));
}
