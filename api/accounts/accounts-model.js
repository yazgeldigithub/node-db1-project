const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts');
}

const getById = id => {
  // DO YOUR MAGIC
  return db('accounts')
    .where( { id } )
    .first();
}

const getByName = (name) => {
  return db('accounts')
    .where( { name } )
    .first();
}

const create = account => {
  // DO YOUR MAGIC
  return db('accounts')
  .insert(account)
  .then((result) => {
    return getById(result[0]);
  });
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
  return db('accounts')
    .where({ id })
    .update(account);
}

const deleteById = id => {
  // DO YOUR MAGIC
  return db('accounts')
    .where({ id })
    .del();
}

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateById,
  deleteById,
}