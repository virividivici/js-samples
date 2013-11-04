
test('getUrlVars()', function() { 
    
   

   switch (getUrlVars()['locale'])
    {
          
        case 'it':
        
            equal(getUrlVars()['locale'], 'it', 'if italian language selected passes');
         
        break;


        case 'pt_BR':

            equal(getUrlVars()['locale'], 'pt_BR', 'if portuguese brazil language selected passes');   
          
        break;

        default:

            equal(getUrlVars()['locale'], undefined , 'Passes if no locale param');
         
        break;
    }

})  



test('getAlternativeLocale()', function() { 
    
   

        
    equal(getAlternativeLocale(), 'en_GB', 'Passes if no locale');


    equal(getAlternativeLocale(), 'en_GB', 'if en-US');   

})  






test('getLocale()', function() { 
    
   

        
    equal(getLocale(), 'en_GB', 'Passes if no locale');


    equal(getLocale(), 'en_GB', 'if en-US');   


    equal(getLocale(), getUrlVars()['locale'] , 'Passes if the same');
        
})  


test( "BmjMyAccountWidgeti18nProperties", function() {


   

    switch (getUrlVars()['locale'])
    {
          
        case 'it':

      equal(bmji18n.widget_registration_emailAddress   , "Indirizzo di posta elettronica" ,"Passes" );
      equal(bmji18n.widget_registration_choose_password , "Scegliere una password","Passes" );
      equal(bmji18n.widget_registration_select_country  , "Scegli il tuo paese","Passes" );
      equal(bmji18n.widget_registration_accept_terms  , "Termini e le condizioni accettate","Passes" );
      equal(bmji18n.widget_registration_cancel , "Annullare","Passes" );
      equal(bmji18n.widget_registration_create_account , "Crea un account","Passes" );
      equal(bmji18n.widget_registration_forgot_your_password , "Hai dimenticato la password?","Passes" );
      equal(bmji18n.widget_registration_send_reset_instruction , "Invia istruzioni di reimpostazione della password","Passes" );
        
         
        break;


        case 'pt_BR':

          equal(bmji18n.widget_registration_emailAddress   , "endereço de email" ,"Passes" );
          equal(bmji18n.widget_registration_choose_password , "Escolha uma senha","Passes" );
          equal(bmji18n.widget_registration_select_country  , "Selecione seu país","Passes" );
          equal(bmji18n.widget_registration_accept_terms  , "Termos e condições aceitas","Passes" );
          equal(bmji18n.widget_registration_cancel , "Cancelar","Passes" );
          equal(bmji18n.widget_registration_create_account , "Criar uma conta","Passes" );
          equal(bmji18n.widget_registration_forgot_your_password , "Hai dimenticato la senha?","Passes" );
          equal(bmji18n.widget_registration_send_reset_instruction , "Enviar instruções de redefinição de senha","Passes" );
          
        break;

        default:

              equal(bmji18n.widget_registration_emailAddress   , "Email address" ,"Passes" );
              equal(bmji18n.widget_registration_choose_password , "Choose a password","Passes" );
              equal(bmji18n.widget_registration_select_country  , "Select your country","Passes" );
              equal(bmji18n.widget_registration_accept_terms  , "Accepted terms and conditions","Passes" );
              equal(bmji18n.widget_registration_cancel , "Cancel","Passes" );
              equal(bmji18n.widget_registration_create_account , "Create an account","Passes" );
              equal(bmji18n.widget_registration_forgot_your_password , "Forgot your password?","Passes" );
              equal(bmji18n.widget_registration_send_reset_instruction , "Send password reset instructions","Passes" );
         
        break;
    }
 

});


test( "generateForm()", function() {


    ///Assertions

    $popDiv = $('div#bmj-myaccount-widget-registration-container');
    equal( $( $popDiv ).length, 1, "popUp container added successfully!" );

    $popForm = $('form#bmj-myaccount-widget-registration-form');
    equal( $( $popDiv ).length, 1, "popUp form added successfully!" );


    $popHeader = $('div.widget-header');
    equal( $( $popHeader ).length, 1, "header added successfully!" );


    $emailDiv = $('div#bmj-myaccount-widget-registration-container div#emailAddress.myaccount-user');
    $emailField = $('div#emailAddress.myaccount-user input#emailAddress');
    equal( $( $emailDiv ).length, 1, "Email div added successfully!" );
    equal( $( $emailField ).length, 1, "Email input added successfully!" );
    equal( $( $emailField ).attr('type'), 'email', "Passes if input is of type email" );

    $passDiv = $('div#bmj-myaccount-widget-registration-container div#password.myaccount-password');
    $passField = $('div#bmj-myaccount-widget-registration-container div#password.myaccount-password input#password');
    equal( $( $passDiv ).length, 1, "Password div added successfully!" );
    equal( $( $passField ).length, 1, "password input added successfully!" );
    equal( $( $passField ).attr('type'), 'password', "Passes if input is of type password" );


    $countryDiv = $('div#bmj-myaccount-widget-registration-container div#countryCode.myaccount-country');
    $countryField = $('div#bmj-myaccount-widget-registration-container div#countryCode.myaccount-country input#countryField');
    equal( $( $countryDiv ).length, 1, "country div added successfully!" );
    equal( $( $countryField ).length, 1, "country input added successfully!" );
    equal( $( $countryField ).attr('type'), 'text', "Passes if input is of type password" );

    $termsDiv = $('div#bmj-myaccount-widget-registration-container div#termsAccepted.myaccount-rememberme');
    $termsField = $('div#bmj-myaccount-widget-registration-container div#termsAccepted.myaccount-rememberme input#termsAccepted');
    equal( $( $termsDiv ).length, 1, "country div added successfully!" );
    equal( $( $termsField ).length, 1, "country input added successfully!" );
    equal( $( $termsField ).attr('type'), 'checkbox', "Passes if input is of type checkbox" );


    $cancelButton = $('div#bmj-myaccount-widget-registration-container a.cancel-bmj-myaccount-widget-registration');
    equal( $( $cancelButton ).length, 1, "Passes if cancel link is successfully added" );

    $resetButton = $('div#bmj-myaccount-widget-registration-container button#submit-bmj-myaccount-widget-registration');
    equal( $( $resetButton ).length, 1, "Passes if reset button is successfully added" );


});



