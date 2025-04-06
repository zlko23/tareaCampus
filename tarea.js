const { Minima, Media, Maxima } = require("./complejidad");

class Tarea {
  constructor(codigo, duracion) {
    this.codigo = codigo;
    this.duracion = duracion;
    this.complejidad = new Minima();
  }

  getDuracion() {
    return this.duracion;
  }

  cambiarComplejidad() {
    this.complejidad = this.complejidad.siguiente();
  }

  getCosto() {
    if (this.complejidad.complejidad() === "minima") {
      return 100 * this.getDuracion();
    } 
    else if (this.complejidad.complejidad() === "media") {
      return this.getDuracion() >= 5
        ? 200 * this.getDuracion()
        : 150 * this.getDuracion();
    } 
    else if (this.complejidad.complejidad() === "maxima") {
      return 300 * this.getDuracion() + 500;
    }
    return 0;
  }

}

class TareaCompuesta {
  constructor(codigo, duracion, subtareas = []) {
    this.codigo = codigo;
    this.duracion = duracion;
    this.subtareas = subtareas;
    this.complejidad = new Minima();
  }

  agregar(unaTarea) {
    this.subtareas.push(unaTarea);
  }

  getDuracion() {
    return this.subtareas.reduce(
      (acum, tarea) => acum + tarea.getDuracion(),
      this.duracion,
    );
  }

  cambiarComplejidad() {
    this.complejidad = this.complejidad.siguiente();
  }

  getCosto() {
    let costo = 0;

    if (this.complejidad.complejidad() === "minima") {
      costo = 100 * this.duracion;
    } 
    else if (this.complejidad.complejidad() === "media") {
      costo =
        this.duracion >= 5 ? 200 * this.duracion : 150 * this.duracion;
    } 
    else if (this.complejidad.complejidad() === "maxima") {
      costo = 300 * this.duracion + 500 * this.subtareas.length;
    }
    return costo;
  }
}

module.exports = { Tarea, TareaCompuesta };