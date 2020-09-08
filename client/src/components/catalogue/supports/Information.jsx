const information = (card, categories, userActive, allRelations, allReviews)=>{
    var info = {
      admin: undefined,
      productCategories: undefined,
      reviewsPorcentage: undefined
    }
    info.reviewsPorcentage = allReviews.filter(review => card.id === review.productId)
    var cat = allRelations.filter(cat => cat.productId === card.id)

    if (categories[0]) {
      info.productCategories = categories.map(cats => {
        for (var i in cat) {
          if (cat[i].categoryId === cats.id) {
            return cats.name
          }
        }
      })
    }

    if (typeof userActive == "object" && userActive.access == "Admin") {
      info.admin = userActive.access;
    }

    return info
  }

  export default information