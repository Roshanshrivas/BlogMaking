var express = require('express');
var router = express.Router();
const userModel = require('./users')


// Fetching existing notes and displaying them on the left-side container.
router.get('/', function(req, res) {

  userModel.find()

  .then(function(existingNotes){

    res.render('index', {createData: existingNotes});

});

});




// Add a new note to the collection.
router.post('/', function(req, res) {

  userModel.create({

  title: req.body.title,
  Description: req.body.Description,

  }).then(function(createNotes){
    res.redirect('/');
  })

});


// Delete a note from the collection.
router.get('/delete/:id', function(req, res) {

  userModel.findOneAndDelete({
    
    _id: req.params.id

  }).then(function(deleteBlog){

    res.redirect('/')
  });
});


// Update an existing note with new data.

//FindOne
router.get('/update/:id', function(req, res) {
  userModel.findOne({ _id: req.params.id })
    .then(function(existData) {
      if (!existData) {
        return res.status(404).send('Data not found');
      }

      res.render('update', { updateData: existData });
    })
    .catch(function(error) {
      res.status(500).send('Error occurred while fetching data for update');
    });
});



// Update New Data
router.post('/update/:id', function(req, res) {

  const updateData = {
    title: req.body.title,
    Description: req.body.Description,
  }
 
  userModel.findOneAndUpdate({ _id: req.params.id }, 
  updateData, { new : true })

  .then(function(updatedData){


    if(!updatedData) {
      return res.status(404).send('data not found');
    }
    
    res.redirect('/')

    // console.log(updateData);

  })

  .catch(function(error){
    res.status(500).send('Error occurred while updating data.')
  })

});



// View details of a specific note in the right-side container.

router.get('/viewData/:id', function(req, res){

  userModel.findOne({

    _id: req.params.id 
  
  })

  .then(function(dataMillGaya){

    res.render("viewData", { viewData : dataMillGaya})
    
  })

})

module.exports = router;
