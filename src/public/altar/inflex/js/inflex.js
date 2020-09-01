$.fn.imageUpload = function( options ) {
    var parent_this = this;
    var settings = $.extend({
        imageDefaults : [],
        maxFile : null,
        urlUpload : null,
        urlDelete : null,
        csrf_token : null,
        successUpload : null,
        name : null,
    }, options );

    parent_this.find('input[type=file]').attr('name',settings.name);

    function loadImage() {

    	if( settings.maxFile ) {
    		if( settings.maxFile <= settings.imageDefaults.length ) {
    			parent_this.find('.img-add').parents('.image-preview').hide();
    		} else {
    			parent_this.find('.img-add').parents('.image-preview').show();
    		}
    	}
    
    	parent_this.find('.image-item').remove();

    	$.each(settings.imageDefaults, function(key,value){
	    	var filename = value.replace(/^.*[\\\/]/, '');
	    	parent_this.find('.template')
	    	.clone()
	    	.removeClass('template')
	    	.addClass('image-item')
	    	.attr('data-filename', filename)
	    	.attr('data-index', key)
	    	.css('background-image', 'url('+ value +')' )
	    	.appendTo('.container-preview');
	    });
    }

    loadImage();
    
    settings.removeDone = function (callback) {
    	$(document).on('click','.img-remove',function(){
		    var image_preview = $(this).parents('.image-preview');
		    var index = image_preview.attr('data-index');
		    var filename = image_preview.attr('data-filename');

		    $.ajax({
		    	url 		: settings.urlDelete+'?filename='+filename,
	    		method 		: 'delete',
		    	headers 	: { 'X-Requested-With': 'XMLHttpRequest',  'X-CSRF-TOKEN' : settings.csrf_token },
		    })
		    .done(function( e ) {
		    	settings.imageDefaults.splice(index,1);
			    loadImage();
			    callback(settings.imageDefaults);
		    });

		});
    }
	

	parent_this.find('.img-add').click(function(){
	   parent_this.find('input[type=file]').click();
	});

	settings.uploadDone = function (callback) {

		parent_this.find('input[type=file]').change(function(){

			parent_this.find('.image-preview .img-add').hide();
			parent_this.find('.image-preview .progress').show();
			parent_this.find('input[type=file]').removeClass('is-invalid');
			var form = parent_this.parents('form')[0]; 
			var formData = new FormData(form);
			formData.append( settings.name, parent_this.find('input[type=file]')[0].files[0] ) ; 

		    $.ajax({
			    	url 	: settings.urlUpload,
			    	method 	: 'post',
			    	data 	: formData,
			    	contentType: false,
			    	processData : false,
			    	headers : { 'X-Requested-With': 'XMLHttpRequest',  'X-CSRF-TOKEN' : settings.csrf_token },
			    	statusCode : {
			    		422 : function(e) {
			    			var msg_err = e.responseJSON.errors[settings.name][0];
			    			parent_this.find('input[type=file]').addClass('is-invalid');
			    			parent_this.find('.invalid-feedback').html(msg_err);
			    			parent_this.find('.image-preview .img-add').show();
							parent_this.find('.image-preview .progress').hide();
							parent_this.find('.image-preview .progress-bar').css('width',"0%");
			    		}
			    	},
			    	xhr : function () {
				       var xhr = new window.XMLHttpRequest();
					    //Upload progress
					    xhr.upload.addEventListener("progress", function(evt){
					      if (evt.lengthComputable) {
					        var percentComplete = evt.loaded / evt.total;
					        var progress =  Math.round(percentComplete*100);
					        parent_this.find('.image-preview .progress-bar').css('width',progress+"%");
					      }
					    }, false);

					    return xhr;
	    			}
			    }).done(function( e ) {
			    	var image_new = e.filename ;
				    settings.imageDefaults.splice(0,0,image_new);
				    loadImage();
				    parent_this.find('.image-preview .img-add').show();
					parent_this.find('.image-preview .progress').hide();
					parent_this.find('.image-preview .progress-bar').css('width',"0%");
				    callback(settings.imageDefaults);
			    });
			    
			parent_this.find('input[type=file]').val('');
			
		});
	}
	
    return settings;

};