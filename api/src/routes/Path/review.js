const server = require("express").Router();
const { Review, Product, User } = require("../../db.js");

/////////// POST REVIEW ///////////
//---------------------------
server.post("/:id/reviews", (req, res) => {
  const { id } = req.params;
  const { userId, qualification, opinion } = req.body;

  User.findByPk(userId).then(user =>{
    Review.create({
      qualification: qualification,
      opinion: opinion,
      productId: parseInt(id),
      userName: user.name + ' ' + user.surname
    }).then((review) => {
      review
        .addUsers(userId)
        .then(
          () => res.send(review),
          (error) => res.send(error)
        )
    })
    .catch((error) => res.status(500).send(error));
  })  
});

/////////// GET ALL REVIEWS ///////////
server.get("/reviews", (req, res)=>{
  Review.findAll()
  .then(reviews => {
    res.send(reviews)
  })
  .catch((err) => res.send(err));
})


/////////// GET REVIEW FROM PRODUCT ///////////
//---------------------------------------------
server.get("/:id/review", (req, res) => {
  const { id } = req.params;

  Review.findAll({
    where: {
      productId: id,
    },
    include: [{
      model: User,
      attributes: ['name', 'email'] 
    },
    {
      model: Product,
      attributes: ['name', 'description']
    }
  ]
  })
    .then((reviews) => res.send(reviews))
    .catch((err) => res.send(err));
});

///////////// PUT REVIEW FROM PRODUCT ////////////
//------------------------------------------------
server.put("/:id/review/:idReview", (req, res) => {
  const { id, idReview } = req.params;

  Review.findByPk(parseInt(idReview))
    .then((review) => {
      const { qualification, opinion } = req.body;
      review.update({
        qualification: qualification,
        opinion: opinion,
      });
      res.send(review);
    })
    .catch((err) => res.send(err));
});

/////////// DELETE REVIEW FROM PRODUCT ///////////
//------------------------------------------------
server.delete("/:id/review/:idReview", (req, res) => {
  const { id, idReview } = req.params;

  Review.destroy({
    where: {
      id: parseInt(idReview),
    },
  })
    .then((review) => {
      if (review) res.send("review eliminated");
      //si elimina
      else res.send("review not found");
    })
    .catch((err) => res.send(err));
});

module.exports = server;
