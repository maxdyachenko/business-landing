$(document).ready(function(){
	$('.closed-butt').hover(function(){
		$('.closed-popup').css('visibility','visible');
		$('.closed-popup').css('opacity','1');
		$(this).css('background','#c92f2f');
		$(this).css('transition','.3s');
	});
	$('.closed-butt').mouseleave(function(){
		$('.closed-popup').css('visibility','hidden');
		$('.closed-popup').css('opacity','0');
		$(this).css('background','#666666');
	});


	var openedPopup;
	$('.watch-pr').on('click',function(){
		var id = $(this).attr('data-id');
		var index;
		for (var i=0;i< $('.popup-window').length;i++){
			if ($('.popup-window').eq(i).attr('data-id') == id){
				index = i;
				break;
			}
		}
		$('.popup-window').eq(index).css('visibility','visible');
		$('.popup-window').eq(index).css('opacity','1');
		openedPopup = index;
	});

	$('.close').on('click',function(){
		if (openedPopup == "mail"){
			$('.mailto-author').css('visibility',"hidden");
			$('.mailto-author').css('opacity','0');
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

	//resize modal window
	function popupHeight(){
		if ($(window).height() < ($('.popup-window').height() + 25)){
			//height of header 105px
			//80px random number for margins
			console.log("small");
			var height = $(window).height() - 105 - 100;
			height += 'px';
			console.log(height);
			$('.popup-content').css('max-height',height);
		}
	}
	popupHeight();
	$(window).resize(function(){
		popupHeight();
	});
});


