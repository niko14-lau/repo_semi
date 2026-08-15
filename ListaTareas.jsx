import { useState } from 'react';

function ListaTareas() {
  const [tareas, setTareas] = useState([
    { id: 1, texto: 'Repasar props', hecha: false },
    { id: 2, texto: 'Practicar useState', hecha: false },
  ]);
  const [nuevaTarea, setNuevaTarea] = useState('');

  const agregarTarea = () => {
    if (nuevaTarea.trim() === '') return;
    const tarea = {
      id: crypto.randomUUID(),
      texto: nuevaTarea.trim(),
      hecha: false,
    };
    
    // 1) Completado de forma inmutable usando spread operator
    setTareas((prev) => [tarea, ...prev]);
    setNuevaTarea('');
  };

  const eliminarTarea = (id) => {
    // 2) Completado usando filter para quitar la tarea seleccionada
    setTareas((prev) => prev.filter((t) => t.id !== id));
  };

  const alternarHecha = (id) => {
    // 3) Completado devolviendo un objeto nuevo sin mutar el estado anterior
    setTareas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t))
    );
  };

  return (
    <div>
      <input
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button onClick={agregarTarea}>Agregar</button>
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            <input
              type="checkbox"
              checked={tarea.hecha}
              onChange={() => alternarHecha(tarea.id)}
            />
            <span style={{ textDecoration: tarea.hecha ? 'line-through' : 'none' }}>
              {tarea.texto}
            </span>
            <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaTareas;
