const accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const neoAccount = req.body;

  if (!neoAccount.name || !neoAccount.budget) {
    res.status(400).json({ message: "name and budget are required" })
  } else if (typeof(neoAccount.name) !== "string" ) {
    res.status(400).json({ message: "name of account must be a string" })
  } else if (neoAccount.name.trim().length < 3 || neoAccount.name.trim().length > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  } else if (typeof(neoAccount.budget) !== "number") {
    res.status(400).json({ message: "budget of account must be a number" })
  } else if (neoAccount.budget < 0 || neoAccount.budget > 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" })
  } else {
    req.body.name = req.body.name.trim();
    next();
  }
 }

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const {name} = req.body;

  if (!name || typeof(name) !== "string") {
    next();
  }

  accounts.getByName(name) 
    .then(resp => {
      if (resp === undefined || resp === null) {
        next();
      } else {
        res.status(400).json({
          message: "that name is taken"
        })
      }
    }).catch(next);

}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;

  accounts.getById(id) 
    .then(resp => {
      if (resp === undefined || resp === null) {
        res.status(404).json({
          message: "account not found"
        })
      } else {
        next();
      }
    }).catch(next);
}