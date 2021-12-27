

var articlev = (function(){

	var self = new nModule();

	var essenses = {};



	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, editor, art, taginput, delay, external = {};
		
		var actions = {

			publish : function(){
				return actions.saveEditor().then(r => {
					
				})
			},

			viewandpublish : function(){

				return actions.saveEditor().then(r => {

					var share = self.app.platform.sdk.articles.share(art)

					var alias = share.alias()

						alias.address = self.app.user.address.value

					renders.preview(alias)

				})

				
			},

			edittags : function(show){

				var inp = el.tagsinputwrapper.find('input')

				if(show){
					el.head.addClass('tagsinput')

					setTimeout(function(){
						inp.focus()
					}, 50)
					
				}	
				else{
					inp.blur()
					el.head.removeClass('tagsinput')
				}
			},

			_removetag : function(tag){
				removeEqual(art.tags, tag)

				
			},

			removeTags: function(tags){

				_.each(tags, function(tag){
					actions._removetag(tag)
				})

				actions.save()
				actions.apply()
			},

			removeTag : function(tag){

				actions._removetag(tag)
				actions.save()
				actions.apply()

			},

			_addtag : function(tag){

				if (art.tags.length < 5){
					
					removeEqual(art.tags, tag)

					art.tags.push(tag)

					return true
				}

				return false
			},

			addTags : function(tags){

				_.find(tags, function(tag){
					if(!actions._addtag(tag)){
						sitemessage(self.app.localization.e('e13162'))

						return true
					}
				})

				actions.save()
				actions.apply()

			},

			addTag : function(tag){

				if(!actions._addtag(tag)){
					sitemessage(self.app.localization.e('e13162'))
				}
				else
				{
					actions.save()
					actions.apply()
				}
			},

			apply : function(){

				art.time = new Date();
				renders.status()

			},

			save : function(){

				if (self.app.platform.sdk.articles.itisdraft(art)){
					self.app.platform.sdk.articles.storage || (self.app.platform.sdk.articles.storage = [])
								
					var f = _.find(self.app.platform.sdk.articles.storage, function(a){
						if(art.id == a.id) return true
					})

					if(!f){
						self.app.platform.sdk.articles.storage.unshift(art)
					}
				}

				self.app.platform.sdk.articles.save()
			},

			remove : function(id){

				removeEqual(self.app.platform.sdk.articles.storage, {
					id : id
				})

				self.app.platform.sdk.articles.save()
			},

			saveEditor : function(){

				return editor.save().then(outputData => {

					art.content = outputData

					actions.save()

					actions.apply()

					return Promise.resolve()

				})

			},

			setArticle : function(nart){
				nart || (nart = self.app.platform.sdk.articles.empty(null, 2))

				art = nart

				destroy()

				make()
			}
		}

		var events = {
			
		}

		var renders = {

			preview : function(share){
				if (share){

					self.app.platform.papi.postpreview(share, null, function(){

					}, {
						inWnd : true
					})

				}
			},

			settings : function(clbk){

				self.app.platform.sdk.ustate.me(function(_mestate){

					var u = _mestate

					if(u.reputation > 50 || !u.trial) {


						var selector = new Parameter({

							type : "VALUES",
							name : "Visibility",
							possibleValues : ['0','1','2'],
							possibleValuesLabels : [
								self.app.localization.e('visibletoeveryone'), 
								self.app.localization.e('visibleonlytosubscribers'),
								self.app.localization.e('visibleonlytoregistered')
							],
							defaultValue : '0',
							value : '0'

						})

						self.shell({
							name :  'settings',
							el : el.settings,
							turi : 'share',
							data : {
								selector : selector
							},

						}, function(p){

							ParametersLive([selector], p.el)

							selector._onChange = function(){
								
							}

							if (clbk)
								clbk();
						})
					}

					else{

						el.settings.html('')

						if(clbk) clbk()
					}
				})
			},

			cover : function(){

				if (art.cover){

					el.cover.attr('image', art.cover)
					bgImages(el.c)

					el.head.addClass('hascover')
				}

				else{
					bgImagesClear(el.cover)
					el.head.removeClass('hascover')
				}
			},

			tags : function(){
				
				self.shell({

					animation : false,
					name : 'tags',
					data : {
						tags : art.tags,
						language : art.language
					},
					el : el.tgsWrapperMain

				},
				function(p){
					p.el.find('.arttags').on('click', function(){
						actions.edittags(true)
					})
				})

			},

			tgstags : function(){
				renders.tgs()
				renders.tags()
			},

			tgs : function(clbk){
				self.nav.api.load({
					open : true,
					id : 'taginput',
					el : el.tagsinputwrapper,
					eid : 'sharetags' + p.mid,
					animation : false,
					essenseData : {
						tags : function(){
							return art.tags
						},

						removeTag : function(tag){
							actions.removeTag(tag)
							renders.tgstags()
						},

						removeTags : function(tag){
							actions.removeTags(tag)
							renders.tgstags()
						},

						addTag : function(tag){
							actions.addTag(tag)
							renders.tgstags()
						},

						addTags : function(tags){
							actions.addTags(tags)
							renders.tgstags()
						},
						filter :  function(v){
							return v.tag != 'pkoin_commerce'
						},

						language : function(){
							return self.app.localization.key
						}
					},

					clbk : function(e, p){

						if(!el.c) return

						taginput = p

						if(clbk) clbk()
					}
				})
			},

			captiondouble : function(){
				
				self.shell({

					animation : false,
					name : 'caption',
					data : {
						art : art
					},
					el : el.captiondouble

				},
				function(p){

				})

			},

			status : function(){
				
				self.shell({

					animation : false,
					name : 'status',
					data : {
						art : art,
						itisdraft : self.app.platform.sdk.articles.itisdraft(art)
					},
					el : el.status

				},
				function(p){

				})

			},

			captionvalue : function(){
				el.caption.val(art.caption.value || '')
			}
		}

		var state = {
			save : function(){

			},
			load : function(id){

				art = null

				console.log("ID", id)

				if (id){
					art = self.app.platform.sdk.articles.getbyid(id)
				}

				if(!art)
					art = self.app.platform.sdk.articles.empty(null, 2)


			}
		}

		var initEvents = function(){

			el.publish.on('click', function(){
				console.log('initEvents1212')
				actions.viewandpublish()
			})

			el.removeCover.on('click', function(){
				art.cover = ''
				actions.save()

				actions.apply()

				renders.cover()
			})

			el.backfromedittags.on('click', function(){
				actions.edittags(false)
			})
			
			el.caption.on('change', function(){
				var text = $(this).val()

				art.caption.value = text || ''

				console.log('text', text, art)

				renders.captiondouble()
				
				actions.save()
				actions.apply()
			})

			el.myarticles.on('click', function(){

				self.nav.api.load({
					open : true,
					href : 'articlesv',
					inWnd : true,
					history : true,
					essenseData : {
						current : art.id,	

						create : function(){

							console.log("create")

							changeArticle()
							return true
						},

						select : function(art){
							changeArticle(art.id)

							return true
						}
					}
				}, function(p){
				})

				//actions.setArticle()
			})

			initUpload({
				el : el.c.find('.uploadcover'),
	
				ext : ['png', 'jpeg', 'jpg', 'gif', 'jfif'],

				dropZone : el.c.find('.bgwrapper'),

				action : function(file, clbk){

					self.app.platform.papi.editImage(file.base64, {
						autoCropArea : 0.95,
						apply : true

					}).then( base64 => {

						art.cover = base64

						renders.cover()

						actions.save()

						actions.apply()

						clbk()
					})

				
					
				},
				
			})
		}

		var destroy = function(){

			actions.edittags(false)

			if (taginput) {
				taginput.destroy()
				taginput = null
			}

			if (editor)
				editor.destroy();

			editor = null

			art = null
		}

		var uploadImage = function(file){
			return new Promise((resolve) => {
				const reader = new FileReader();
		
				reader.readAsDataURL(file);
				reader.onload = (e) => {

					resize(e.target.result, 1920, 1080, function(resized){
						return resolve({
							success : 1,
							file : {
								url : resized
							}
						})
					})


				};

			})
		}

		var make = function(){

			//actions.save()

			renders.tgstags()
			renders.settings()
			renders.captiondouble()
			renders.status()
			renders.cover()
			renders.captionvalue()

			editor = new EditorJS({

				holderId : 'editorjs',
				placeholder: 'Let`s write an awesome story!',
				data: art.content || {},
				tools: {

					carousel: {
						class: window.Carousel,
						config : {
							uploader : {
								uploadByFile : uploadImage
							}
						}
					},

					paragraph: {
						class: window.Paragraph,
						inlineToolbar: true,
					},

					header: {
						class: window.Header,
						levels: [2, 3, 4],
        				defaultLevel: 2,
						shortcut: 'CMD+SHIFT+H',
					},

					quote: {
						class: window.Quote,
						inlineToolbar: true,
						shortcut: 'CMD+SHIFT+O',

						config: {
						  quotePlaceholder: 'Enter a quote',
						  captionPlaceholder: 'Quote\'s author',
						},

					},

					linkTool: {
						class: window.LinkTool,
						config: {

							fetch : function(url){

								return self.app.api.fetch('urlPreviewFormatted', {url}).then(r => {

									return r
								})

								/*if(self.app.thislink(url)){
									need js preview
								}
								else{
									return self.app.api.fetch('urlPreviewFormatted', {url})
								}*/


								/*body = await (ajax.get({

									url: this.config.endpoint,

									data: {
									  url,
									},
						  
								})).body;*/


								//endpoint: 'https://localhost:8887/urlPreviewFormatted', // Your backend endpoint for url data fetching

							}

						}
					},


					/*inlineCode: {
						class: window.InlineCode,
						inlineToolbar: true,
						shortcut: 'CMD+SHIFT+M',
					},*/

					warning: {
						class: window.Warning,
						shortcut: 'CMD+SHIFT+W'
					},

					list: {
						class: window.List,
						inlineToolbar: true,
					},

					delimiter: window.Delimiter,

					image: {
						class : window.ImageTool,
						config : {
							uploader : {
								uploadByFile : uploadImage
							}
						}
					}
				},

				onChange : function(){

					delay = slowMade(function(){

						actions.saveEditor()
					}, delay,  1000)

				}

			});

			editor.isReady.then(() => {
				console.log('Editor.js is ready to work!')
				/** Do anything you need after editor initialization */
			})

			.catch((reason) => {
				console.log(`Editor.js initialization failed because of ${reason}`)
			});

			

		}

		var setArticle = function(id){
			state.load(id);

			self.app.nav.api.history.addRemoveParameters([], {
				art : art.id
			}, {
				replaceState : true
			})
		}

		var changeArticle = function(id){
			destroy()

			setArticle(id)

			make()
		}

		return {
			primary : primary,

			parametersHandler : function(){
				changeArticle(parameters().art)
			},

			getdata : function(clbk, p){

				var data = {};

				setArticle(deep(p, 'settings.essenseData.article') || parameters().art)

				clbk(data);

			},

			destroy : function(){

				destroy()

				el = {};
				
			},
			
			init : function(p){

				

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.tgsWrapperMain = el.c.find('.tagswrapper div')
				el.tagsinputwrapper = el.c.find('.tagsinputwrapper .forinput')
				el.settings = el.c.find('.settingsWrapper')
				el.captiondouble = el.c.find('.articlecaptiondouble')
				el.caption = el.c.find('.captionWrapper textarea')
				el.cover = el.c.find('.bgwrapper')
				el.head = el.c.find('.aheadermain')
				el.backfromedittags = el.c.find('.backfromedittags')
				el.removeCover = el.c.find('.removeCover')
				el.publish = el.c.find('.publish.action')
				el.share = el.c.find('.shareWrapper')
				el.status = el.c.find('.truestatuswrapper')
				el.myarticles = el.c.find('.myarticles')

				initEvents();
				make()

				p.clbk(null, p);
			}
		}
	};



	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(){

		_.each(essenses, function(essense){

			essense.destroy();

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = articlev;
}
else{

	app.modules.articlev = {};
	app.modules.articlev.module = articlev;

}