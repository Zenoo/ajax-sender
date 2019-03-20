// Type definitions for AjaxSender.js
// Project: [https://github.com/Zenoo/ajax-sender] 
// Definitions by: [Zenoo] <[https://github.com/Zenoo]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/**
 * AjaxSender Class used to handle ajax calls
 */
declare interface AjaxSender {
		
	/**
	 * 
	 * @param {String}					url                   			URL to send the call to
     * @param {Object}					[parameters]            		Request parameters
     * @param {String}					[parameters.method=GET]			Request method
     * @param {Object|FormData}			[parameters.data]				Request data
     * @param {String}					[parameters.responseType=json]	Request response type
     * @param {Object.<String, String>}	[parameters.headers]			Request headers
     * @param {eventCallback}			[parameters.progress]			Callback for the progress event
     * @param {eventCallback}			[parameters.load]				Callback for the load event
     * @param {eventCallback}			[parameters.error]				Callback for the error event
     * @param {eventCallback}			[parameters.uploadProgress]		Callback for the upload progress event
     * @param {eventCallback}			[parameters.uploadLoad]			Callback for the upload progress event
	 */
	new (url : string, parameters? : any);
		
	/**
	 * Handle callback attachment
	 * @private
	 */
	_handleCallbacks(): void;
		
	/**
	 * Encode an object for an URL use
	 * @param {Object} object Object to transform
	 * @param {String} prefix Parameter needed for the recursion
	 * @private
	 */
	_objectToURL(object : /* AjaxSender._parameters.data */ any, prefix : string): string;
		
	/**
	 * Stops any outgoing request
	 * @returns {AjaxSender} The current AjaxSender
	 */
	stop(): /* AjaxSender.prototype.+AjaxSender */ any;
	
	/**
	 * The request corresponding XMLHttpRequest
	 * @type {XMLHttpRequest}
	 */
	xhr : {
				
		/**
		 * Response type
		 */
		responseType : string;
	}
	
	/**
	 * Default values
	 */
	_parameters : {
				
		/**
		 * 
		 */
		method : string;
		
		/**
		 * 
		 */
		data : {
						
			/**
			 * 
			 */
			processData : boolean;
						
			/**
			 * 
			 */
			contentType : boolean;
		}
				
		/**
		 * 
		 */
		responseType : string;
	}
}
