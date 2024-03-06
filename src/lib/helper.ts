import { CustomField } from '@/types/common';

export function getObjectDifference(obj1: Record<string, string | string[]>, obj2: Record<string, string | string[]>) {
  let diff: Record<string, string | string[]> = {};
  for (let key in obj1) {
    let value1 = obj1[key];
    let value2 = obj2[key];
    value1 = Array.isArray(value1) ? value1.sort() : value1;
    value2 = Array.isArray(value2) ? value2.sort() : value2;
    if (JSON.stringify(value1) !== JSON.stringify(value2)) {
      diff[key] = value1;
    }
  }
  return diff;
}

// todo:: Need refactor, possibly create generics
export function createLookup(array: any[] | undefined | null, key: string): Record<string, any> {
  const lookup: Record<string, any> = {};

  array?.forEach((item) => {
    lookup[item[key]] = item;
  });

  return lookup;
}

export function createMapLookup<T extends Record<string, unknown>>(
  array: T[] | undefined | null,
  key: string,
): Map<string, T> {
  const mapItems = (array ?? [])
    .map((item) => {
      if (key in item) return [item[key], item];
      return null;
    })
    .filter(Boolean);
  const lookup: Map<string, any> = new Map();
  return lookup;
}

export function getSelectedOptions(portalCustomField: CustomField, value: string | string[]) {
  const options: unknown[] = [];

  if (portalCustomField.type === 'multiSelect' && value && Array.isArray(value) && portalCustomField.options) {
    portalCustomField.options.forEach((option) => {
      if (value.includes(option.key)) {
        options.push(option);
      }
    });
  }

  return options;
}
