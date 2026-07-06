/**
 * Tour
 */

'use strict';

(function () {
  const startBtn = document.querySelector('#shepherd-example');

  function setupTour(tour) {
    const backBtnClass = 'btn btn-sm btn-label-secondary md-btn-flat',
      nextBtnClass = 'btn btn-sm btn-primary btn-next';
    tour.addStep({
      title: 'Navbar',
      text: 'Esta es la barra de navegación número uno y esta compuesta por dos partes',
      attachTo: { element: '.navbar', on: 'bottom' },
      buttons: [
        {
          action: tour.cancel,
          classes: backBtnClass,
          text: 'Terminar'
        },
        {
          text: 'Siguiente',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });
    tour.addStep({
      title: 'Navbar',
      text: 'Primero esta el logo de la subsecretaria',
      attachTo: { element: '.subsecretariaLogo', on: 'top' },
      buttons: [
        {
          text: 'Terminar',
          classes: backBtnClass,
          action: tour.cancel
        },
        {
          text: 'Volver',
          classes: backBtnClass,
          action: tour.back
        },
        {
          text: 'Siguiente',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });
    tour.addStep({
      title: 'Navbar',
      text: 'Segundo, las opciones de especificas del usuario que esta usando el sistema y las funcionalidades propias del equipo',
      attachTo: { element: '.subsecretariaNavGnereal', on: 'top' },
      buttons: [
        {
          text: 'Terminar',
          classes: backBtnClass,
          action: tour.cancel
        },
        {
          text: 'Volver',
          classes: backBtnClass,
          action: tour.back
        },
        {
          text: 'Siguiente',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });
    tour.addStep({
      title: 'Navbar',
      text: 'La función "dark mode" te permite editar el diseño blanco por defecto del sistema',
      attachTo: { element: '.darkMode', on: 'top' },
      buttons: [
        {
          text: 'Terminar',
          classes: backBtnClass,
          action: tour.cancel
        },
        {
          text: 'Volver',
          classes: backBtnClass,
          action: tour.back
        },
        {
          text: 'Siguiente',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });
    tour.addStep({
      title: 'Navbar',
      text: 'Aqui podras encontrar todas las funcionalidades especificas creadas exclusivamente para el equipo al cual perteneces',
      attachTo: { element: '.herramientas', on: 'top' },
      buttons: [
        {
          text: 'Terminar',
          classes: backBtnClass,
          action: tour.cancel
        },
        {
          text: 'Volver',
          classes: backBtnClass,
          action: tour.back
        },
        {
          text: 'Siguiente',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });
    tour.addStep({
      title: 'Navbar',
      text: 'En el modulo notificaciónes podras ver los anuncios oficiales de la subsecretaria asi tambien como recordatorios',
      attachTo: { element: '.notificaciones', on: 'top' },
      buttons: [
        {
          text: 'Terminar',
          classes: backBtnClass,
          action: tour.cancel
        },
        {
          text: 'Volver',
          classes: backBtnClass,
          action: tour.back
        },
        {
          text: 'Siguiente',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });
    tour.addStep({
      title: 'Navbar',
      text: 'En el modulo mi perfil podras encontrar todas las opciones propias de tu usuario',
      attachTo: { element: '.miPerfil', on: 'top' },
      buttons: [
        {
          text: 'Terminar',
          classes: backBtnClass,
          action: tour.cancel
        },
        {
          text: 'Volver',
          classes: backBtnClass,
          action: tour.back
        },
        {
          text: 'Siguiente',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });
    tour.addStep({
      title: 'Menú',
      text: 'En esta sección encontraras todas las funcionalidades generales del software para todos los miembros de la subsecretaria',
      attachTo: { element: '.menuPrincipal', on: 'top' },
      buttons: [
        {
          text: 'Terminar',
          classes: backBtnClass,
          action: tour.cancel
        },
        {
          text: 'Volver',
          classes: backBtnClass,
          action: tour.back
        },
        {
          text: 'Siguiente',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });
    tour.addStep({
      title: 'Menú',
      text: 'La opción inicio te llevara a la pagina de en la que te encuentras "la página principal"',
      attachTo: { element: '.menuPrincipalInicio', on: 'top' },
      buttons: [
        {
          text: 'Terminar',
          classes: backBtnClass,
          action: tour.cancel
        },
        {
          text: 'Volver',
          classes: backBtnClass,
          action: tour.back
        },
        {
          text: 'Siguiente',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });
    tour.addStep({
      title: 'Menú',
      text: 'La opción Mi semana te permitira planificar tu semana en función de resultados y ver el avance de los mismos. Si no eres el coordinador de tu equipo solo te permitira ver los resultados cargados por tu coordinador mas no cargarlos',
      attachTo: { element: '.menuPrincipalMiSemana', on: 'top' },
      buttons: [
        {
          text: 'Terminar',
          classes: backBtnClass,
          action: tour.cancel
        },
        {
          text: 'Volver',
          classes: backBtnClass,
          action: tour.back
        },
        {
          text: 'Siguiente',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });
    tour.addStep({
      title: 'Menú',
      text: 'La opción "Nueva Actividad te permitira cargar las actividades que vas a realizar en el día. Esto te ayudara a llevar un mejor control de lo que haras en tu dia laboral"',
      attachTo: { element: '.menuPrincipalNuevaActividad', on: 'top' },
      buttons: [
        {
          text: 'Terminar',
          classes: backBtnClass,
          action: tour.cancel
        },
        {
          text: 'Volver',
          classes: backBtnClass,
          action: tour.back
        },
        {
          text: 'Siguiente',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });
    tour.addStep({
      title: 'Menú',
      text: 'La opción "Bases de datos" te permitira cargar y ver información que vayas almacenando ya sea mediante proyectos, cursos, etc',
      attachTo: { element: '.menuPrincipalBasesDeDatos', on: 'top' },
      buttons: [
        {
          text: 'Terminar',
          classes: backBtnClass,
          action: tour.cancel
        },
        {
          text: 'Volver',
          classes: backBtnClass,
          action: tour.back
        },
        {
          text: 'Siguiente',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });
    tour.addStep({
      title: 'Menú',
      text: 'La opción "Mi Equipo"',
      attachTo: { element: '.menuPrincipalMiEquipo', on: 'top' },
      buttons: [
        {
          text: 'Terminar',
          classes: backBtnClass,
          action: tour.cancel
        },
        {
          text: 'Volver',
          classes: backBtnClass,
          action: tour.back
        },
        {
          text: 'Siguiente',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });
    tour.addStep({
      title: 'Página Principal',
      text: 'Página Principal',
      attachTo: { element: '.paginaPrincipal', on: 'top' },
      buttons: [
        {
          text: 'Terminar',
          classes: backBtnClass,
          action: tour.cancel
        },
        {
          text: 'Volver',
          classes: backBtnClass,
          action: tour.back
        },
        {
          text: 'Siguiente',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });
    tour.addStep({
      title: 'Página Principal',
      text: 'Mensaje de bienvenido',
      attachTo: { element: '.paginaPrincipalMsjBienvenido', on: 'top' },
      buttons: [
        {
          text: 'Terminar',
          classes: backBtnClass,
          action: tour.cancel
        },
        {
          text: 'Volver',
          classes: backBtnClass,
          action: tour.back
        },
        {
          text: 'Siguiente',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });
    tour.addStep({
      title: 'Página Principal',
      text: 'Frase del día',
      attachTo: { element: '.paginaPrincipalFraseDelDia', on: 'top' },
      buttons: [
        {
          text: 'Terminar',
          classes: backBtnClass,
          action: tour.cancel
        },
        {
          text: 'Volver',
          classes: backBtnClass,
          action: tour.back
        },
        {
          text: 'Siguiente',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });

    tour.addStep({
      title: 'Página Principal',
      text: 'Tutorial',
      attachTo: { element: '.paginaPrincipalTutorial', on: 'top' },
      buttons: [
        {
          text: 'Terminar',
          classes: backBtnClass,
          action: tour.cancel
        },
        {
          text: 'Volver',
          classes: backBtnClass,
          action: tour.back
        },
        {
          text: 'Siguiente',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });

    tour.addStep({
      title: 'Página Principal',
      text: 'Proposito',
      attachTo: { element: '.paginaPrincipalProposito', on: 'top' },
      buttons: [
        {
          text: 'Terminar',
          classes: backBtnClass,
          action: tour.cancel
        },
        {
          text: 'Volver',
          classes: backBtnClass,
          action: tour.back
        },
        {
          text: 'Siguiente',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });
    
    return tour;
  }

  if (startBtn) {
    // On start tour button click
    startBtn.onclick = function () {
      const tourVar = new Shepherd.Tour({
        defaultStepOptions: {
          scrollTo: false,
          cancelIcon: {
            enabled: true
          }
        },
        useModalOverlay: true
      });

      setupTour(tourVar).start();
    };
  }

  // ! Documentation Tour only
  const startBtnDocs = document.querySelector('#shepherd-docs-example');

  function setupTourDocs(tour) {
    const backBtnClass = 'btn btn-sm btn-label-secondary md-btn-flat',
      nextBtnClass = 'btn btn-sm btn-primary btn-next';
    tour.addStep({
      title: 'Navbar',
      text: 'This is your navbar',
      attachTo: { element: '.navbar', on: 'bottom' },
      buttons: [
        {
          action: tour.cancel,
          classes: backBtnClass,
          text: 'Skip'
        },
        {
          text: 'Next',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });
    tour.addStep({
      title: 'Footer',
      text: 'This is the Footer',
      attachTo: { element: '.footer', on: 'top' },
      buttons: [
        {
          text: 'Skip',
          classes: backBtnClass,
          action: tour.cancel
        },
        {
          text: 'Back',
          classes: backBtnClass,
          action: tour.back
        },
        {
          text: 'Next',
          classes: nextBtnClass,
          action: tour.next
        }
      ]
    });
    tour.addStep({
      title: 'Social Link',
      text: 'Click here share on social media',
      attachTo: { element: '.footer-link', on: 'top' },
      buttons: [
        {
          text: 'Back',
          classes: backBtnClass,
          action: tour.back
        },
        {
          text: 'Finish',
          classes: nextBtnClass,
          action: tour.cancel
        }
      ]
    });

    return tour;
  }

  if (startBtnDocs) {
    // On start tour button click
    startBtnDocs.onclick = function () {
      const tourDocsVar = new Shepherd.Tour({
        defaultStepOptions: {
          scrollTo: false,
          cancelIcon: {
            enabled: true
          }
        },
        useModalOverlay: true
      });

      setupTourDocs(tourDocsVar).start();
    };
  }
})();
