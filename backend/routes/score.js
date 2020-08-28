const router = require('express').Router();
let Score = require('../models/score.model');

// Get All
router.route('/').get((req, res) => {
  Score.find()
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get Single
router.route('/:id').get((req, res) => {
  Score.findById()
    .then(score => res.json(score))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Filter by All
// router.route('/filter').post((req, res) => {
//   Score.find()
//     .then(scores => {
//       let responseScores = [...scores];
      
//       if (req.body.event_id) {
//         responseScores = responseScores.filter(score => score.event_id === req.body.event_id);
//       }

//       if (req.body.group_id) {
//         responseScores = responseScores.filter(score => score.group_id === req.body.group_id);
//       }

//       if (req.body.competition_id) {
//         responseScores = responseScores.filter(score => score.competition_id === req.body.competition_id);
//       }

//       if (req.body.player_id) {
//         responseScores = responseScores.filter(score => score.player_id === req.body.player_id);
//       }

//       res.json(responseScores);
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// })


// Filter by Event
router.route('/filter/byEvent/:id').get((req, res) => {
  Score.find()
    .then(scores => {
      scores = scores.filter(score => score.event_id === req.params.id);
      res.json(scores);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Filter by Group
router.route('/filter/byGroup/:id').get((req, res) => {
  Score.find()
    .then(scores => {
      scores = scores.filter(score => score.group_id === req.params.id);
      res.json(scores);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Filter by Competition
router.route('/filter/byComp/:id').get((req, res) => {
  Score.find()
    .then(scores => {
      scores = scores.filter(score => score.competition_id === req.params.id);
      res.json(scores);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Filter by Player
router.route('/filter/byPlayer/:id').get((req, res) => {
  Score.find()
    .then(scores => {
      scores = scores.filter(score => score.player_id === req.params.id);
      res.json(scores);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


// Add New
router.route('/add').post((req, res) => {
  const score = req.body.score

  const newScore = new Score(score);

  newScore.save()
    .then(res.json('Score added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update Score
router.route('/update/:id').post((req, res) => {
  Score.findById(req.params.id)
    .then(score => {
      const { player_id, group_id, event_id, competition_id, points, created_by_user_id } = req.body.score;

      score.player_id = player_id;
      score.group_id = group_id;
      score.event_id = event_id;
      score.competition_id = competition_id;
      score.points = points;
      score.created_by_user_id = created_by_user_id;

      score.save()
        .then(() => res.json('Score updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

// Delete Score
router.route('/:id').delete((req, res) => {
  Score.findByIdAndDelete(req.params.id)
    .then(() => res.json('Score deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;