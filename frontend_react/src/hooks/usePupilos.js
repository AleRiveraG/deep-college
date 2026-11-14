import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function usePupilos() {
  const [pupilos, setPupilos] = useState([]);
  const [pupiloId, setPupiloId] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let vigente = true;

    api('/api/apoderados/me/pupilos')
      .then((resultado) => {
        if (!vigente) return;

        const lista = Array.isArray(resultado) ? resultado : [];
        setPupilos(lista);
        setPupiloId(lista.length ? String(lista[0].id) : '');
      })
      .catch((e) => {
        if (vigente) {
          setError(e.message || 'No se pudieron cargar los pupilos.');
        }
      })
      .finally(() => {
        if (vigente) setCargando(false);
      });

    return () => {
      vigente = false;
    };
  }, []);

  const pupilo = pupilos.find((item) => String(item.id) === pupiloId) || null;

  return { pupilos, pupilo, pupiloId, setPupiloId, cargando, error };
}