test('_screenDetector()', function() { 
    
   
if ($(window).width() < 768)
    {
        equal(_screenDetector(), 'mobileScreen', 'mobileScreen passes');
    }
    else
    {
        equal(_screenDetector(), 'desktopScreen', 'desktopScreen screen passes');   
    }

})  



test('widget desktopScreen/mobileScreen PopUp', function() { 
    
   
if ($(window).width() < 768)
    {
         $('.bmj-myaccount-widget-registration').trigger('click');

                
                equal(bmjMyAccountWigetRegistration.isAnimating, true, 'passes if slides in');
                equal($("#bmj-myaccount-widget-registration-container").hasClass('bmj-myaccount-widget-registration-slider-animating'), true, 'passes if slides in');
                equal($("#bmj-myaccount-widget-registration-container").hasClass('bmj-myaccount-widget-registration-right-slide-in'), true, 'passes if slides in');
              
                equal($('#bmj-myaccount-widget-registration-container').is(":visible"), true, 'popup displayed');

         $('.cancel-bmj-myaccount-widget-registration').trigger('click');

              
                equal(bmjMyAccountWigetRegistration.isAnimating, false, 'passes if slides out');
                equal($("#bmj-myaccount-widget-registration-container").hasClass('bmj-myaccount-widget-registration-slider-animating'), false, 'passes if slides out');
                equal($("#bmj-myaccount-widget-registration-container").hasClass('bmj-myaccount-widget-registration-right-slide-in'), false, 'passes if slides out');
    }
    else
    {
       alert($('#bmj-myaccount-widget-registration-container').is(":visible"));
        $('.bmj-myaccount-widget-registration').trigger('click');

                equal($('#BmjMyAccountRegistrationOverlay').length, 1, 'popup overlay added'); 
                equal($('#BmjMyAccountRegistrationOverlay').is(":visible"), true, 'popup overlay displaed'); 
               
                equal($('#bmj-myaccount-widget-registration-container').is(":visible"), true, 'popup displayed');

         $('.cancel-bmj-myaccount-widget-registration').trigger('click');

                equal($('#BmjMyAccountRegistrationOverlay').length, 0, 'popup overlay removed'); 
                equal($('#bmj-myaccount-widget-registration-container').is(":visible"), false, 'popup hides');

         
    }

})  






test( "Reset Password Pop Up", function() {



   var $resetPasswordfixture = $(
               '<div class="bmj-myaccount-widget-registration-container"' 
                + ' id="bmj-myaccount-widget-reset-password-container">'
                + getFormHtml().resetPasswordFormOpenerHtml
                + getFormHtml().resetPasswordHeaderHtml
                + getFormHtml().emailFeildHtml
                + getFormHtml().cancelBtnHtml
                + getFormHtml().resetPasswordButtonHtml
                + getFormHtml().formEndHtml);

    $resetPasswordfixture.appendTo(document.body);

    


    ///Assertions

    $popDiv = $('div#bmj-myaccount-widget-reset-password-container');
    equal( $( $popDiv ).length, 1, "popUp added successfully!" );


    $popHeader = $('div.widget-header');
    equal( $( $popHeader ).length, 1, "header added successfully!" );


    $emailDiv = $('div#emailAddress.myaccount-user');
    $emailField = $('div#emailAddress.myaccount-user input#emailAddress');
    equal( $( $emailDiv ).length, 1, "Email div added successfully!" );
    equal( $( $emailField ).length, 1, "Email input added successfully!" );
    equal( $( $emailField ).attr('type'), 'email', "Passes if input is of type email" );

  



    $cancelButton = $('a.cancel-bmj-myaccount-widget-registration');
    equal( $( $cancelButton ).length, 1, "Passes if cancle link is successfully added" );

    $resetButton = $('button#reset-password-myaccount-widget-registration');
    equal( $( $resetButton ).length, 1, "Passes if reset button is successfully added" );

   

    switch (getUrlVars()['locale'])
    {
          
        case 'it':
        
            equal( jQuery.trim($resetButton.text()) , jQuery.trim('Invia istruzioni di reimpostazione della password'), "Passes if Italian chosen" );
         
        break;


        case 'pt_BR':

            equal( jQuery.trim($resetButton.text()) , jQuery.trim('Enviar instruções de redefinição de senha') , "Passes if portuguese chosen" );  
          
        break;

        default:

            equal( jQuery.trim($resetButton.text()) , jQuery.trim('Send password reset instructions') , "Passes as default" );
         
        break;
    }
 

});






test( "Registeration form", function() {

  var $popDiv = $( "bmj-myaccount-widget-registration-container" );
  equal( $( $popDiv ).length, 1, "popUp added successfully!" );

});
