const allowExternalImages = (req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; img-src * blob:;font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;");
  next();
}

export default allowExternalImages;