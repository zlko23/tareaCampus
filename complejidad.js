class Minima {
  complejidad() {
    return "minima";
  }
  siguiente() {
    return new Media();
  }
}

class Media {
  complejidad() {
    return "media";
  }
  siguiente() {
    return new Maxima();
  }
}

class Maxima {
  complejidad() {
    return "maxima";
  }
  siguiente() {
    return new Minima();
  }
}

module.exports = { Minima, Media, Maxima };