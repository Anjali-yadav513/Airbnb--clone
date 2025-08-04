const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn,isOwner,validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer');

const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });



// router.get("/",async(req,res)=>{
//   try{
//     const{q} = req.query;
//     let listings;
//     if(q){
//       listings = await listings.find({title:{$regex:q, $options:"i"}
//       });

//     }
//     else{
//       listins = await Listing.find({});
//     }
//     res.render("listings/index",{allListings:listings,searchQuery:q|| "" });
//   }
//   catch(err){
//     console.error(err);
//     res.statusMessage(500).send("Internel Server Error");
//   }
// });





router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, 
    upload.single("listing[image]"),
    validateListing,
  wrapAsync(listingController.createListing)
 );


// New Route
router.get("/new", isLoggedIn,listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing)
)
.put(isLoggedIn,
  isOwner,
   upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListing)
)
.delete(isLoggedIn,
  isOwner,
  wrapAsync(listingController.distroyListing)
);

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);




module.exports = router;
