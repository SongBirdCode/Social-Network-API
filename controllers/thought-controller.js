// Importing the mongoose library

const { Thought } = require('../models');
// Connecting to the MongoDB database using the MongoDB URI provided in the environment 
// variables or using the default URI if the environment variable is not set


// Exporting the connection to the database as a module
module.exports = {


  async getAllThoughts(req, res) {
try { 
  const thoughtData = await Thought.find ()
   res.status(200).json(thoughtData);
}
catch (err) {
   console.log (err)
   res.status(500).json(err);

}

  },

  async createThought (req, res) {
try {
const thoughtData = await Thought.create (req.body) 
res.status(200).json(thoughtData);

}
catch (err) {
  console.log (err)
res.status(500).json(err);

}



  },

  async getThoughtById (req, res) {
    //req
    //req.params
    //req.params.thoughtId
    try{ 
      const thoughtData = await Thought.findOne ({_id: req.params.thoughtId})


      if(!thoughtData){
        res.status(400).json({message: "No thought found by that Id"})
      }

   res.status(200).json(thoughtData);
}
    catch (err) {
        console.log (err)
      res.status(500).json(err);
    }
  },


  async updateThoughtById({ req, res}) {
    
    Thought.updateThoughtById({ _id: params.id }, body, {
      new: true, 
      runValidators: true,
    })
    .then((thoughtData))
      if (!ThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
      };
    },

async updateUserById({ req, res}) {
  Thought.updateUserById({ _id: params.id }, body, {
    new: true, 
    runValidators: true,
  })
    .then((ThoughtData) => {
      if (!ThoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
  }
  res.json(dbThoughtData);
})
.catch((err) => res.json(err));
},


   // update Thought by id//
   async updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // delete Thought
 async deleteThought({ params }, req, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought with this id!" });
        }


        // remove thought id from user's `thoughts` field
        return User.findOneAndUpdate(
          { thoughts: params.id },
          { $pull: { thoughts: params.id } }, //$pull removes from an existing values that match a specified condition.
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "Thought created but no user with this id!" });
        }
        res.json({ message: "Thought successfully deleted!" });
      })
      .catch((err) => res.json(err));
  },

  // add reaction
  async createReaction({ params, body }, req,res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((ThoughtData) => {
        if (!ThoughtData) {
          res.status(404).json({ message: "No thought with this id" });
          return;
        }
        res.json(ThoughtData);
      })
      .catch((err) => res.json(err));
  },


  // delete reaction
  async deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((ThoughtData) => res.json(ThoughtData))
      .catch((err) => res.json(err));
  },
};
