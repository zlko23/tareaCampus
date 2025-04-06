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
    let valor = 1000;

    if (this.complejidad.complejidad() === "minima") {
      return Math.round(valor * this.getDuracion());
    } 
    else if (this.complejidad.complejidad() === "media") {
      return Math.round(valor * this.getDuracion() * 1.05);
    } 
    else if (this.complejidad.complejidad() === "maxima") {
      return this.getDuracion() >= 10
      ? Math.round(valor * this.getDuracion() * 1.07)
      : Math.round(valor * this.getDuracion() * 1.07);
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
    let valor = 1000;

    if (this.complejidad.complejidad() === "minima") {
      return Math.round(valor * this.getDuracion());
    } 
    else if (this.complejidad.complejidad() === "media") {
      return Math.round(valor * this.getDuracion() * 1.05);
    } 
    else if (this.complejidad.complejidad() === "maxima") {
      return this.getDuracion() >= 10
      ? Math.round(valor * this.getDuracion() * 1.07)
      : Math.round(valor * this.getDuracion() * 1.07 + (1000 * this.subtareas.length));
    }
    return costo;
  }
}

module.exports = { Tarea, TareaCompuesta };
