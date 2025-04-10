export default function Estrellas_Calf({ calificacion = 0 }) {
    function generarEstrellas(calificacion) {
        let estrellas = [];

        for (let i = 1; i <= 5; i++) {
            if (i <= calificacion) {
                estrellas.push(<span key={i} className="estrella llena">&#9733;</span>); // Estrella llena
            } else {
                estrellas.push(<span key={i} className="estrella vacia">&#9734;</span>); // Estrella vacía
            }
        }
        return estrellas;
    }

    return <div>{generarEstrellas(calificacion)}</div>;
}
