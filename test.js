const { Tarea, TareaCompuesta } = require("./tarea");
  
  const t3 = new Tarea("3", 25);
  t3.cambiarComplejidad();
  
  const t221 = new Tarea("2.2.1", 2);
  const t222 = new Tarea("2.2.2", 5);
  const t22 = new TareaCompuesta("2.2", 10, [t221, t222]);
  t22.cambiarComplejidad();
  t22.cambiarComplejidad();
  
  const t21 = new Tarea("2.1", 8);
  t21.cambiarComplejidad();
  
  const t2 = new TareaCompuesta("2", 15, [t21, t22]);

  const t1 = new Tarea("1", 30);
  t1.cambiarComplejidad();
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
  
  const proyecto = new Proyecto([t1,t2,t3]);
  
  console.log(`\t_________________________________________________________________
  \t|  TAREA\tDURACION\tCOSTE\t\tCOMPLEJIDAD\t|
  \t|_______________________________________________________________|
  \t|  ${t1.codigo}\t\t${t1.duracion} minutos \t$ ${t1.getCosto()}\t\t${t1.complejidad.complejidad()}\t\t|
  \t|  ${t2.codigo}\t\t${t2.duracion} minutos \t$ ${t2.getCosto()}\t\t${t2.complejidad.complejidad()}\t\t|
  \t|  ${t21.codigo}\t\t${t21.duracion} minutos \t$ ${t21.getCosto()}\t\t${t21.complejidad.complejidad()}\t\t|
  \t|  ${t22.codigo}\t\t${t22.duracion} minutos \t$ ${t22.getCosto()}\t\t${t22.complejidad.complejidad()}\t\t|
  \t|  ${t221.codigo} \t${t221.duracion} minutos \t$ ${t221.getCosto()}\t\t${t221.complejidad.complejidad()}\t\t|
  \t|  ${t222.codigo} \t${t222.duracion} minutos \t$ ${t222.getCosto()}\t\t${t222.complejidad.complejidad()}\t\t|
  \t|  ${t3.codigo}\t\t${t3.duracion} minutos \t$ ${t3.getCosto()}\t\t${t3.complejidad.complejidad()}\t\t|
  \t|_______________________________________________________________|`);
  
  console.log(`\t|  TOTAL\t${proyecto.getDuracion()} minutos \t$ ${proyecto.getCostoTotal()}\t\t\t|
  \t|_______________________________________________________________|`);
  
