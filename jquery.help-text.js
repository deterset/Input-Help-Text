/**
 * A small plugin that adds a helpText to an input field.
 * You can also modify the ENTER key behaviour.
 *
 * Example:
 *-------------------------------------------------
	$(document).ready(function() {
		$('#username').helpText({
			helpClass: 'dimmed',
			text: 'email@host.com',
			enter: 'tab',
			focus: 1
		});

		$('#password').helpText({
			helpClass: 'dimmed',
			text: 'password'
		});
	});

 *
 * @author deterset (Robert Campbell)
 * @homepage http://deterset.com
 * @created 2014-07-14
 * @version 0.1
 */
(function($) {
    $.fn.helpText = function(options) {

        // merges the options w/defaults
        var settings = $.extend({
            helpClass: 'none',
            text: '',
            enter: 'submit',			// option 'submit'(default browser behaviour)
                                        //     or 'tab' to next input field
            focus: 0					// 1                  after page load focus this input
        }, options);

        // clean off input help text before submitting form.
        function remove() {
            $("input").each(function() {
                if ($(this).val() === $(this).attr('helpText')) {
                    $(this).val('');
                    settings.text = '';
                }
            });
        }

        $(this).closest("form").addClass('helpTextFormClass');
        $(document).on('submit', 'form.helpTextFormClass', function(e) {
            remove();
        });


        // Prevent Form from being submitted on enter
        $(this).closest("form").keypress(function(e) {
            return e.keyCode != 13;
        });

        // before the 1st users character is output remove help text.
        this.keypress(function(e) {
            if(e.keyCode != 13 && $(this).val() == $(this).attr("helpText")) {
                // resets the value in the field
                $(this).val("");
            }
            if ($(this).val() == '') {
                // removes the helpClass
                $(this).removeClass(settings.helpClass);
            }
            return e.keyCode != 13;
        });

        // modified enter key behaviour
        this.keyup(function(e) {
            if ((e.keyCode == 13 && settings.enter == 'tab')) {
                // :input below is necessary for IE to work
                var tabables = $("[tabindex != '-1']:input:visible");
                var index = tabables.index(this);
                tabables.eq(index + 1).focus();
            } else if (e.keyCode == 13 && settings.enter == 'submit') {
                remove();
                $(this).closest("form").submit();
            }
        });

        // when the field receives focus update cursor position
        // helpText pos = begining, userText pos = end of string
        this.focus(function() {
            if($(this).val() == $(this).attr("helpText")) {
                // resets the value in the field
                $(this)[0].setSelectionRange(0, 0);
            } else {
                if ($(this)[0].setSelectionRange) {
                    var len = $(this).val().length;
                    $(this)[0].setSelectionRange(len,len);
                } else {
                    $(this).val($(this).val());
                }
            }
        });

        // when the user leaves the field return helpText if empty
        this.blur(function() {
            if($(this).val() == '') {
              // adds the helpText back in
              $(this).val(settings.text);
              // adds the helpClass
              $(this).addClass(settings.helpClass);
            }
        });

        // sets the default help text and helpClass
        // also store the init text
        if(this.val() == "") {
            this.val(settings.text);
            if (settings.helpClass != 'none') this.addClass(settings.helpClass);
            if (this.attr('helpText') == undefined)
                this.attr('helpText',settings.text);
            if (settings.focus) {
                this.focus();
                this[0].setSelectionRange(0, 0);
                settings.focus = 0;
            }
        }

        // allows for jQuery chaining
        return this;
    };
}(jQuery));
