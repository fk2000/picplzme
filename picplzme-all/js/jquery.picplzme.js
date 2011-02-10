(function ($) {

	
    // FUNCTION TO ADD USER DATA/INFO BEFORE IMAGE LIST
	function addUserData(userObject) {
	    userData = '<div id="userdata"> <img class"icon" src="' + userObject.icon.url + '"/><a id="picplz" href="http://picplz.com/user/' + userObject.username + '"><img src="images/picplz.png" /></a><p class="username">' + userObject.username + ': ' + userObject.follower_count + ' followers</p></div>';
	    console.log(userObject);
	    
	    
	     $('#image_list').before(userData);
	}
	
    // FUNCTION ADDS LIGHTBOX REL ATTRIBUTE
	function addLightbox() {
	    $("a[rel^='lightbox']").slimbox();
	}
	
    // ADD ANIMATION FOR HOVER INFO BOX
	function animateHover(animation) {
	    
	    var animType;
	    if(animation == 'slide')
	        animType = 'slideToggle';
	    else
	        animType = 'fadeToggle';

	    $('.picInfo').hide();
        
        $('.picplz').hover(function() {
            $(this).find('.picInfo')[animType]('fast');
        },
        function() {
            $(this).find('.picInfo')[animType]('fast');
        });
            
	}
	
	
	$.fn.picplzme = function (opts) {
		var options = $.extend({}, $.fn.picplzme.defaults, opts);
		
		// Don't break the chain
		return this.each(function (i, el) {
			var $this = $(this);
			
			$.getJSON("http://picplz.com/api/v2/user.json?callback=?",
            {
                username: options.username,
                include_pics: "1",
                pic_formats: "640r,100sh"
            },

            function(data) {
                $(function () {
                var picList = '',
                    userObject = data.value.users[0];

                
                $.each(data.value.users[0].pics,
                function(i, pic) {

                    var img = pic.pic_files["640r"],
                    thumb = pic.pic_files["100sh"].img_url,
                    imgUrl = img.img_url,
                    imgCaption = pic.caption,
                    imgView = pic.view_count,
                    imgLikes = pic.like_count,
                    imgComments = pic.comment_count;
                    picList += [
                    '<div class="picplz" style="border:2px solid ',options.color,';">',
                    '<a rel="lightbox[picplz]" href="', imgUrl, '" title="', imgCaption, '">',
                    '<img src="', thumb, '" width="100" />',
                    '<div class="picInfo">',
                    '<p class="view">', imgView, '</p>',
                    '<p class="like">', imgLikes, '</p>',
                    '<p class="comment">', imgComments, '</p>',
                    '</div>',
                    '</a>',

                    '</div>'].join('');
                });

                // APPEND LIST TO UL IN MARKUP
                $('#image_list').html(picList);

                
                // ADD LIGHTBOX ABILITY
                if(options.lightbox)
                    addLightbox();
                
                // ADD USER DATA
                if(options.userData)
                    addUserData(userObject);
                
                
                // ADD HOVER ANIMATION
                if(options.imageData)
                    animateHover(options.animate);


                });
            });
			
			
		});
	};
	
	$.fn.picplzme.defaults = {
		username : 'thatryan',
		animate  : 'slide',
		lightbox : true,
		userData : true,
		imageData : true,
		color : 'blue'
		
	};

}(jQuery));