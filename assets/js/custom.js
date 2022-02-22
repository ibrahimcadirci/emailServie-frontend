$(document).ready(function(){
    let apiUrl      = "http://127.0.0.1:8000";
    // Editor 
    tinymce.init({
        selector: '#exampleInputContent'
      });

      // Mail Gönder
    $("#mailForm").submit(function(event){
        event.preventDefault();
        let form        = $(this);
        let data        = form.serialize();
        $.post(apiUrl + "/api/send",data, function(ret){
            if(ret){
                $("#mailForm").prepend(`
                    <div class="form-general-messages alert alert-success" role="alert">
                    ${ret.message}
                </div>`)
                form[0].reset();
            }
        },"JSON") .fail(function(err) {
            $("#mailForm").prepend(`
            <div class="form-general-messages alert alert-danger" role="alert">
            ${err.responseJSON.message}
          </div>`)
            $.each(err.responseJSON.errors, function(key, value){
                $("input[name='"+key+"']").next().text(value);
                $("input[name='"+key+"']").next().show(150);

            });
        });
        setTimeout(function(){
            $(".form-general-messages ").hide(250);
        },5000)
    });

    $("form input").keyup(function(){
        $(this).next().hide();
        $(this).next().html("");
    });

});