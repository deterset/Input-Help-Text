Input-Help-Text
===============

	Fancy, input box, help text, for jQuery.

	This jQuery function helpText can be used to display helpful text to 
	the user in the input field it self. The help text is displayed until
	the user starts typing in the input box. If the input box is left blank 
	the help text is displayed once again onBlur. Once the form is submitted 
    if the help text has not been replaced it is removed and replaced with a
    blank string. You may also specify a class to use for the help text. You
    may also specify if the input field should get the focus. Only one input
	can receive the focus. You may also change the behaviour of the enter key
	on an input box to perform a tab to the next input field. In my case this 
	was necessary for people entering a username and password. The tab key 
	will work as normal but if the user presses the enter key and no password 
	has been entered it is a waste of time to submit the form. In this case I 
	submit the form with an enter key only from the password field.
	
	Example:

    <link type="text/css" href="css/jquery.help-text.css" rel="stylesheet" />
    <script type="text/javascript" src="js/jquery.help-text.js"></script>
    <script type="text/javascript">
	$(document).ready(function() {
		$('#username').helpText({
			text: 'email@host.com',
			enter: 'tab',
			focus: 1
		});
		
		$('#password').helpText({
			text: 'password'
		});
	});
    </script>
	
	I hope this is useful to someone. Your mileage may vary
	
	Thanks,
	Robert Campbell

