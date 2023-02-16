const validateQuantity = ({
  quantity,
  productDetails
}: {
  quantity: number
  productDetails: any
}) => {
  let updatedQuantity: number = quantity
  let message: string = ''

  if (quantity < 0) {
    throw new Error('Quantity cannot be less than zero.')
  }

  if (productDetails.quantity < quantity) {
    if (productDetails.quantity === 0) {
      throw new Error(`${productDetails.name} is currently out of stock.`)
    }

    updatedQuantity = productDetails.quantity

    message = `Only ${productDetails.quantity} ${productDetails.name} available.`
  }

  return { updatedQuantity, message }
}

export default validateQuantity
