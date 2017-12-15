$(document).ready(function(){
	var openedPopup;
	var indexofVideo;
	var videoSrc;
	$('.close').on('click',function(){
		if (openedPopup == "mail"){
			$('.mailto-author').css('visibility',"hidden");
			$('.mailto-author').css('opacity','0');
		}
		else if (openedPopup == "video"){
			$('.youtube-block').eq(indexofVideo).css('visibility','hidden');
			$('.youtube-block').eq(indexofVideo).css('opacity','0');

			$('.shadow').css('visibility','hidden');
			$('.shadow').css('opacity','0');

			videoSrc = $('.youtube-block').eq(indexofVideo).children('.frame').attr('src');
			$('.youtube-block').eq(indexofVideo).children('.frame').attr('src',"");
			$('.youtube-block').eq(indexofVideo).children('.frame').attr('src',videoSrc);
		}
		else{
			$('.popup-window').eq(openedPopup).css('visibility','hidden');
			$('.popup-window').eq(openedPopup).css('opacity','0');
		}
	});

	$('#mail-author').on('click',function(){
		$('.mailto-author').css('visibility', "visible");
		$('.mailto-author').css('opacity', '1');
		openedPopup = "mail";
	});


	$('.video-ref').on('click',function(){
		var id = $(this).attr('data-id');
		var index;
		for (var i=0;i<$('.frame').length;i++){
			if ($('.video-ref').eq(i).attr('data-id') == id){
				index = i;
				break;
			}
		}
		$('.youtube-block').eq(index).css('visibility','visible');
		$('.youtube-block').eq(index).css('opacity','1');

		$('.shadow').css('visibility','visible');
		$('.shadow').css('opacity','1');

		openedPopup = "video";
		indexofVideo = index; 

	});



	//post mail
	$('#form').submit(function(event){
		console.log("ok");
		event.preventDefault();
		var form_data = $(this).serialize(); 
		$.ajax({
			type: "POST", 
			url: "/post.php", 
			data: form_data,
			success: function(response) {
				$('.mailto-author').css('visibility',"hidden");
				$('.mailto-author').css('opacity','0');
				$('.msg-box').css('visibility','visible');
				$('.msg-box').css('opacity','1');

				setTimeout(function(){
					$('.msg-box').css('visibility','hidden');
					$('.msg-box').css('opacity','0');
				},3000);
			}
		});
		$('#form')[0].reset();
	});

});