
$("#guardarImagen").on('click', function() {

  preventDefault();
  //var idimagen = document.getElementById("file-upload-with-preview-courseImage").value;
  var idimagen = document.getElementById("file-upload-with-preview-courseImage").value;
  var url = "../../../../funcionalidadesphp/AulaVirtual/InsertarImagenCurso.php?idimagen=" + idimagen;
  var formData = new FormData($('#FormCursos')[0]);
  $.ajax({
    url: url,
    type: 'get',
    data: formData,
    contentType: false,
    processData: false,
    success: function(formData) {
  /*
     if (formData.success == 1) {
        Swal.fire({
          title: '¡Exito!',
          text: 'El curso se ha agregado con exito',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false
        });
  
        setTimeout(function(){
          window.location.reload();
       }, 3000);
  
  
      }
  
      if (formData.success == 2) {
        Swal.fire({
          title: '¡Error!',
          text: 'El curso se encuentra vacio',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false
        });
      }*/
  
  
  
    }
  });
/*ajax 2*/
var formDatauno = new FormData($('#FormCursos')[0]);
$.ajax({
  url: '../../../../funcionalidadesphp/AulaVirtual/InsertarImagenCurso.php',
  type: 'post',
  data: formDatauno,
  contentType: false,
  processData: false,
  success: function(formData) {
/*
   if (formData.success == 1) {
      Swal.fire({
        title: '¡Exito!',
        text: 'El curso se ha agregado con exito',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      });

      setTimeout(function(){
        window.location.reload();
     }, 3000);


    }

    if (formData.success == 2) {
      Swal.fire({
        title: '¡Error!',
        text: 'El curso se encuentra vacio',
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      });
    }*/



  }
});




  return false;
 
  
} );
