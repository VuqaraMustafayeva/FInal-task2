// burda yanliz adminler kece biler 
exports.adminOnly = (req, res, next) => {
  // birinci prodectmiddleware yoxlanilir (token) duzduse req.usere id ve role qoyuruq
  if (req.user && req.user.role === "admin") return next();
  return res.status(403).json({ message: "Admin only" });
};
