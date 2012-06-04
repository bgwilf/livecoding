/* Author:
	Gabriel Florit
*/

var aigua = (function () {
	return {
		lineHeight: 19,
		borderWidth: Number($('#bar').css('border-width').replace('px', '')),
		samples: ['data/chord.txt']
	}
}());

$(function() {

	d3.text(aigua.samples[0], function(data) {
		aigua.codeMirror = CodeMirror($('#code').get(0), {
			onKeyEvent: function(cm, e) {

				// did we keydown the alt key?
				if (e.altKey && e.type == 'keydown') {

					// is the handle hidden?
					if (!$('#handle').is(':visible')) {

						// grab the current token
						var cursor = cm.getCursor();
						var token = cm.getTokenAt(cursor);

						// select token
						cm.setSelection({line: cursor.line, ch: token.start}, {line: cursor.line, ch: token.end});

						// find coords at token start
						var startCoords = cm.cursorCoords(true);
						var endCoords = cm.cursorCoords(false);

						// make handle as wide as the selection
						var width = endCoords.x - startCoords.x;
						$('#handle').width(width);

						// position marker at center of handle
						var center = startCoords.x + width/2;
						$('#marker').css('left', center);

						// position handle at token
						$('#handle').css('left', startCoords.x);						

						// show the handle
						$('#handle').show();

						// position the bar centered above the token
						$('#bar').css('left', center - $('#bar').width()/2 - aigua.borderWidth);
						$('#bar').css('top', startCoords.y - aigua.lineHeight);

						// show the bar
						$('#bar').show();
					}
				}

				// did we keyup?
				if (e.type == 'keyup') {

					// hide the handle
					$('#handle').hide();

					// reset filler width
					$('#filler').width(0);

					// hide the bar
					$('#bar').hide();
				}
			},
			lineNumbers: true,
			matchBrackets: true,
			mode:  'javascript',
			theme: 'lesser-dark',
			value: data
		});
	});

	$('#handle').draggable({
		axis: 'x',
		drag: function(ui, event) {

			var handleCenter = $('#handle').offset().left + $('#handle').width()/2;
			var markerCenter = $('#marker').offset().left;
			var handleOffset = handleCenter - markerCenter;

			if (handleOffset > 0) {
				$('#filler').css('left', $('#bar').width()/2);
				$('#filler').width(handleOffset);
			} else if (handleOffset < 0) {
				$('#filler').css('left', handleOffset + $('#bar').width()/2);
				$('#filler').width(-handleOffset);
			} else {
				$('#filler').css('left', $('#bar').width()/2);
				$('#filler').width(0);
			}
		},
		stop: function(ui, event) {
		}
	});

});

	// $('#number').on('mousedown', function(e) {
	// 	$('#number').draggable({
	// 		axis: 'x',
	// 		drag: function(ui, event) {
	// 		}
	// 	});



	// 	// var handle = $('#handle');
	// 	// handle.css('left', $(this).position().left);
	// 	// handle.css('top', $(this).position().top + $(this).height()/2 - handle.height()/2);
	// 	// handle.css('width', $(this).width());
	// });

	// var bar = $('#bar');
	// var borderWidth = 1;
	// var increaseStep = 5;
	// handle.draggable({
	// 	axis: 'x',
	// 	drag: function(ui, event) {

			// prevent dragging past left edge of bar
			// if (bar.position().left - ball.position().left > -borderWidth) {
			// 	$(this).data('draggable').offset.click.left +=
			// 		(event.position.left - bar.position().left) - borderWidth;
			// }

			// // prevent dragging past right edge of bar
			// if (ball.position().left + ball.width() > bar.position().left + bar.width()) {
			// 	$(this).data('draggable').offset.click.left +=
			// 		(event.position.left + ball.width()) - (bar.position().left + bar.width()) - borderWidth;
			// }

			// if we're at left edge of bar, increase bar width
			// if (bar.position().left - ball.position().left >= -borderWidth) {
			// 	bar.animate({
			// 		left: '-=' + increaseStep,
			// 		width: '+=' + increaseStep
			// 	}, 0);
			// }

			// // if we're at right edge of bar, increase bar width
			// if (ball.position().left + ball.width() >= bar.position().left + bar.width()) {
			// 	bar.animate({
			// 		width: '+=' + increaseStep
			// 	}, 0);
			// }
	// 	},
	// 	stop: function(ui, event) {
	// 		// if we're past left edge of bar, bring back inside
	// 		// if (bar.position().left - ball.position().left > -borderWidth) {
	// 		// 	ball.css('left', bar.position().left + borderWidth);
	// 		// }

	// 		// // if we're past right edge of bar, bring back inside
	// 		// if (ball.position().left + ball.width() > bar.position().left + bar.width()) {
	// 		// 	ball.css('left', bar.position().left + bar.width() - ball.width() + borderWidth);
	// 		// }
	// 	}
	// });



