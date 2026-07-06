'use strict';

(function () {
  const select2 = $('.select2'),
    selectPicker = $('.selectpicker');

  // Wizard Validation
  // --------------------------------------------------------------------
  const wizardValidation = document.querySelector('#wizard-validation');
  if (typeof wizardValidation !== undefined && wizardValidation !== null) {
    // Wizard form
    const wizardValidationForm = wizardValidation.querySelector('#FormResultados');
    // Wizard steps
    const wizardValidationFormStep1 = wizardValidationForm.querySelector('#account-details-validation');
    const wizardValidationFormStep2 = wizardValidationForm.querySelector('#personal-info-validation');
    const wizardValidationFormStep3 = wizardValidationForm.querySelector('#social-links-validation');
    // Wizard next prev button
    const wizardValidationNext = [].slice.call(wizardValidationForm.querySelectorAll('.btn-next'));
    const wizardValidationPrev = [].slice.call(wizardValidationForm.querySelectorAll('.btn-prev'));

    const validationStepper = new Stepper(wizardValidation, {
      linear: true
    });

    // Account details
    const FormValidation1 = FormValidation.formValidation(wizardValidationFormStep1, {
      fields: {
        
        ActividadUno: {
          validators: {
            notEmpty: {
              message: 'El nombre de curso es requerido'
            },
            stringLength: {
              min: 6,
              max: 30,
              message: 'El nombre del curso necesita más de 6 caracteres'
            },
            regexp: {
              regexp: /^[a-zA-Z ]+$/,
              message: 'El nombre del curso debe estar compuesto sólo de letras y espacios'
            }
          }
        },
        DescripcionCurso: {
          validators: {
            notEmpty: {
              message: 'La descripcion del curso es requerido'
            },
            stringLength: {
              min: 6,
              max: 200,
              message: 'La descripcion del curso necesita más de 6 caracteres'
            },
            regexp: {
              regexp: /^[a-zA-Z0-9 ]+$/,
              message: 'La descripcion del curso debe estar compuesto sólo de letras, números y espacios'
            }
          }
        },
     
        FechaInicio: {
          validators: {
            notEmpty: {
              message: 'La Fecha de inicio es requerido'
            },
            
           
          }
        },
        FechaFin: {
          validators: {
            notEmpty: {
              message: 'La Fecha de fin es requerido'
            },
            
         
          }
        },

      
        HorarioInicio: {
          validators: {
            notEmpty: {
              message: 'La hora de inicio es requerido'
            },
            
          
          }
        },
        HorarioFin: {
            validators: {
              notEmpty: {
                message: 'La hora de fin es requerido'
              },

            }
          },

       
        
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          // Use this for enabling/changing valid/invalid class
          // eleInvalidClass: '',
          eleValidClass: '',
          rowSelector: '.col-md-4'
        }),
        autoFocus: new FormValidation.plugins.AutoFocus(),
        submitButton: new FormValidation.plugins.SubmitButton()
      },
      init: instance => {
        instance.on('plugins.message.placed', function (e) {
          //* Move the error message out of the `input-group` element
          if (e.element.parentElement.classList.contains('input-group')) {
            e.element.parentElement.insertAdjacentElement('afterend', e.messageElement);
          }
        });
      }
    }).on('core.form.valid', function () {
      // Jump to the next step when all fields in the current step are valid
      validationStepper.next();
    });

    // Personal info
    const FormValidation2 = FormValidation.formValidation(wizardValidationFormStep2, {
      fields: {
        certificacionCurso: {
          validators: {
            notEmpty: {
              message: 'La certficacion del curso es requerido.'
            }
          }
        },
        ModalidadCurso: {
            validators: {
              notEmpty: {
                message: 'La modalidad del curso es requerida.'
              }
            }
          },
          ProveedorCurso: {
          validators: {
            notEmpty: {
              message: 'Seleccione el proveedor del curso.'
            }
          }
        },
        NivelCurso: {
          validators: {
            notEmpty: {
              message: 'Seleccione el nivel del curso.'
            }
          }
        },
        
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          // Use this for enabling/changing valid/invalid class
          // eleInvalidClass: '',
          eleValidClass: '',
          rowSelector: '.col-sm-6, .col-md-6'
        }),
        autoFocus: new FormValidation.plugins.AutoFocus(),
        submitButton: new FormValidation.plugins.SubmitButton()
      }
    }).on('core.form.valid', function () {
      // Jump to the next step when all fields in the current step are valid
      validationStepper.next();
    });

    // Bootstrap Select (i.e Language select)
    if (selectPicker.length) {
      selectPicker.each(function () {
        var $this = $(this);
        $this.selectpicker().on('change', function () {
          FormValidation2.revalidateField('formValidationLanguage');
        });
      });
    }

    // select2
    if (select2.length) {
      select2.each(function () {
        var $this = $(this);
        $this.wrap('<div class="position-relative"></div>');
        $this
          .select2({
            placeholder: 'Select an country',
            dropdownParent: $this.parent()
          })
          .on('change.select2', function () {
            // Revalidate the color field when an option is chosen
            FormValidation2.revalidateField('formValidationCountry');
          });
      });
    }

    // Social links
    const FormValidation3 = FormValidation.formValidation(wizardValidationFormStep3, {
      fields: {
        NombreProfesor: {
            validators: {
                notEmpty: {
                  message: 'El nombre del Profesor es requerido'
                },
                stringLength: {
                  min: 6,
                  max: 30,
                  message: 'El nombre del Profesor necesita más de 6 caracteres'
                },
                regexp: {
                  regexp: /^[a-zA-Z ]+$/,
                  message: 'El nombre del Profesor debe estar compuesto sólo de letras'
                }
              }
        },
        Profesion: {
            validators: {
                notEmpty: {
                  message: 'La profesion es requerida'
                },
                stringLength: {
                  min: 6,
                  max: 30,
                  message: 'La profesion necesita más de 6 caracteres'
                },
                regexp: {
                  regexp: /^[a-zA-Z ]+$/,
                  message: 'La profesion debe estar compuesta sólo de letras'
                }
              }
        },
        Dni: {
            validators: {
                notEmpty: {
                  message: 'El dni es requerida'
                },
                stringLength: {
                  min: 8,
                  max: 8,
                  message: 'El dni necesita 8 caracteres'
                },
                regexp: {
                  regexp: /^[Z0-9 ]+$/,
                  message: 'El dni debe estar compuesta sólo de numeros'
                }
              }
        },
        DescripcionProfe: {
            validators: {
                notEmpty: {
                  message: 'La descripcion es requerida'
                },
                stringLength: {
                  min: 6,
                  max: 200,
                  message: 'La descripcion necesita más de 6 caracteres'
                },
                regexp: {
                  regexp: /^[a-zA-Z ]+$/,
                  message: 'La descripcion debe estar compuesta sólo de letras'
                }
              }
        }
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          // Use this for enabling/changing valid/invalid class
          // eleInvalidClass: '',
          eleValidClass: '',
          rowSelector: '.col-sm-6, .col-sm-8'
        }),
        autoFocus: new FormValidation.plugins.AutoFocus(),
        submitButton: new FormValidation.plugins.SubmitButton()
      }
    }).on('core.form.valid', function () {
      // You can submit the form
      // wizardValidationForm.submit()
      // or send the form data to server via an Ajax request
      // To make the demo simple, I just placed an alert
      alert('Submitted..!!');
    });

    wizardValidationNext.forEach(item => {
      item.addEventListener('click', event => {
        // When click the Next button, we will validate the current step
        switch (validationStepper._currentIndex) {
          case 0:
            FormValidation1.validate();
            break;

          case 1:
            FormValidation2.validate();
            break;

          case 2:
            FormValidation3.validate();
            break;

          default:
            break;
        }
      });
    });

    wizardValidationPrev.forEach(item => {
      item.addEventListener('click', event => {
        switch (validationStepper._currentIndex) {
          case 2:
            validationStepper.previous();
            break;

          case 1:
            validationStepper.previous();
            break;

          case 0:

          default:
            break;
        }
      });
    });
  }
})();