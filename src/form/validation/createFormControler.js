export function createFormControl(options, validation) {
  return {
    ...options,
    validation: { ...validation },
  }
}

export function isValidControl(control, validation) {
  let isValid = true
  if (!validation) {
    isValid = true
  }
  if (validation.require === true) {
    if (control.value.trim() === '') isValid = false
  }

  return isValid
}
