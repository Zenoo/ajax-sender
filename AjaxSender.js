/* exported AjaxSender */

/**
 * Callback function used for the XHR events
 *
 * @callback eventCallback
 * @param {Object} response The XHR response
 */

/**
 * AjaxSender Class used to handle ajax calls
 */
class AjaxSender{
	/**
     * Creates an instance of AjaxSender
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
	constructor(url, parameters){
		/**
		 * The request corresponding XMLHttpRequest
		 * @type {XMLHttpRequest}
		 */
		this.xhr = new XMLHttpRequest();

		/**
		 * DOWNLOAD CALLBACKS
		 */
		if(parameters.progress){
			this.xhr.addEventListener('progress', () => {
				Reflect.apply(parameters.progress, null, [this.xhr.response]);
			});
		}
		if(parameters.load){
			this.xhr.addEventListener('load', () => {
				if(this.xhr.status == 200){
					Reflect.apply(parameters.load, null, [this.xhr.response]);
				}else{
					if(parameters.error){
						Reflect.apply(parameters.error, null, [this.xhr]);
					}else{
						console.log(this.xhr);
					}
				}
			});
		}
		this.xhr.addEventListener('error', parameters.error ? () => {
			Reflect.apply(parameters.error, null, [this.xhr]);
		} : () => {
			console.log(this.xhr);
		});

		/**
		 * UPLOAD CALLBACKS
		 */
		if(parameters.uploadProgress){
			this.xhr.upload.addEventListener('progress', () => {
				Reflect.apply(parameters.uploadProgress, null, [this.xhr.response]);
			});
		}
		if(parameters.uploadLoad){
			this.xhr.upload.addEventListener('load', () => {
				Reflect.apply(parameters.uploadLoad, null, [this.xhr.response]);
			});
		}
		this.xhr.upload.addEventListener('error', parameters.error ? () => {
			Reflect.apply(parameters.error, null, [this.xhr]);
		} : () => {
			console.log(this.xhr);
		});

		/**
		 * Response type
		 */
		this.xhr.responseType = parameters.responseType || 'json';

		/**
		 * Request method
		 */
		this.xhr.open(parameters.method ? parameters.method : 'GET', url);

		/**
		 * Request headers
		 */
		Object.entries(parameters.headers || {}).forEach(([header, value]) => this.xhr.setRequestHeader(header, value));

		/**
		 * Data handling
		 */
		if(parameters.data instanceof FormData){
			parameters.data.processData = false;
			parameters.data.contentType = false;
			this.xhr.send(parameters.data);
		}else{
			const formData = new FormData();

			formData.processData = false;
			formData.contentType = false;
			Object.keys(parameters.data || {}).forEach(key => formData.append(key, typeof parameters.data[key] == 'object' ? JSON.stringify(parameters.data[key]) : parameters.data[key]));
			this.xhr.send(formData);
		}
	}

	/**
	 * Stops any outgoing request
	 * @returns {AjaxSender} The current AjaxSender
	 */
	stop(){
		this.xhr.abort();

		return this;
	}
}