export const formatPrice = (value: number | string, currency: string) => {
  const VALUE = Number(value)

  const { format } = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
  })

  return format(VALUE)
}

export const formatDataString = 'dd/MM/yyyy'
export const formatDataStringISO = 'yyyy-MM-dd'
