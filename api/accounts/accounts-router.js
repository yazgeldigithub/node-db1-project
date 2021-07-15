const router = require('express').Router();
const accounts = require('./accounts-model');
const {checkAccountId, checkAccountNameUnique, checkAccountPayload} = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  accounts.getAll()
    .then(resp => {
      res.status(200).json(resp)
    }).catch(next);
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;

  accounts.getById(id)
    .then(resp => {
      res.status(200).json(resp);
    }).catch(next);
})

router.post('/', [checkAccountPayload, checkAccountNameUnique], (req, res, next) => {
  // DO YOUR MAGIC
  const neoAccount = req.body;

  accounts.create(neoAccount)
    .then(resp => {
      res.status(201).json(resp);
    }).catch(next);
})

router.put('/:id', [checkAccountId, checkAccountPayload, checkAccountNameUnique], (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  const changes = req.body;

  accounts.updateById(id, changes)
    .then(resp => {
      res.status(200).json(resp);
    }).catch(next);
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;

  accounts.deleteById(id)
    .then(resp => {
      res.status(201).json(resp);
    }).catch(next);
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  const status = err.status || 500;
  res.status(status).json({
      message: err.message
  })
})

module.exports = router;