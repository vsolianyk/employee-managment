module.exports = (req, res) => {
  res.cookie(
    'authorize',
    { access: '', refresh: '' },
    { signed: true, httpOnly: true },
  );
  res.redirect('http://localhost:3000/');
}