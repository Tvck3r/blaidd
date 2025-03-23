import { Key } from 'react'

export function getNestedKeyValue<T>(obj: T, desc: Key): any {
  const propertyNames = desc.toString().split('.')

  let currentObj: any = obj

  for (const propertyName of propertyNames) {
    if (!currentObj || typeof currentObj !== 'object' || !(propertyName in currentObj)) {
      return undefined // Return undefined if encountered non-object or missing property while traversing
    }
    currentObj = currentObj[propertyName]
  }

  return currentObj
}
// This function retrieves a nested property value from an object using a dot-separated string path.
// If any part of the path is invalid, it returns undefined.
