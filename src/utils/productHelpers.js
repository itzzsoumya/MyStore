
export const generateVariants = (productId) => {
  const colors = ['Black', 'White', 'Navy', 'Red', 'Green']
  const sizes = ['XS', 'S', 'M', 'L', 'XL']
  
  const colorStart = productId % colors.length
  const availableColors = [colors[colorStart], colors[(colorStart+1)%colors.length], colors[(colorStart+2)%colors.length]]
  
  const variants = []
  availableColors.forEach(color => {
    sizes.forEach(size => {
      const hash = (productId * size.charCodeAt(0) + color.length) % 12
      let stock
      if (hash === 0) stock = 0
      else if (hash < 4) stock = hash 
      else stock = hash + 4 
      
      variants.push({
        color,
        size,
        stock,
        inStock: stock > 0,
        lowStock: stock > 0 && stock <= 3
      })
    })
  })
  return variants
}

export const getProductExtraImages = (productId, primaryImage) => {
 return [
    primaryImage,
    `https://picsum.photos/id/${100 + productId}/400/400`,
    `https://picsum.photos/id/${200 + productId}/400/400`
  ]
}