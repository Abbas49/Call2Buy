const allowExternalImages = (req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; img-src *;font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com;");
  next();
}

export default allowExternalImages;