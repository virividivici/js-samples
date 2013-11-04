    /* ===========================================================================    
    * BmjMyAccountWidgeti18n:
    * provides: internationalization, generates the html for the wdiget popup 
    *
    *===========================================================================*/    
    BmjMyAccountWidgeti18n = function()
    {
      
      //Default message properties in english
      this.widget_registration_emailAddress    = "Email address";
      this.widget_registration_choose_password = "Choose a password";
      this.widget_registration_select_country  = "Select your country";
      this.widget_registration_accept_terms    = "Accepted terms and conditions";
      this.widget_registration_cancel          = "Cancel";
      this.widget_registration_create_account  = "Create an account";
      this.widget_registration_forgot_your_password = "Forgot your password?";
      this.widget_registration_send_reset_instruction = "Send password reset instructions";
      this.widget_registration_close           = "Close";
      this.widget_registration_email_sent = "We have sent a password reset link to your email address."
                                          + " Please follow the link and reset your password.";
      this.widget_registration_t_and_c         = "http://group.bmj.com/group/about/legal/terms";

    }


    BmjMyAccountWidgeti18n.prototype = 
    {
        
      init : function(localeVar)
        
      {
          var jsonData = {};
          
          if(properties != undefined && properties != null)
          {
            jsonData = properties;
            
            
            //loop through the jasonp object of translated properties 
            //to extract the values
            $(jsonData).each(function(index){
               
                if(jsonData[index].locale == localeVar)
                {
                    
                    for (var key in jsonData[index].segmentsMap.external_js_values) 
                    {
                        
                        bmji18n[key] = jsonData[index].segmentsMap.external_js_values[key];
                    }
                    
                }

            });
          }

          // call generateForm here to make sure the propeties are translated
          this.generateForm();
      },

      generateForm : function()

      {
       //generating the appropriate html for the widget form
        var bmjMyAccountWigetRegistratioForm = 
        {

          

          emailFeildHtml: '<input tab-index="1" type="email" name="emailAddress"' +
                          ' name="emailAddress" placeholder="' +
                          bmji18n.widget_registration_emailAddress +
                          '">',


          passwordFeildHtml: '<input tab-index="2" name="password" ' +
                             'type="password" placeholder="' +
                             bmji18n.widget_registration_choose_password + 
                             '"autocomplete="off">',

          CountryFeildHtml: '<input tab-index="3" type="text" placeholder="' +
                            bmji18n.widget_registration_select_country +
                            '" id="countryField" autocomplete="off">' +
                            '<input name="countryCode"' +
                            ' type="hidden">',

          mobileCountryFeildHtml: '<select  name="countryCode">' +
                                getCountrySelectForMobile() +
                                '</select>'   
        

        }
        
       
        
        if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i))
        {
      
          this.setUpForm(bmjMyAccountWigetRegistratioForm , 'mobile');
         
        }
        else
        {

          this.setUpForm(bmjMyAccountWigetRegistratioForm , 'desktop');

        }
        
        
      

      },

      
      ieAlternatives : function()
      {
         if(window.navigator.appName == jQuery.trim('Microsoft Internet Explorer'))
         {
          
             $('input#bmj-myaccount-widget-reset-emailAddress')
              .addClass('place-holder')
              .val(bmji18n.widget_registration_emailAddress)
              
              .focus(function(){
                  if( $(this).val() == bmji18n.widget_registration_emailAddress)
                  {
                      $(this).val('').removeClass('place-holder');
                  }
              })
              
              .blur(function(){
                  if( $(this).val() == jQuery.trim(''))
                  {
                      $(this)
                      .val(bmji18n.widget_registration_emailAddress)
                      .addClass('place-holder');
                  }
              });
              
              $('input#bmj-myaccount-widget-reg-emailAddress')
              .addClass('place-holder')
              .val(bmji18n.widget_registration_emailAddress)
              
              .focus(function(){
                  if( $(this).val() == bmji18n.widget_registration_emailAddress)
                  {
                      $(this).val('').removeClass('place-holder');
                  }
              })
              
              .blur(function(){
                  if( $(this).val() == jQuery.trim(''))
                  {
                      $(this)
                      .val(bmji18n.widget_registration_emailAddress)
                      .addClass('place-holder');
                  }
              });
              
              $('input#bmj-myaccount-widget-reg-password')
              .addClass('place-holder')
              .attr('type', 'text')
              .val(bmji18n.widget_registration_choose_password)
              
              .focus(function(){
                  if( $(this).val() == bmji18n.widget_registration_choose_password)
                  {
                      $(this).val('')
                      .removeClass('place-holder')
                      .attr('type', 'password');
                  }
              })
              
              .blur(function(){
                  if( $(this).val() == jQuery.trim(''))
                  {
                      $(this)
                      .val(bmji18n.widget_registration_choose_password)
                      .addClass('place-holder')
                      .attr('type', 'text');
                  }
              });
             
              $('input#countryField')
              .addClass('place-holder')
              .val(bmji18n.widget_registration_select_country)
              
              .focus(function(){
                  if( $(this).val() == bmji18n.widget_registration_select_country)
                  {
                      $(this).val('').removeClass('place-holder');
                  }
              })
              
              .blur(function(){
                  if( $(this).val() == jQuery.trim(''))
                  {
                      $(this)
                      .val(bmji18n.widget_registration_select_country)
                      .addClass('place-holder');
                  }
              });
         }
      }

    }

    var bmji18n = new BmjMyAccountWidgeti18n();

    bmji18n.init(getLocale());
