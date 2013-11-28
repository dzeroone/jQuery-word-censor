(function($, window, document, undefined){

	var WordCensor = {

		init : function( options, elem ){

			var self = this;

			self.container = elem;
	    	self.removeWords ='';			

			//extending default options with the user option
			self.options = $.extend( {}, $.fn.censor.options, options );
			
			self.setFilters();
		},

		setFilters : function(){ //set the code for remove words
			
			var self = this;

			// set the code for object of badwords
			if(typeof(self.options.badWords) === 'object'){

			    self.totalBadWords = self.options.badWords.length;
			  
			    $.each(self.options.badWords, function(index, badWord) {
			        self.removeWords += badWord;
			        if(index<(self.totalBadWords-1)) {
			            self.removeWords += "|" ;
			        }
			    });
		   } else { // set the code for string of badwords
		   		self.removeWords = self.options.badWords;
		   }

		   self.doCensor();
		},		
	
		doCensor : function(){
    
		    var self = this;

		    htmlContent = $(self.container).html();

		    if(htmlContent!=null){
		    	var content = htmlContent.replace( new RegExp(self.removeWords, "igm"), self.options.replaceWord );
		    	$(self.container).html(content);
		    }
		}
	};

	$.fn.censor = function( options ){

		var elem = this.selector;

		return this.each(function(){		   
			censorObj = Object.create( WordCensor );
			censorObj.init( options, elem );
		});
	};

	$.fn.censor.options = {
        replaceWord : '**censored**'
	};

})(jQuery, window, document)

