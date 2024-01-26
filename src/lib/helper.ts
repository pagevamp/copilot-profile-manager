import { CustomField } from '@/types/common';

export function getObjectDifference(obj1: Record<string, string | string[]>, obj2: Record<string, string | string[]>) {
  let diff: Record<string, string | string[]> = {};
  for (let key in obj1) {
    let value1 = Array.isArray(obj1[key]) ? obj1[key].sort() : obj1[key];
    let value2 = Array.isArray(obj1[key]) ? obj2[key].sort() : obj2[key];
    if (JSON.stringify(value1) !== JSON.stringify(value2)) {
      diff[key] = obj1[key];
    }
  }
  return diff;
}

export function createLookup(array: any[] | undefined | null, key: string): Record<string, any> {
  const lookup: Record<string, any> = {};

  array?.forEach((item) => {
    lookup[item[key]] = item;
  });

  return lookup;
}

export function getSelectedOptions(portalCustomField: CustomField, value: string | string[]) {
  const options: any[] = [];

  if (portalCustomField.type === 'multiSelect' && value && Array.isArray(value) && portalCustomField.options) {
    portalCustomField.options.forEach((option) => {
      if (value.includes(option.key)) {
        options.push(option);
      }
    });
  }

  return options;
}
