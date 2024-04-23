<?php

$errores = [];

if (isset($_FILES['imagen'])) {
    $archivo = $_FILES['imagen'];

    // Validar formato (PNG o JPG)
    $extension = pathinfo($archivo['name'], PATHINFO_EXTENSION);
    $extensionesValidas = ['png', 'jpg'];

    if (!in_array($extension, $extensionesValidas)) {
        $errores[] = "El formato de la imagen no es válido (solo PNG o JPG)";
    }

    // Validar tamaño (máximo 5 MB)
    if ($archivo['size'] > 5 * 1024 * 1024) {
        $errores[] = "La imagen supera el tamaño máximo (5 MB)";
    }

    if (empty($errores)) {
        // Convertir imagen a WebP
        $nombreOriginal = $archivo['name'];
        $nombreTemporal = $archivo['tmp_name'];
        $nombreWebP = uniqid() . '.webp';
        $rutaDestino = 'A.i_saas/converted/' . $nombreWebP;

        if (gd_imagewebp($nombreTemporal, $rutaDestino)) {
            $datosImagen = [
                'exito' => true,
                'imagen' => [
                    'url' => $rutaDestino,
                    'nombreOriginal' => $nombreOriginal
                ]
            ];
        } else {
            $errores[] = "Error al convertir la imagen a WebP";
        }
    } else {
        $datosImagen = [
            'exito' => false,
            'error' => implode(', ', $errores)
        ];
    }
} else {
    $datosImagen = [
        'exito' => false,
        'error' => 'No se ha enviado ninguna imagen'
    ];
}

echo json_encode($datosImagen);
