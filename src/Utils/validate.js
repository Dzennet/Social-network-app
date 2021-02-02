export const required = value => value ? undefined : "Field is required"

export const maxLength = maxLength => value => value.length > maxLength ? `Max length is ${maxLength} symbols` : undefined

export const minLength = minLength => value => value.length < minLength ? `Min length is ${minLength} symbols` : undefined