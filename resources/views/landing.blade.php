<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RESET&GO | Especialistas en Resurrección Tecnológica</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        :root { --primary: #007bff; --dark: #1a1a1a; }
        .hero { background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('assets/img/taller-bg.jpg'); background-size: cover; color: white; padding: 120px 0; }
        .service-card { border: none; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-radius: 15px; }
        .highlight { color: var(--primary); font-weight: bold; }
    </style>
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container">
        <a class="navbar-brand fw-bold" href="#">
            <img src="{{ asset('./assets/img/icons/global/iconoresetgo-removebg-preview.png') }}" width="40" class="me-2"> RESET&GO
        </a>
    </div>
</nav>

<header class="hero text-center">
    <div class="container">
        <h1 class="display-3 fw-bold">No lo descartes, <span class="highlight">dale una segunda vida.</span></h1>
        <p class="lead mt-4 px-lg-5">En <strong>RESET&GO</strong>, no solo reparamos hardware; restauramos tu conexión con el mundo. Expertos en diagnóstico de alta precisión y microelectrónica.</p>
        <a href="#contacto" class="btn btn-primary btn-lg mt-4">Solicitar Diagnóstico Técnico</a>
    </div>
</header>

<section class="container py-5">
    <div class="row align-items-center">
        <div class="col-md-6">
            <h2 class="fw-bold">Expertos en Microelectrónica</h2>
            <p class="fs-5">¿Tu dispositivo no enciende o presenta fallas críticas? En RESET&GO nos especializamos exclusivamente en <strong>reparación técnica avanzada</strong>. Sin rodeos, sin intermediarios, diagnóstico directo al problema.</p>
            <ul class="list-unstyled mt-4">
                <li><i class='bx bx-check text-primary'></i> Diagnóstico de fallas en placa base.</li>
                <li><i class='bx bx-check text-primary'></i> Solución a fallos de alimentación y energía.</li>
                <li><i class='bx bx-check text-primary'></i> Recuperación de hardware crítico.</li>
                <li><i class='bx bx-check text-primary'></i> Laboratorio equipado con tecnología de vanguardia.</li>
            </ul>
        </div>
        <div class="col-md-6 text-center">
            <img src="{{ asset('assets/img/icons/global/laboratorio.jpg') }}" class="img-fluid rounded shadow" alt="Taller de reparación">
        </div>
    </div>
</section>

<section id="contacto" class="bg-light py-5">
    <div class="container text-center">
        <section class="contact-info text-center">
    <div class="container">
        <h3>Encuéntranos aquí</h3>
        <div class="mt-4">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.354651347065!2d-58.17565342468792!3d-26.177258377157643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94576a1656c071bb%3A0x67137f814981e4a!2sFormosa%2C%20Argentina!5e0!3m2!1ses-419!2sar!4v1717000000000" 
            width="100%" height="300" style="border:0; border-radius:10px;" allowfullscreen="" loading="lazy"></iframe>
        </div>
    </div>
</section>
        <div class="mt-4">
            <p>📍 Dirección: Av. Raúl Alfonsín s/n, P3600 Formosa.</p>
            <p>📞 WhatsApp: +54 370 450 1577</p>
            <p>✉️ Email: resetgo@gmail.com</p>
        </div>
    </div>
</section>

</body>
</html>