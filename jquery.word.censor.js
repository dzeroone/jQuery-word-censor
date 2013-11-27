(function($, window, document, undefined){

	var WordCensor = {

		init : function( options, elem ){

			var self = this;

			self.container = elem;
	    	self.filters ='';			

			//extending default options with the user option
			self.options = $.extend( {}, $.fn.censor.options, options );
			
			self.setFilters();
		},

		setFilters : function(){ 
			
			var self = this;

			if(typeof(self.options.badWords) === 'object'){

			    self.totalBadWords = self.options.badWords.length;
			    
			    $.each(self.options.badWords, function(index, badWord) {
			        self.filters += badWord;
			        if(index<(self.totalBadWords-1)) {
			            self.filters += "|" ;
			        }
			    });
		   } else {
		   		self.filters = self.options.badWords;
		   }

		   self.doCensor();
		},		
	
		doCensor : function(){
    
		    var self = this;

		    //console.log(self.container); 
		    //need some changes here
		    //htmlContent = $(self.container+':contains('+self.filters+')').html();
		    htmlContent = $(self.container).html();
		    //console.log(htmlContent);
		    if(htmlContent!=null){
		    	var content = htmlContent.replace( new RegExp(self.filters, "igm"), self.options.replaceWord );
		    }
		    $(self.container).html(content);
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