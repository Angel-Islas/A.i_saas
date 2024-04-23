const formularioImagenes = document.getElementById('formularioImagenes');
const contenedorImagenes = document.getElementById('contenedorImagenes');

formularioImagenes.addEventListener('submit', function(event) {
    event.preventDefault();

    const archivos = document.getElementById('imagenes').files;

    if (archivos.length === 0) {
        alert('Selecciona al menos una imagen');
        return;
    }

    for (let i = 0; i < archivos.length; i++) {
        const archivo = archivos[i];

        // Validar formato (PNG o JPG)
        if (!/^(image\/png|image\/jpeg)$/.test(archivo.type)) {
            alert(`El formato de la imagen "${archivo.name}" no es válido (solo PNG o JPG)`);
            continue;
        }

        // Validar tamaño (máximo 5 MB)
        if (archivo.size > 5 * 1024 * 1024) {
            alert(`La imagen "${archivo.name}" supera el tamaño máximo (5 MB)`);
            continue;
        }

        // Enviar imagen al servidor para su conversión
        enviarImagen(archivo);
    }
});

function enviarImagen(archivo) {
    const formData = new FormData();
    formData.append('imagen', archivo);

    fetch('upload.php', {
        method: 'POST',
        body: formData
    })
    .then(respuesta => respuesta.json())
    .then(datos => {
        if (datos.exito) {
            mostrarImagenConvertida(datos.imagen);
        } else {
            alert(datos.error);
        }
    })
    .catch(error => {
        console.error('Error al enviar la imagen:', error);
    });
}

function mostrarImagenConvertida(imagen) {
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = imagen.url;
    enlaceDescarga.download = imagen.nombreOriginal;
    enlaceDescarga.textContent = `Descargar ${imagen.nombreOriginal}`;

    const imagenPrevisualizacion = document.createElement('img');
    imagenPrevisualizacion.src = imagen.url;
    imagenPrevisualizacion.alt = imagen.nombreOriginal;

    const contenedorImagen = document.createElement('div');
    contenedorImagen.appendChild(imagenPrevisualizacion);
    contenedorImagen.appendChild(enlaceDescarga);

    contenedorImagenes.appendChild(contenedorImagen);
}
