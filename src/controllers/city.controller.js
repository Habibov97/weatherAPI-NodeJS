const cityService = require('../services/city.service');

exports.getCities = async (req, res) => {
  let result = await cityService.getCities();
  res.status(200).json({ status: 'success', cities: result });
};

exports.getCity = async (req, res) => {
  const { id } = req.params;
  if (!id || id.length < 24 || id.length > 24) return res.status(403).json({ error: 'Id must be valid' });

  const result = await cityService.getCity(id);
  if (!result) return res.status(409).json({ error: 'Cannot get city information' });

  res.status(200).json({ status: 'success', city: result });
};

exports.createCity = async (req, res) => {
  const body = req.body;
  const { name } = body;
  if (name?.trim().length < 2) return res.status(400).json({ error: 'City name must be greater than 2' });

  try {
    let result = await cityService.createCity(name);

    res.status(201).json({ message: 'city has been created', city: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCity = async (req, res) => {
  const { id } = req.params;
  if (!id || id.length < 24 || id.length > 24) return res.status(403).json({ error: 'Id must be valid' });

  try {
    await cityService.deleteCity(id);
  } catch (error) {
    res.json({
      message: 'cannot delete the document. Either city not exists or some error happend in deletion',
    });
  }

  res.json({ message: 'city has been deleted successfully' });
};
