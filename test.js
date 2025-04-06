const { Tarea, TareaCompuesta } = require("./tarea");
  
  const t131 = new Tarea("1.3.1", 2);
  const t132 = new Tarea("1.3.2", 1);
  const t13 = new TareaCompuesta("1.3", 3, [t131, t132]);
  t13.cambiarComplejidad();
  t13.cambiarComplejidad();
  
  const t1221 = new Tarea("1.2.2.1", 3);
  const t1222 = new Tarea("1.2.2.2", 6);
  t1222.cambiarComplejidad();
  const t121 = new Tarea("1.2.1", 4, "minima");
  const t122 = new TareaCompuesta("1.2.2", 1, [t1221, t1222]);
  const t12 = new TareaCompuesta("1.2", 4, [t121, t122]);
  t12.cambiarComplejidad();
  t12.cambiarComplejidad();
  
  const t11 = new Tarea("1.1", 6);
  t11.cambiarComplejidad();
  t11.cambiarComplejidad();
  
  const t1 = new TareaCompuesta("1", 2, [t11, t12, t13]);
  t1.cambiarComplejidad();

  
  function calcularCostoTotal(tarea) {
    let total = tarea.getCosto();
    if (tarea instanceof TareaCompuesta) {
      for (const subtarea of tarea.subtareas) {
        total += calcularCostoTotal(subtarea);
      }
    }
    return total;
  }
  
  function calcularDuracionTotal(tarea) {
    if (tarea instanceof TareaCompuesta) {
      return tarea.subtareas.reduce(
        (acum, subtarea) => acum + calcularDuracionTotal(subtarea),
        tarea.duracion
      );
    }
    return tarea.getDuracion();
  }

  class Proyecto {
    constructor(tareas = []) {
      this.tareas = tareas;
    }
  
    getDuracion() {
      return this.tareas.reduce((total, tarea) => total + calcularDuracionTotal(tarea), 0);
    }
  
    getCostoTotal() {
      return this.tareas.reduce((total, tarea) => total + calcularCostoTotal(tarea), 0);
    }
  }
  
  const proyecto = new Proyecto([t1]);
  
  console.log(`\t_________________________________________________________________
  \t|  TAREA\tDURACION\tCOSTE\t\tCOMPLEJIDAD\t|
  \t|_______________________________________________________________|
  \t|  ${t1.codigo}\t\t${t1.duracion} minutos \t$ ${t1.getCosto()}\t\t${t1.complejidad.complejidad()}\t\t|
  \t|  ${t11.codigo}\t\t${t11.duracion} minutos \t$ ${t11.getCosto()}\t\t${t11.complejidad.complejidad()}\t\t|
  \t|  ${t12.codigo}\t\t${t12.duracion} minutos \t$ ${t12.getCosto()}\t\t${t12.complejidad.complejidad()}\t\t|
  \t|  ${t121.codigo} \t${t121.duracion} minutos \t$ ${t121.getCosto()}\t\t${t121.complejidad.complejidad()}\t\t|
  \t|  ${t122.codigo} \t${t122.duracion} minutos \t$ ${t122.getCosto()}\t\t${t122.complejidad.complejidad()}\t\t|
  \t|  ${t1221.codigo} \t${t1221.duracion} minutos \t$ ${t1221.getCosto()}\t\t${t1221.complejidad.complejidad()}\t\t|
  \t|  ${t1222.codigo} \t${t1222.duracion} minutos \t$ ${t1222.getCosto()}\t\t${t1222.complejidad.complejidad()}\t\t|
  \t|  ${t13.codigo}\t\t${t13.duracion} minutos \t$ ${t13.getCosto()}\t\t${t13.complejidad.complejidad()}\t\t|
  \t|  ${t131.codigo} \t${t131.duracion} minutos \t$ ${t131.getCosto()}\t\t${t131.complejidad.complejidad()}\t\t|
  \t|  ${t132.codigo} \t${t132.duracion} minutos \t$ ${t132.getCosto()}\t\t${t132.complejidad.complejidad()}\t\t|
  \t|_______________________________________________________________|
  \t|  SUBTOTAL\t${calcularDuracionTotal(t1)} minutos \t$ ${calcularCostoTotal(t1)}\t\t\t\t|
  \t|_______________________________________________________________|`);
  
  
  console.log(`\t|  TOTAL\t${proyecto.getDuracion()} minutos \t$ ${proyecto.getCostoTotal()}\t\t\t\t|
  \t|_______________________________________________________________|`);
  