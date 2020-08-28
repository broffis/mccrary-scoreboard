const router = require('express').Router();
let Player = require('../models/player.model');

// Get All
router.route('/').get((req, res) => {
  Player.find()
    .then(players => res.json(players))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get Single
router.route('/:id').get((req, res) => {
  Player.findById(req.params.id)
    .then(player => res.json(player))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add New
router.route('/add').post((req, res) => {
  const player = req.body;

  const newPlayer = new Player(player);

  newPlayer.save()
    .then(() => res.json('Player added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


// Update Player
router.route('/update/:id').post((req, res) => {
  Player.findById(req.params.id)
    .then(player => {
      const { name, country_id, group_id, competition_id } = req.body;

      player.name = name;
      player.country_id = country_id;
      player.group_id = group_id;
      player.competition_id = competition_id;

      player.save()
        .then(() => res.json('Player updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Player
router.route('/:id').delete((req, res) => {
  Player.findByIdAndDelete(req.params.id)
    .then(() => res.json('Player deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
